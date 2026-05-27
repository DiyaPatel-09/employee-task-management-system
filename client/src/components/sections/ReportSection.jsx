import { useState, useEffect } from "react";

function ReportsSection({
    reports,
    developerReports,
    projects

}) {

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [projectStatus, setProjectStatus] = useState("");
    const [projectFilter, setProjectFilter] = useState("");
    const [filteredReports, setFilteredReports] = useState([]);
    const [reportType, setReportType] = useState("projects");

    useEffect(() => {

        setFilteredReports(reports || []);

    }, [reports]);



    const handleGenerate = () => {

        let filtered =

            [...reports];

        if (projectStatus) {

            filtered =

                filtered.filter(

                    report =>

                        report.status ===

                        projectStatus

                );

        }

        if (projectFilter) {

            filtered =

                filtered.filter(

                    report =>

                        report.name ===

                        projectFilter

                );

        }

        setFilteredReports(
            filtered
        );


    };

    const handleReset = () => {
        setFromDate("");
        setToDate("");
        setProjectStatus("");
        setProjectFilter("");
        setFilteredReports(reports);
    };



    return (

        <div className="reports-container">

            <p className="page-breadcrumb">

                Dashboard / Reports / Project report

            </p>

            <div className="reports-header">

                <div>

                    <h1 className="reports-title">

                        Project report

                    </h1>

                    <p className="reports-subtitle">

                        Advanced aggregation per project: tasks, hours, and completion percentage.

                    </p>

                </div>

                <div className="report-switch">

                    <button

                        className={

                            reportType === "projects"

                                ?

                                "active-report-btn"

                                :

                                ""

                        }

                        onClick={() =>

                            setReportType(
                                "projects"
                            )

                        }

                    >

                        Projects

                    </button>

                    <button

                        className={

                            reportType === "developers"

                                ?

                                "active-report-btn"

                                :

                                ""

                        }

                        onClick={() =>

                            setReportType(
                                "developers"
                            )

                        }

                    >

                        Developers

                    </button>

                </div>

            </div>

            <div className="filters-card">

                <p className="filters-heading">

                    FILTERS

                </p>

                <div className="report-filters">

                    <div>

                        <label>

                            From (project start)

                        </label>

                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                        />

                    </div>

                    <div>

                        <label>

                            To (project end)

                        </label>

                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                        />

                    </div>

                    <div>

                        <label>

                            Project status

                        </label>

                        <select
                            value={projectStatus}
                            onChange={(e) => setProjectStatus(e.target.value)}
                        >

                            <option value="">

                                All statuses

                            </option>
                            <option>
                                Pending
                            </option>

                            <option>

                                In Progress

                            </option>

                            <option>

                                On Hold

                            </option>

                            <option>

                                Completed

                            </option>

                        </select>

                    </div>

                    <div>

                        <label>

                            Project (optional)

                        </label>

                        <select
                            value={projectFilter}
                            onChange={(e) => setProjectFilter(e.target.value)}
                        >

                            <option value="">

                                All projects

                            </option>

                            {

                                projects?.map(project => (

                                    <option
                                        key={project.id}
                                        value={project.name}
                                    >

                                        {project.name}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                </div>

                <div className="report-buttons">

                    <button
                        className="generate-btn"
                        onClick={handleGenerate}
                    >
                        Generate
                    </button>

                    <button
                        className="reset-btn"
                        onClick={handleReset}
                    >
                        Reset

                    </button>

                </div>

            </div>

            <table className="reports-table">

                <thead>

                    <tr>

                        <th>

                            {

                                reportType ===

                                    "projects"

                                    ?

                                    "PROJECT"

                                    :

                                    "DEVELOPER"

                            }

                        </th>

                        <th>

                            {

                                reportType ===

                                    "projects"

                                    ?

                                    "STATUS"

                                    :

                                    "ASSIGNED TASKS"

                            }

                        </th>

                        <th>

                            COMPLETED

                        </th>

                        <th>

                            PENDING

                        </th>

                        <th>

                            {

                                reportType ===

                                    "projects"

                                    ?

                                    "EST. HOURS"

                                    :

                                    "PROJECTS COUNT"

                            }

                        </th>

                        <th>

                            ACTUAL HOURS

                        </th>

                        <th>

                            {

                                reportType ===

                                    "projects"

                                    ?

                                    "COMPLETION %"

                                    :

                                    "-"

                            }

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        (

                            reportType === "projects"

                                ?

                                filteredReports

                                :

                                developerReports

                        )

                            ?.map(report => (

                                <tr key={report.id}>

                                    <td>

                                        {report.name}

                                    </td>

                                    <td>

                                        {

                                            reportType ===

                                                "projects"

                                                ?

                                                report.status

                                                :

                                                report.assigned_tasks

                                        }

                                    </td>

                                    <td>

                                        {

                                            reportType ===

                                                "projects"

                                                ?

                                                report.completed

                                                :

                                                report.completed

                                        }

                                    </td>

                                    <td>

                                        {

                                            reportType ===

                                                "projects"

                                                ?

                                                report.pending

                                                :

                                                report.pending

                                        }

                                    </td>

                                    <td>

                                        {

                                            reportType ===

                                                "projects"

                                                ?

                                                report.estimated_hours

                                                :

                                                report.projects_count

                                        }

                                    </td>

                                    <td>

                                        {report.actual_hours}

                                    </td>

                                    <td>

                                        {

                                            reportType ===

                                                "projects"

                                                ?

                                                `${report.total_tasks

                                                    ?

                                                    Math.round(

                                                        (report.completed * 100)

                                                        / report.total_tasks

                                                    )

                                                    :

                                                    0

                                                }%`

                                                :

                                                "-"

                                        }

                                    </td>

                                </tr>

                            ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default ReportsSection;