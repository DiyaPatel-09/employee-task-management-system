import "./EmployeeDashboard.css";
import "./CreateEmployeeTaskPage.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import EmployeeSidebar from "../../components/layout/EmployeeSidebar";
import { useNavigate } from "react-router-dom";
import { createTask } from "../../services/taskService";
import { getProjects } from "../../services/projectService";

function CreateTaskPage() {

    const [activeSection, setActiveSection] = useState("tasks");
    const [projects, setProjects] = useState([]);
    const [projectId, setProjectId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [status, setStatus] = useState("Pending");
    const [estimatedHours, setEstimatedHours] = useState("0");
    const [startDate, setStartDate] = useState("");
    const [dueDate, setDueDate] = useState("");



    const navigate = useNavigate();

    useEffect(() => {

        fetchProjects();

    }, []);


    const fetchProjects = async () => {

        const token =

            localStorage.getItem(
                "token"
            );

        const response =

            await axios.get(

                "http://localhost:5000/api/projects",

                {

                    headers: {

                        Authorization:

                            `Bearer ${token}`

                    }

                }

            );

        setProjects(
            response.data
        );

    };


    const handleCreateTask = async () => {

        const user = JSON.parse(

            localStorage.getItem(
                "user"
            )

        );

        await createTask({

            title,

            description,

            employee_id:
                user.id,

            priority,

            status,

            estimated_hours:
                estimatedHours,

            due_date:
                dueDate,

            project_id:
                projectId,

            attachment:
                null

        });

        navigate(
            "/my-tasks"
        );

    };

    return (

        <div className="employee-container">

            <EmployeeSidebar

                activeSection="tasks"

                setActiveSection={(section) => {

                    navigate(

                        "/employee-dashboard",

                        {

                            state: {

                                section

                            }

                        }

                    );

                }}

            />

            <div className="employee-main">

                <p className="create-breadcrumb">

                    Dashboard / My tasks / Create task

                </p>

                <h1 className="create-heading">

                    Create task

                </h1>

                <p className="create-subtitle">

                    You can create tasks only for projects where you already have assigned work.

                </p>

                <div className="create-card">

                    <div className="field-group">
                        <label>Project</label>

                        <select

                            value={projectId}

                            onChange={(e) =>

                                setProjectId(
                                    e.target.value
                                )

                            }

                        >

                            <option>

                                Select project

                            </option>


                            {

                                projects.map(project => (

                                    <option

                                        key={project.id}

                                        value={project.id}

                                    >

                                        {project.name}

                                    </option>

                                ))

                            }

                        </select>
                    </div>

                    <div className="field-group">
                        <label>Title</label>

                        <input

                            type="text"

                            value={title}

                            onChange={(e) =>

                                setTitle(
                                    e.target.value
                                )

                            }

                        />
                    </div>

                    <div className="field-group">
                        <label>Description</label>

                        <textarea

                            rows="4"

                            value={description}

                            onChange={(e) =>

                                setDescription(
                                    e.target.value
                                )

                            }

                        />
                    </div>


                    <div className="double-row">

                        <div className="field-group">

                            <label>

                                Priority

                            </label>

                            <select
                                value={priority}
                                onChange={(e) =>
                                    setPriority(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="Low">

                                    Low

                                </option>

                                <option value="Medium">

                                    Medium

                                </option>

                                <option value="High">

                                    High

                                </option>

                            </select>

                        </div>

                        <div className="field-group">

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

                                <option value="Todo">

                                    Pending

                                </option>

                                <option value="In Progress">

                                    In Progress

                                </option>

                                <option value="On Hold">

                                    On Hold

                                </option>

                                <option value="Completed">

                                    Completed

                                </option>

                            </select>

                        </div>

                    </div>
                    <div className="triple-row">

                        <div className="field-group">

                            <label>

                                Estimated hours

                            </label>

                            <input

                                type="number"

                                value={estimatedHours}

                                onChange={(e) =>

                                    setEstimatedHours(
                                        e.target.value
                                    )

                                }

                            />

                        </div>

                        <div className="field-group">

                            <label>

                                Start date

                            </label>

                            <input type="date" />

                        </div>

                        <div className="field-group">

                            <label>

                                Due date

                            </label>

                            <input

                                type="date"

                                value={dueDate}

                                required

                                onChange={(e) =>

                                    setDueDate(
                                        e.target.value
                                    )

                                }

                            />

                        </div>

                    </div>

                    <div className="field-group">


                        <label>

                            Attachment

                        </label>

                        <input type="file" />
                    </div>

                    <div className="btn-row">

                        <button

                            className="create-btn"

                            onClick={handleCreateTask}

                        >

                            Create task

                        </button>

                        <button

                            onClick={() =>

                                navigate(
                                    "/my-tasks"
                                )

                            }

                        >

                            Cancel

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default CreateTaskPage;