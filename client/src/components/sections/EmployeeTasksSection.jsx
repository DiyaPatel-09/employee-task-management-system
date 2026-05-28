import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {FaPlus,FaChartBar} from "react-icons/fa";


function EmployeeTasksSection() {

    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        fetchTasks();

    }, []);

    const fetchTasks = async () => {

        const token = localStorage.getItem("token");

        const response = await axios.get(

            "http://localhost:5000/api/tasks/my",

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        setTasks(response.data);

    };

    const filteredTasks = tasks.filter(

        task =>

            task.title

                .toLowerCase()

                .includes(

                    search.toLowerCase()

                )

            &&

            (

                status === ""

                ||

                task.status === status

            )

    );

    return (

        <div>

            <p className="page-breadcrumb">

                Dashboard / My tasks

            </p>

            <div className="tasks-top">

                <div>

                    <h1 className="tasks-heading">

                        My tasks

                    </h1>

                    <p className="tasks-subtitle">

                        Everything assigned to you. Open a task to update progress and log time.

                    </p>

                </div>

                <button

                    className="new-task-btn"

                    onClick={() =>

                        navigate(

                            "/create-task"

                        )

                    }

                >

                   + Add new task

                </button>

            </div>

            <div className="filter-card">

                <h4>

                    FILTERS

                </h4>

                <div className="filter-row">

                    <div className="filter-group">

                        <label>

                            Search

                        </label>

                        <input

                            type="text"

                            placeholder="Task title"

                            value={search}

                            onChange={(e) =>

                                setSearch(

                                    e.target.value

                                )

                            }

                        />

                    </div>

                    <div className="filter-group">

                        <label>

                            Status

                        </label>

                        <select

                            value={status}

                            onChange={(e) =>

                                setStatus(

                                    e.target.value

                                )

                            }

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

                                Completed

                            </option>
                            <option>

                                On Hold

                            </option>

                        </select>

                    </div>

                    <button className="apply-btn">

                        Apply

                    </button>

                </div>

            </div>

            <table className="task-table">

                <thead>

                    <tr>

                        <th>TASK</th>

                        <th>PROJECT</th>

                        <th>STATUS</th>

                        <th>DUE</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filteredTasks.map(

                            task => (

                                <tr key={task.id}>

                                    <td

                                        className="task-link"

                                        onClick={() =>

                                            navigate(

                                                `/my-tasks/${task.id}`

                                            )

                                        }

                                    >

                                        {task.title}

                                    </td>

                                    <td>

                                        {task.project_name}

                                    </td>

                                    <td>

                                        {task.status}

                                    </td>

                                    <td>

                                        {

                                            task.due_date

                                                ?

                                                new Date(

                                                    task.due_date

                                                )

                                                    .toLocaleDateString()

                                                :

                                                "-"

                                        }

                                    </td>

                                </tr>

                            )

                        )

                    }

                </tbody>

            </table>

        </div>

    );

}

export default EmployeeTasksSection;