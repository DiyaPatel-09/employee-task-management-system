import { useState } from 'react';
import "./AdminDashboard.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import DashboardSection from "../../components/sections/DashboardSection";
import TasksSection from "../../components/sections/TasksSection";
import AssignTaskSection from "../../components/sections/AssignTaskSection";
import CreateEmployeeSection from "../../components/sections/CreateEmployeeSection";
import { getTasks, assignTask, deleteTask, updateTask, archiveTask, getProjectReport } from "../../services/taskService";
import { getEmployees, createEmployee, updateEmployee } from "../../services/userService";
import ReportSection from "../../components/sections/ReportSection";
import ProjectsSection from "../../components/sections/ProjectsSection";
import { getProjects } from "../../services/projectService";
import ProjectDetailsPage from "../ProjectDetailsPage";
import DevelopersSection from '../../components/sections/DevelopersSection';
import AdminProfileSection from '../../components/sections/ProfileSection';



function AdminDashboard() {
    const params =

        new URLSearchParams(

            window.location.search

        );

    const prefilledSection =

        params.get(
            "section"
        );

    const prefilledProjectId =

        params.get(
            "projectId"
        );
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [priority, setPriority] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("employee");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [employees, setEmployees] = useState([]);
    const [projects, setProjects] = useState([]);
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectStatus, setProjectStatus] = useState("Ongoing");
    const [activeSection, setActiveSection] = useState(prefilledSection || localStorage.getItem("section") || "dashboard");
    const [projectId, setProjectId] = useState(prefilledProjectId || "");
    const [status, setStatus] = useState("Pending");
    const [estimatedHours, setEstimatedHours] = useState("");
    const [attachment, setAttachment] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [search, setSearch] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editingEmployeeId, setEditingEmployeeId] = useState(null);
    const [taskSearch, setTaskSearch] = useState("");
    const [taskProject, setTaskProject] = useState("");
    const [taskStatus, setTaskStatus] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [isTaskEditing, setIsTaskEditing] = useState(false);
    const [reports, setReports] = useState([]);
    const [developerReports, setDeveloperReports] = useState([]);




    const [searchParams] = useSearchParams();


    const navigate = useNavigate();


    useEffect(() => {

        fetchEmployees();
        fetchTasks();
        fetchProjects();
        fetchReports();
        fetchDeveloperReports();

        const selectedProjectId = searchParams.get("projectId");

        if (selectedProjectId &&
            window.location.pathname
            === "/admin/assign-task") {
            setProjectId(selectedProjectId);
            setActiveSection("assign");
        }


        const editProjectId = searchParams.get("projectId");

        if (editProjectId) {
            localStorage.setItem(
                "editProjectId",
                editProjectId
            );

        }


        const savedSection = localStorage.getItem("activeSection");

        if (savedSection) {

            setActiveSection(savedSection);

            localStorage.removeItem("activeSection");

        }


        const editEmployee = JSON.parse(localStorage.getItem("editEmployee"));
        if (editEmployee) {
            setName(editEmployee.name);
            setEmail(editEmployee.email);
            setRole(editEmployee.role || "employee");
            setEditingEmployeeId(editEmployee.id);
            setIsEditing(true);
            localStorage.removeItem("editEmployee");
        }


        const editTask = JSON.parse(
            localStorage.getItem(
                "editTask"
            )
        );

        if (editTask) {
            setTitle(editTask.title);
            setDescription(editTask.description);
            setPriority(editTask.priority);
            setStatus(editTask.status);
            setEstimatedHours(editTask.estimated_hours || "");
            setAttachment(editTask.attachment || "");
            setDueDate(editTask.due_date?.split("T")[0] || "");
            setEditingTaskId(editTask.id);
            setIsTaskEditing(true);
            setEmployeeId(
                editTask.employee_id
                || employees.find(
                    e => e.name === editTask.employee_name
                )?.id
                || ""
            );

            setProjectId(
                editTask.project_id
                || projects.find(
                    p => p.name === editTask.project_name
                )?.id
                || ""
            );
            setPriority(editTask.priority);
            localStorage.removeItem("editTask");

        }




        const section =

            localStorage.getItem(
                "activeSection"
            );

        if (section) {

            setActiveSection(
                section
            );

            localStorage.removeItem(
                "activeSection"
            );

        }


    }, []);


    const handleAssignTask = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            const formData = new FormData();

            formData.append("title", title);
            formData.append("description", description);
            formData.append("employee_id", employeeId);
            formData.append("priority", priority);
            formData.append("status", status);
            formData.append("estimated_hours", estimatedHours);
            formData.append("due_date", dueDate);
            formData.append("project_id", projectId);
            formData.append("attachment", attachment);

            if (isTaskEditing) {

                await updateTask(

                    editingTaskId,
                    {
                        title,
                        description,
                        employee_id: employeeId,
                        project_id: projectId,
                        status,
                        priority,
                        estimated_hours: estimatedHours,
                        due_date: dueDate,
                        attachment
                    },

                    token

                );

                setIsTaskEditing(false);
                setEditingTaskId(null);

                localStorage.setItem("activeSection", "tasks");
                window.location.href = "/admin";

            }

            else {
                await assignTask(

                    {
                        title,
                        description,
                        employee_id: employeeId,
                        project_id: projectId,
                        status,
                        priority,
                        estimated_hours: estimatedHours,
                        due_date: dueDate,
                        attachment
                    },
                    token
                );

            }

            setTitle("");
            setDescription("");
            setPriority("");
            setStatus("Pending");
            setEmployeeId("");
            setProjectId("");
            setEstimatedHours("");
            setAttachment("");
            setDueDate("");



        } catch (error) {

            console.log(error);

        }

    };

    const fetchTasks = async () => {

        try {

            const token = localStorage.getItem("token");
            const data = await getTasks(token);
            setTasks(data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleCreateEmployee = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            if (isEditing) {

                await updateEmployee(editingEmployeeId, { name, email, role }, token);
                setIsEditing(false);
                setEditingEmployeeId(null);

            }

            else {

                await createEmployee({ name, email, password, role }, token);

            }

            await fetchEmployees();

            setMessage("Employee created successfully");
            setTimeout(() => {

                setMessage("");

            }, 3000);

            setErrorMessage("");

            setName("");
            setEmail("");
            setPassword("");
            setRole("employee");

        } catch (error) {

            setErrorMessage("Failed to create employee");

            setTimeout(() => {

                setErrorMessage("");

            }, 3000);

            setMessage("");

        }

    };


    const fetchEmployees = async () => {

        try {

            const token = localStorage.getItem("token");
            const data = await getEmployees(token);
            setEmployees(data);

        }

        catch (error) {

            console.log(error);

        }

    };


    const fetchReports = async () => {

        console.log("clicked");

        try {

            const token =

                localStorage.getItem(

                    "token"

                );

            const response =

                await axios.get(

                    `http://localhost:5000/api/tasks/project-report?startDate=${startDate || "1900-01-01"}&endDate=${endDate || "2100-01-01"}`,

                    {

                        headers: {

                            Authorization:

                                `Bearer ${token}`

                        }

                    }

                );

            console.log(

                response.data

            );



            setReports(response.data);

        }

        catch (error) {

            console.log(

                error

            );

        }

    };

    const fetchProjects = async () => {

        try {

            const token = localStorage.getItem("token");
            const data = await getProjects(token);
            setProjects(data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");

    };

    const handleViewProject = (project) => {

        setSelectedProject(project);

    };

    const handleEditEmployee = (employee) => {

        localStorage.setItem("editEmployee", JSON.stringify(employee));
        localStorage.setItem("activeSection", "createEmployee");
        window.location.href = "/admin";

    };


    const handleArchiveTask = async (id) => {

        const token = localStorage.getItem("token");
        await archiveTask(id, token);
        setTasks(prev => prev.filter(task => task.id !== id));

    }


    const fetchDeveloperReports =

        async () => {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5000/api/tasks/developer-report", { headers: { Authorization: `Bearer ${token}` } });

            setDeveloperReports(response.data);

        };



    return (

        <div className="admin-container">
            <Sidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                handleLogout={handleLogout}

            />


            {/* MAIN CONTENT */}

            <div className="main-content">

                <div className="content-wrapper">

                    {
                        activeSection === "dashboard"
                        && (
                            <DashboardSection
                                tasks={tasks}
                                employees={employees}
                                setActiveSection={setActiveSection}
                            />
                        )
                    }


                    {
                        activeSection === "employee"
                        && (
                            <DevelopersSection
                                employees={employees}
                                search={search}
                                setSearch={setSearch}
                                setActiveSection={setActiveSection}
                                handleEditEmployee={handleEditEmployee}
                            />
                        )
                    }


                    {

                        activeSection === "assign"
                        && (

                            <AssignTaskSection
                                title={title}
                                setTitle={setTitle}
                                description={description}
                                setDescription={setDescription}
                                employeeId={employeeId}
                                setEmployeeId={setEmployeeId}
                                priority={priority}
                                setPriority={setPriority}
                                dueDate={dueDate}
                                setDueDate={setDueDate}
                                employees={employees}
                                handleAssignTask={handleAssignTask}
                                message={message}
                                errorMessage={errorMessage}
                                projectId={projectId}
                                setProjectId={setProjectId}
                                projects={projects}
                                status={status}
                                setStatus={setStatus}
                                estimatedHours={estimatedHours}
                                setEstimatedHours={setEstimatedHours}
                                attachment={attachment}
                                setAttachment={setAttachment}
                                isTaskEditing={isTaskEditing}
                                editingTaskId={editingTaskId}
                                setIsTaskEditing={setIsTaskEditing}
                                setEditingTaskId={setEditingTaskId}
                                setActiveSection={setActiveSection}
                            />
                        )
                    }


                    {activeSection === "tasks" && (
                        <div>
                            <TasksSection
                                tasks={tasks}
                                projects={projects}
                                taskSearch={taskSearch}
                                setTaskSearch={setTaskSearch}
                                taskProject={taskProject}
                                setTaskProject={setTaskProject}
                                taskStatus={taskStatus}
                                setTaskStatus={setTaskStatus}
                                handleArchiveTask={handleArchiveTask}
                                setActiveSection={setActiveSection}
                            />
                        </div>
                    )}


                    {
                        activeSection === "reports"
                        && (
                            <ReportSection
                                startDate={startDate}
                                setStartDate={setStartDate}
                                endDate={endDate}
                                setEndDate={setEndDate}
                                fetchReports={fetchReports}
                                reports={reports}
                                projects={projects}
                                developerReports={developerReports}

                            />
                        )
                    }
                    {

                        activeSection === "profile"

                        &&

                        <AdminProfileSection />

                    }

                    {
                        activeSection ===
                        "createEmployee"

                        && (

                            <CreateEmployeeSection
                                name={name}
                                setName={setName}

                                email={email}
                                setEmail={setEmail}

                                password={password}
                                setPassword={setPassword}

                                role={role}
                                setRole={setRole}

                                handleCreateEmployee={
                                    handleCreateEmployee
                                }

                                message={message}

                                errorMessage={
                                    errorMessage
                                }

                                isEditing={isEditing}
                            />

                        )
                    }


                </div>
                {
                    activeSection === "projects"
                    &&
                    <ProjectsSection />
                }
            </div >

        </div>

    );
}

export default AdminDashboard;