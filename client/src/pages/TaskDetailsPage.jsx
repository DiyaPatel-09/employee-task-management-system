import "./TaskDetailsPage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/layout/Sidebar";

function TaskDetailsPage() {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    useEffect(() => {

        fetchTask();
        fetchComments();

    }, []);


    const fetchTask =

        async () => {

            const token = localStorage.getItem("token");

            const response = await axios.get(`http://localhost:5000/api/tasks/${id}`,

                { headers: { Authorization: `Bearer ${token}` } }

            );

            setTask(response.data);

        };


    const fetchComments =

        async () => {

            const token = localStorage.getItem("token");

            const response = await axios.get(

                `http://localhost:5000/api/tasks/${id}/comments`,

                { headers: { Authorization: `Bearer ${token}` } }

            );

            setComments(response.data);

        };


    const handleComment =

        async () => {

            const token = localStorage.getItem("token");

            await axios.post(

                `http://localhost:5000/api/tasks/${id}/comments`,

                {

                    comment

                },

                {

                    headers: {

                        Authorization:

                            `Bearer ${token}`

                    }

                }

            );

            setComment("");

            fetchComments();

        };


    return (

        <div className="admin-layout">

            <Sidebar
                activeSection="tasks"

                setActiveSection={(section) => {

                    localStorage.setItem(
                        "section",
                        section
                    );

                    window.location.href =
                        "/admin";

                }}

            />

            <div className="task-details-page">

                <p className="page-breadcrumb">

                    Dashboard / Tasks / Task Details

                </p>
                <div className="task-header">

                    <div>

                        <h1>

                            {task?.title}

                        </h1>

                        <p>

                            Task details and collaboration

                        </p>

                    </div>

                    <span className="status-badge">

                        {task?.status}

                    </span>

                </div>


                <div className="task-top-section">

                    <div className="details-card">

                        <h3>

                            DETAILS

                        </h3>

                        <p>

                            {task?.description}

                        </p>

                        <div className="task-stats">

                            <div>

                                <p>

                                    Estimated

                                </p>

                                <h4>

                                    {task?.estimated_hours}

                                </h4>

                            </div>

                            <div>

                                <p>

                                    Actual

                                </p>

                                <h4>

                                    {task?.actual_hours}

                                </h4>

                            </div>

                            <div>

                                <p>

                                    Due

                                </p>

                                <h4>

                                    {task?.due_date}

                                </h4>

                            </div>

                        </div>

                        <p>

                            Assignee : {task?.employee_name}

                        </p>

                    </div>


                    <div className="flow-card">

                        <h3>

                            FLOW

                        </h3>

                        <p data-step="1">

                            Review details & assignees

                        </p>

                        <p data-step="2">

                            Developers update status & hours

                        </p>

                        <p data-step="3">

                            Mark completed when done

                        </p>

                    </div>

                </div>


                <div className="comments-card">

                    <h2>

                        Comments

                    </h2>

                    <h4>

                        Add a comment

                    </h4>

                    <textarea

                        value={comment}

                        onChange={(e) =>

                            setComment(
                                e.target.value
                            )

                        }

                        placeholder=

                        "Update the team..."

                    />

                    <div className="comment-actions">

                        <input type="file" />

                        <button

                            onClick={handleComment}

                        >

                            Post comment

                        </button>

                    </div>

                    <div className="comment-list">

                        {

                            comments.map(

                                comment => (

                                    <div

                                        key={comment.id}

                                        className="comment-item"

                                    >

                                        <p className="comment-meta">

                                            {comment.user_name}

                                            ·

                                            {

                                                new Date(

                                                    comment.created_at

                                                )

                                                    .toLocaleString()

                                            }

                                        </p>

                                        <p className="comment-text">

                                            {comment.comment}

                                        </p>

                                    </div>

                                )

                            )

                        }

                    </div>

                </div>



            </div>

        </div>


    );

}

export default TaskDetailsPage;