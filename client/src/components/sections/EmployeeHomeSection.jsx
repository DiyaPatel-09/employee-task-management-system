import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EmployeeHomeSection() {

    const [tasks, setTasks] = useState([]);


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

    return (

        <div>

            <p className="page-breadcrumb">

                Dashboard

            </p>

            <h1 className="tasks-heading">

                My Dashboard

            </h1>

            <p className="tasks-subtitle">

                Track your assigned work and stay on top of deadlines.

            </p>

            <div className="dashboard-cards">

                <div className="dash-card">

                    <p>

                        Assigned tasks

                    </p>

                    <h2>

                        {tasks.length}

                    </h2>

                </div>

                <div className="dash-card">

                    <p>

                        Completed

                    </p>

                    <h2>

                        {

                            tasks.filter(

                                task =>

                                    task.status === "Completed"

                            ).length

                        }

                    </h2>

                </div>

                <div className="dash-card">

                    <p>

                        Pending

                    </p>

                    <h2>

                        {

                            tasks.filter(

                                task =>

                                    task.status !== "Completed"

                            ).length

                        }

                    </h2>

                </div>

            </div>

            <div className="next-step">

                <h3>

                    Next step

                </h3>

                <p>

                    Open your task list to update status, log hours, and add comments.

                </p>

                <button

                    className="goto-task-btn"

                    onClick={() =>

                        navigate(

                            "/employee-dashboard",

                            {

                                state: {

                                    section: "tasks"

                                }

                            }

                        )

                    }

                >

                    Go to my tasks

                </button>

            </div>

        </div>

    );

}

export default EmployeeHomeSection;