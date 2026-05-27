import { useEffect, useState } from "react";
import { getEmployeeReport } from "../../services/taskService";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function EmployeeReportsSection() {

    const [from, setFrom] = useState("2026-05-01");
    const [to, setTo] = useState("2026-05-31");
    const [report, setReport] = useState([]);

    const navigate = useNavigate();


    const fetchReport = async () => {

        const token =
            localStorage.getItem(
                "token"
            );

        const data = await getEmployeeReport(

            from,
            to,
            token

        );

        setReport(data);

    };

    const handleApplyRange = () => {
        fetchReport();
    };

    const completedTasks = report.length;

    const totalHours = report.reduce(

        (sum, item) =>

            sum +

            Number(

                item.actual_hours || 0

            ),

        0

    );


    const handleSummaryCopy = () => {

        const text =

            `Completed tasks:

            ${completedTasks}

            Actual hours:

            ${totalHours}`;

        navigator.clipboard.writeText(

            text

        );

        alert(

            "Summary copied"

        );

    };


    const handlePDF = () => {

        const doc =

            new jsPDF();

        doc.text(

            "My Report",

            14,

            15

        );

        autoTable(

            doc,

            {

                head: [

                    [

                        "Project",

                        "Task",

                        "Priority",

                        "Hours"

                    ]

                ],

                body:

                    report.map(

                        item =>

                            [

                                item.project_name,

                                item.title,

                                item.priority,

                                item.actual_hours

                            ]

                    )

            }

        );

        doc.save(

            "employee-report.pdf"

        );

    };


    const handleExcel = () => {

        const data =

            report.map(

                item => ({

                    Project:

                        item.project_name,

                    Task:

                        item.title,

                    Priority:

                        item.priority,

                    Hours:

                        item.actual_hours

                })

            );

        const sheet =

            XLSX.utils.json_to_sheet(

                data

            );

        const workbook =

            XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(

            workbook,

            sheet,

            "Report"

        );

        const excelBuffer =

            XLSX.write(

                workbook,

                {

                    bookType: "xlsx",

                    type: "array"

                }

            );

        const file =

            new Blob(

                [excelBuffer],

                {

                    type:

                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

                }

            );

        saveAs(

            file,

            "employee-report.xlsx"

        );

    };


    const handleLastMonth = () => {

        const today =

            new Date();

        const firstDay =

            new Date(

                today.getFullYear(),

                today.getMonth() - 1,

                1

            );

        const lastDay =

            new Date(

                today.getFullYear(),

                today.getMonth(),

                0

            );

        setFrom(

            firstDay

                .toISOString()

                .split("T")[0]

        );

        setTo(

            lastDay

                .toISOString()

                .split("T")[0]

        );

    };


    return (

        <div className="reports-page">

            <p className="report-breadcrumb">

                Dashboard / My reports

            </p>

            <div className="report-header">

                <div>

                    <h1>

                        My reports

                    </h1>

                    <p>

                        Export tasks you marked completed in a date range.

                    </p>

                </div>
                <div className="header-btns">

                    <button

                        className="secondary-btn"

                        onClick={handleSummaryCopy}

                    >

                        Today summary copy

                    </button>

                    <button

                        onClick={() =>

                            navigate(

                                "/employee-dashboard",

                                {

                                    state: {

                                        section: "tasks"

                                    }

                                }

                            )

                        }

                    >

                        My tasks

                    </button>

                </div>
            </div>


            <div className="range-card">

                <h4>

                    DATE RANGE (COMPLETION)

                </h4>

                <div className="range-row">

                    <div>

                        <label>

                            From

                        </label>

                        <input

                            type="date"

                            value={from}

                            onChange={(e) =>

                                setFrom(

                                    e.target.value

                                )

                            }

                        />

                    </div>

                    <div>

                        <label>

                            To

                        </label>

                        <input

                            type="date"

                            value={to}

                            onChange={(e) =>

                                setTo(

                                    e.target.value

                                )

                            }

                        />

                    </div>

                    <button

                        onClick={() =>

                            fetchReport()

                        }

                    >

                        Apply range

                    </button>

                    <button

                        className=

                        "secondary-btn"

                        onClick={handleLastMonth}

                    >

                        Last calendar month

                    </button>

                </div>

            </div>


            <div className="summary-card">

                <div>

                    <h2>

                        Summary

                    </h2>

                    <span>{completedTasks} completed task(s)  </span>

                    <span>   {totalHours} actual hours</span>

                </div>

                <div className="summary-btns">

                    <button

                        onClick={handlePDF}

                    >

                        Export PDF

                    </button>

                    <button

                        onClick={handleExcel}

                    >

                        Export Excel

                    </button>

                </div>

            </div>


            <div className="completed-card">

                <h2>

                    Completed tasks

                </h2>

                <table>

                    <thead>

                        <tr>

                            <th>

                                COMPLETED

                            </th>

                            <th>

                                PROJECT

                            </th>

                            <th>

                                TASK

                            </th>

                            <th>

                                PRIORITY

                            </th>

                            <th>

                                ACTUAL(H)

                            </th>

                            <th>

                                OPEN

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            report.length === 0 ?

                                <tr>

                                    <td

                                        colSpan="6"

                                    >

                                        No completed tasks

                                    </td>

                                </tr>

                                :

                                report.map(

                                    task => (

                                        <tr

                                            key={task.id}

                                        >

                                            <td>

                                                {

                                                    new Date(

                                                        task.created_at

                                                    )

                                                        .toLocaleDateString()

                                                }

                                            </td>

                                            <td>

                                                {task.project_name}

                                            </td>

                                            <td>

                                                {task.title}

                                            </td>

                                            <td>

                                                {task.priority}

                                            </td>

                                            <td>

                                                {task.actual_hours}

                                            </td>

                                            <td>

                                                {

                                                    task.status === "Completed"

                                                        ?

                                                        0

                                                        :

                                                        1

                                                }

                                            </td>

                                        </tr>

                                    )

                                )

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default EmployeeReportsSection;