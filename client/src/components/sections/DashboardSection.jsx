import StatCard from "../cards/StatCard";
import { useState, useEffect } from "react";
import { getProjects } from "../../services/projectService";
import { getTasks } from "../../services/taskService";
import { getEmployees } from "../../services/userService";
import {FaFolder,FaTasks,FaCheckCircle,FaUsers} from "react-icons/fa";


function DashboardSection({

    setActiveSection

}) {

    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {

        async function load() {

            const token =
                localStorage.getItem(
                    "token"
                );
if (!token) return;
            const projectData =
                await getProjects(
                    token
                );

            const taskData =
                await getTasks(
                    token
                );

            const employeeData =
                await getEmployees(
                    token
                );

            setProjects(
                projectData
            );

            setTasks(
                taskData
            );

            setEmployees(
                employeeData
            );

        }

        load();


    }, []);

    return (

        <div className="dashboard-page">

            <p className="dashboard-breadcrumb">

                Dashboard

            </p>

            <h1 className="dashboard-title">

                Admin dashboard

            </h1>

            <p className="dashboard-subtitle">

                Overview of projects, tasks, and team activity at a glance.

            </p>

            <div className="stats-grid">

                <div className="stat-card">

                    <p> Total projects</p>

                    <h2>📁 {projects.length}</h2>

                </div>

                <div className="stat-card">

                    <p>Total tasks</p>

                    <h2>📋 {tasks.length}</h2>

                </div>

                <div className="stat-card">

                    <p>Completed this month</p>

                    <h2>✔ {tasks.filter(t => t.status === "Completed").length}</h2>

                </div>

                <div className="stat-card">

                    <p>Active developers</p>

                    <h2>👥 {employees.length}</h2>

                </div>

            </div>

            <div className="quick-actions">

                <h3>

                    Quick actions

                </h3>

                <div className="quick-buttons">

                    <button

                        onClick={() => {

                            window.location.href =
                                "/admin/create-project";

                        }}

                    >

                        + New project

                    </button>

                    <button

                        onClick={() => setActiveSection("assign")}
                    >
                        
                    📝 New task
                    </button>

                    <button

                        onClick={() =>

                            setActiveSection(
                                "reports"
                            )

                        }

                    >

                      📊 View Reports

                    </button>

                </div>

            </div>

        </div>


    );

}

export default DashboardSection;