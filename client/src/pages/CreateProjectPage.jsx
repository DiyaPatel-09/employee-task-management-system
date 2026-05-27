import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import "./EditProjectPage.css";
import { getProjects } from "../services/projectService";
import { createProject } from "../services/projectService";
import { useNavigate } from "react-router-dom";

function EditProjectPage() {

    const { id } = useParams();

    const [editId, setEditId] = useState(null);
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectStatus, setProjectStatus] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const navigate = useNavigate();

    async function handleCreateProject() {

        const token =

            localStorage.getItem(
                "token"
            );

        await createProject(

            {
                name: projectName,
                description: projectDescription,
                status: projectStatus,
                start_date: startDate,
                end_date: endDate
            },

            token

        );

        window.location.href =
            "/admin";

    }


    return (

        <div className="edit-page-wrapper">
            <Sidebar

                activeSection="projects"

                setActiveSection={(section) => {

                    localStorage.setItem(
                        "activeSection",
                        section
                    );

                    window.location.href =
                        "/admin";

                }}

            />

            <div className="edit-project-container">

                <div className="edit-project-card">

                    <h2>

                        {editId ? "Edit Project" : "Create Project"}

                    </h2>

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
                        <label>Description</label>
                        <textarea
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Status</label>
                        <select
                            value={projectStatus}
                            onChange={(e) => setProjectStatus(e.target.value)}
                        >
                            <option value="">All Status</option>
                            <option value="Planning">Pending</option>
                            <option value="Ongoing">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="On Hold">On Hold</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>

                    <div className="modal-buttons">

                        <button
                            className="assign-btn"
                            onClick={handleCreateProject}
                        >

                            {editId ? "Update" : "Create"}

                        </button>

                        <button
                            onClick={() => { handleCreateProject }}
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