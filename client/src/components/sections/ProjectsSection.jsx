import { useState, useEffect } from "react";
import { createProject, getProjects, deleteProject, updateProject, addProjectMember, getProjectMembers } from "../../services/projectService";
import { getEmployees } from "../../services/userService";
import axios from "axios";

function ProjectsSection() {


    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projects, setProjects] = useState([]);
    const [editId, setEditId] = useState(null);
    const [projectStatus, setProjectStatus] = useState("Ongoing");
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [selectedProject, setSelectedProject] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [employees, setEmployees] = useState([]);
    const [memberId, setMemberId] = useState("");
    const [members, setMembers] = useState([]);
    const [appliedSearch, setAppliedSearch] = useState("");
    const [appliedStatus, setAppliedStatus] = useState("");


    useEffect(() => {

        fetchProjects();

    }, []);


    const fetchProjects = async () => {

        try {

            const token = localStorage.getItem("token");
            const data = await getProjects(token);

            setProjects(data);
            console.log(data);
        }

        catch (error) {

            console.log(error);

        }

    };


    const handleCreateProject = async () => {

        try {

            const token = localStorage.getItem("token");

            const data = {
                name: projectName,
                description: projectDescription,
                status: projectStatus,
                start_date: startDate,
                end_date: endDate
            };

            if (editId) {

                await updateProject(editId, data, token);

                setEditId(null);

            }

            else {

                await createProject(data, token);

            }

            fetchProjects();


            setEditId(null);
            setProjectName("");
            setProjectDescription("");
            setProjectStatus("Ongoing");
            setStartDate("");
            setEndDate("");

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleArchiveProject =

        async (id) => {

            const token =

                localStorage.getItem(
                    "token"
                );

            await axios.put(

                `http://localhost:5000/api/projects/archive/${id}`,

                {},

                {

                    headers: {

                        Authorization:

                            `Bearer ${token}`

                    }

                }

            );

            fetchProjects();

        };


    const handleEditProject = (project) => {

        setSelectedProject(null);
        setEditId(project.id);
        setProjectName(project.name);
        setProjectDescription(project.description);
        setProjectStatus(project.status);
        setStartDate(
            project.start_date
                ?
                project.start_date.split("T")[0]
                :
                ""
        );

        setEndDate(
            project.end_date
                ?
                project.end_date.split("T")[0]
                :
                ""
        );


    };

    const handleViewProject = (project) => {

        setSelectedProject(project);
        fetchProjectMembers(project.id);
    };

    const handleCloseForm = () => {
        setEditId(null);
        setProjectName("");
        setProjectDescription("");
        setProjectStatus("Ongoing");
        setStartDate("");
        setEndDate("");
        setSelectedProject(null);
    };

    const filteredProjects = projects.filter(project => {

        const matchSearch =

            project.name
                .toLowerCase()
                .includes(
                    appliedSearch
                        .toLowerCase()
                )

            ||

            project.description
                ?.toLowerCase()
                .includes(
                    appliedSearch
                        .toLowerCase()
                );

        const matchStatus =

            appliedStatus === ""

            ||

            project.status ===
            appliedStatus;

        return (
            matchSearch
            &&
            matchStatus
        );

    });


    const handleAddMember = async () => {

        try {

            if (memberId === "") {

                alert("Select employee");

                return;

            }

            const token = localStorage.getItem("token");

            await addProjectMember(

                {
                    project_id: selectedProject.id,
                    employee_id: memberId
                },

                token

            );

            setMemberId("");

        }

        catch (error) {

            console.log(error);

        }

    };

    const fetchProjectMembers = async (id) => {

        try {

            const token = localStorage.getItem("token");

            const data = await getProjectMembers(id, token);

            setMembers(data);

        }

        catch (error) {

            console.log(error);

        }

    };


    const handleApplyFilters = () => {

        setAppliedSearch(search);

        setAppliedStatus(
            filterStatus
        );

    };

    const handleClearFilters = () => {

        console.log(
            "done"
        );
        setSearch("");
        setFilterStatus("");
        setAppliedSearch("");
        setAppliedStatus("");

    };




    return (

        <div className="projects-page">

            <p className="breadcrumb">

                Dashboard / Projects

            </p>

            <div className="projects-header">

                <div>

                    <h1 className="section-title">
                        Projects
                    </h1>

                    <p className="projects-subtitle">
                        Create and manage projects
                    </p>

                </div>

                <button
                    className="create-project-btn"

                    onClick={() => {
                        handleCloseForm();
                        window.location.href =
                            "/admin/create-project";
                    }}

                >
                    + New Project

                </button>

            </div>

            <div className="filter-box">

                <div className="filter-group">

                    <label>

                        Search

                    </label>

                    <input
                        type="text"
                        placeholder="Name or description"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <div className="filter-group">

                    <label>

                        Status

                    </label>

                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="Planning">Pending</option>
                        <option value="Ongoing">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>

                    </select>

                </div>

                <button
                    className="filter-btn"
                    onClick={handleApplyFilters}
                >
                    Apply Filters

                </button>

                <button
                    className="clear-btn"
                    onClick={handleClearFilters}
                >
                    Clear
                </button>

            </div>


            <table className="projects-table">

                <thead>

                    <tr>

                        <th> Name </th>
                        <th> Status </th>
                        <th> Tasks </th>
                        <th> Timeline </th>
                        <th> Actions </th>


                    </tr>

                </thead>

                <tbody>

                    {

                        filteredProjects.map(

                            (project, index) => (

                                <tr key={index}>

                                    <td>

                                        <span
                                            className="project-link"

                                            onClick={() =>

                                                window.location.href =

                                                `/admin/project/${project.id}`

                                            }

                                        >

                                            {project.name}

                                        </span>
                                    </td>

                                    <td>

                                        <span className="ongoing-status">

                                            {project.status}

                                        </span>

                                    </td>

                                    <td>

                                        {project.task_count}

                                    </td>

                                    <td>

                                        {
                                            project.start_date
                                                ?
                                                new Date(project.start_date).toLocaleDateString()
                                                :
                                                "-"
                                        }

                                        -

                                        {
                                            project.end_date
                                                ?
                                                new Date(project.end_date).toLocaleDateString()
                                                :
                                                "-"
                                        }

                                    </td>

                                    <td className="actions">

                                        <button
                                            className="edit-btn"

                                            onClick={() =>

                                                window.location.href =

                                                `/admin/edit-project/${project.id}`

                                            }

                                        >

                                            Edit

                                        </button>

                                        <button

                                            className="delete-btn"

                                            style={{

                                                margin: "20px",

                                                color: "#ef4444",

                                                background: "none",

                                                border: "none"

                                            }}

                                            onClick={() =>

                                                handleArchiveProject(
                                                    project.id
                                                )

                                            }

                                        >

                                            Delete

                                        </button>

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

export default ProjectsSection;