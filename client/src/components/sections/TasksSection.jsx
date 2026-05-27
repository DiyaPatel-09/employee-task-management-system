import { useState } from "react";
import { useNavigate } from "react-router-dom";


function TasksSection({
    tasks,
    projects,
    taskSearch,
    setTaskSearch,
    taskProject,
    setTaskProject,
    taskStatus,
    setTaskStatus,
    handleArchiveTask,
    setActiveSection

}) {

    const [search, setSearch] = useState("");
    const [projectFilter, setProjectFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const navigate = useNavigate();


    const filteredTasks =

        tasks.filter(task => {

            const searchMatch = task.title.toLowerCase().includes(search.toLowerCase());

            const projectMatch = !projectFilter || task.project_name === projectFilter;

            const statusMatch = !statusFilter || task.status === statusFilter;

            return searchMatch && projectMatch && statusMatch;

        });

    return (

        <div className="tasks-container">

            <p className="page-breadcrumb">

                Dashboard / Tasks

            </p>

            <div className="tasks-top">

                <div>

                    <h1 className="tasks-title">

                        Tasks

                    </h1>

                    <p className="tasks-subtitle">

                        Assign work, set priority, and track progress across projects.

                    </p>

                </div>

                <button

                    className="new-task-btn"

                    onClick={() => setActiveSection("assign")}

                >
                    + New Task
                </button>

            </div>

            <div className="filters-card">

                <p className="filters-heading">

                    FILTERS

                </p>

                <div className="filters-grid">

                    <div>

                        <label>Search</label>

                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Task title"
                        />

                    </div>

                    <div>

                        <label>Project</label>

                        <select
                            value={projectFilter}
                            onChange={(e) => setProjectFilter(e.target.value)}
                        >

                            <option value="">

                                All Projects

                            </option>

                            {

                                projects.map(p => (

                                    <option
                                        key={p.id}
                                        value={p.name}
                                    >

                                        {p.name}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                    <div>

                        <label>Status</label>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >

                            <option value="">

                                All Statuses

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
                                On hold
                            </option>

                        </select>

                    </div>

                    <button className="apply-btn">

                        Apply

                    </button>

                </div>

            </div>



            <table className="tasks-table">

                <thead>

                    <tr>

                        <th>TITLE</th>

                        <th>PROJECT</th>

                        <th>PRIORITY</th>

                        <th>STATUS</th>

                        <th>ASSIGNEES</th>

                        <th>ACTIONS</th>

                    </tr>

                </thead>
                <tbody>

                    {

                        filteredTasks.map(task => (

                            <tr
                                key={task.id}
                            >

                                <td

                                    className=

                                    "task-link"

                                    onClick={() =>

                                        navigate(

                                            `/task/${task.id}`

                                        )

                                    }

                                >

                                    {task.title}

                                </td>

                                <td>

                                    {task.project_name || "-"}

                                </td>

                                <td>

                                    {task.priority}

                                </td>

                                <td>

                                    {task.status}

                                </td>

                                <td>

                                    {task.employee_name}

                                </td>

                                <td>

                                    <span

                                        className="action-edit"

                                        onClick={() => {

                                            localStorage.setItem(
                                                "editTask",
                                                JSON.stringify(task)
                                            );

                                            localStorage.setItem(
                                                "activeSection",
                                                "assign"
                                            );

                                            window.location.href =
                                                "/admin";

                                        }}

                                    >

                                        Edit

                                    </span>

                                    <span

                                        className="action-delete"

                                        onClick={() => handleArchiveTask(task.id)}

                                    >

                                        Delete

                                    </span>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default TasksSection;