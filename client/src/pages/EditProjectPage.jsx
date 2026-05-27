import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import "./EditProjectPage.css";
import { getProjects } from "../services/projectService";

function EditProjectPage() {

    const { id } = useParams();

    const [editId, setEditId] = useState(null);
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectStatus, setProjectStatus] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {

        async function loadProject() {

            const token =
                localStorage.getItem(
                    "token"
                );

            const projects =
                await getProjects(
                    token
                );

            const project =

                projects.find(

                    p =>

                        p.id === Number(id)

                );

            if (project) {

                setEditId(
                    project.id
                );

                setProjectName(
                    project.name
                );

                setProjectDescription(
                    project.description
                );

                setProjectStatus(
                    project.status
                );

                setStartDate(

                    project.start_date
                        ?.split("T")[0]

                );

                setEndDate(

                    project.end_date
                        ?.split("T")[0]

                );
                setDueDate(
task.due_date
?.split("T")[0]
);

            }

        }

        loadProject();

    }, []);


    const handleUpdateProject =

        async () => {

            const token =

                localStorage.getItem(
                    "token"
                );

            await fetch(

                `http://localhost:5000/api/projects/${editId}`,

                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`

                    },

                    body:

                        JSON.stringify({

                            name:
                                projectName,

                            description:
                                projectDescription,

                            status:
                                projectStatus,

                            start_date:
                                startDate,

                            end_date:
                                endDate

                        })

                }

            );

            alert(
                "Project updated"
            );

            window.location.href =
                "/admin";

        };



    return (

        <div className="edit-page-wrapper">

            <Sidebar

                activeSection="projects"

                setActiveSection={(section) => {

                    if (section === "projects") {

                        window.location.href =
                            "/admin";

                    }

                }}

            />

            <div className="edit-project-container">

                <p className="breadcrumb">

                    Dashboard / Projects /
                    {projectName || "Project"} / Edit

                </p>

                <div className="edit-header">

                    <div>

                        <h1>

                            Edit Project

                        </h1>

                        <p>

                            {projectName}

                        </p>

                    </div>
                    <button

                        className="view-btn"

                        onClick={() =>

                            window.location.href =

                            `/admin/project/${editId}`

                        }

                    >

                        View Project

                    </button>

                </div>

                <div className="edit-project-card">




                    <div className="form-group">

                        <label>

                            Project Name

                        </label>

                        <input
                            value={projectName}
                            onChange={(e) =>

                                setProjectName(
                                    e.target.value
                                )

                            }
                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Description

                        </label>

                        <textarea
                            value={projectDescription}
                            onChange={(e) =>

                                setProjectDescription(
                                    e.target.value
                                )

                            }
                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Status

                        </label>

                        <select

                            value={projectStatus}

                            onChange={(e) =>

                                setProjectStatus(
                                    e.target.value
                                )

                            }

                        >

                            <option value="">

                                All Status

                            </option>

                            <option value="Planning">

                                Pending

                            </option>

                            <option value="Ongoing">

                                In Progress

                            </option>

                            <option value="Completed">

                                Completed

                            </option>

                            <option value="On Hold">

                                On Hold

                            </option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>

                            Start Date

                        </label>

                        <input

                            type="date"

                            value={startDate}

                            onChange={(e) =>

                                setStartDate(
                                    e.target.value
                                )

                            }

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            End Date

                        </label>

                        <input

                            type="date"

                            value={endDate}

                            onChange={(e) =>

                                setEndDate(
                                    e.target.value
                                )

                            }

                        />

                    </div>

                    <div className="modal-buttons">

                        <button

                            className="assign-btn"

                            onClick={
                                handleUpdateProject
                            }

                        >

                            Update Project

                        </button>

                        <button

                            onClick={() => {

                                window.location.href =
                                    "/admin";

                            }}

                        >

                            Cancel

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default EditProjectPage;