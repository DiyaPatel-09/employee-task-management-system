import Sidebar from "../components/layout/Sidebar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";
import { getTasks } from "../services/taskService";
import { useLocation } from "react-router-dom";
import ProjectsSection from "../components/sections/ProjectsSection";
import "./ProjectDetailsPage.css";

function ProjectDetailsPage() {

    const { id } = useParams();

    const [tasks, setTasks] = useState([]);
    const [project, setProject] = useState(null);
    const location = useLocation();
    const isEditPage = location.pathname.includes("/edit-project");

    useEffect(() => {

        fetchProject();
        fetchTasks();



    }, []);


    async function fetchTasks() {

        const token =
            localStorage.getItem("token");

        const data =
            await getTasks(token);

        setTasks(

            data.filter(t => Number(t.project_id) === Number(id))

        );
        console.log(data);

    }


    async function fetchProject() {

        const token =
            localStorage.getItem("token");

        const data =
            await getProjects(token);

        setProject(

            data.find(

                p =>

                    p.id === Number(id)

            )

        );

    }

    if (isEditPage) {

        return (

            <ProjectsSection />

        );

    }

    if (!project)
        return <h1>Loading...</h1>;



    return (

        <div style={{ display: "flex" }}>

            <Sidebar

                activeSection="projects"

                setActiveSection={(section) => {

                    localStorage.setItem(
                        "section",
                        section
                    );

                    window.location.href =
                        "/admin";

                }}

            />

            <div className="project-page">

                <p>

                    Dashboard /

                    Projects /

                    {project.name}

                </p>

                <div className="project-header">

                    <div>

                        <h1>

                            {project.name}

                        </h1>

                        <div className="project-status">

                            ONGOING

                        </div>


                    </div>


                    <div className="project-actions">

                        <button

                            onClick={() => {

                                localStorage.setItem(

                                    "activeSection",

                                    "assign"

                                );

                                window.location.href =

                                    "/admin";

                            }}

                        >

                            Add Task

                        </button>

                        <button

                            onClick={() =>

                                window.location.href =

                                `/admin/edit-project/${project.id}`

                            }

                        >

                            Edit

                        </button>

                        <button

                            onClick={() => {

                                window.location.href =

                                    `/admin?projectId=${id}`;

                                console.log(

                                    `/admin?projectId=${id}`

                                );

                            }}

                        >

                            All Projects

                        </button>

                    </div>

                </div>

                <div className="description-card">

                    <h4>

                        DESCRIPTION

                    </h4>

                    <p>

                        {project.description ||

                            "No description provided."

                        }

                    </p>

                </div>

                <div className="tasks-card">

                    <div className="task-heading">

                        <h2>

                            Tasks in this project

                        </h2>

                        <span>

                            {tasks.length} total

                        </span>

                    </div>
                    <div className="tasks-card">
                        <table className="project-tasks-table">

                            <thead>

                                <tr>

                                    <th>

                                        TITLE

                                    </th>

                                    <th>

                                        ASSIGNEE

                                    </th>

                                    <th>

                                        STATUS

                                    </th>

                                    <th>

                                        PRIORITY

                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    tasks.map(task => (

                                        <tr key={task.id}>

                                            <td>

                                                {task.title}

                                            </td>

                                            <td>

                                                {task.employee_name}

                                            </td>

                                            <td>

                                                <span className="status-pill">

                                                    {task.status}

                                                </span>

                                            </td>

                                            <td>

                                                {task.priority}

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>
                    </div>
                </div>
            </div>

        </div>

    );

}

export default ProjectDetailsPage;