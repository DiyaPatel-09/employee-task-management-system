import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EmployeeSidebar from "../../components/layout/EmployeeSidebar";
import "./EmployeeTaskDetailsPage.css";
import { updateTask } from "../../services/taskService";
import { formatDateTime } from "../../utils/formatDate";


function EmployeeTaskDetailsPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [task, setTask] = useState({});
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [actualHours, setActualHours] = useState(0);
    const [status, setStatus] = useState("");
    const [attachment, setAttachment] = useState(null);


    useEffect(() => {

        fetchTask();

    }, []);

    const fetchTask = async () => {

        const token =

            localStorage.getItem(
                "token"
            );

        const response =

            await axios.get(

                `http://localhost:5000/api/tasks/${id}`,

                {

                    headers: {

                        Authorization:

                            `Bearer ${token}`

                    }

                }

            );

        setTask(
            response.data
        );

        setStatus(
            response.data.status
        );

        setActualHours(

            response.data.actual_hours || 0

        );

        const commentResponse =

            await axios.get(

                `http://localhost:5000/api/tasks/${id}/comments`,

                {

                    headers: {

                        Authorization:

                            `Bearer ${token}`

                    }

                }

            );

        setComments(

            commentResponse.data

        );

    };


    const handleSaveUpdate = async () => {

        const token =

            localStorage.getItem(
                "token"
            );

        await updateTask(

            id,

            {

                title:

                    task.title,

                description:

                    task.description,

                employee_id:

                    task.employee_id,

                priority:

                    task.priority,

                status,

                estimated_hours:

                    task.estimated_hours,

                actual_hours:

                    actualHours,

                due_date:

                    task.due_date?.split("T")[0],

                project_id:

                    task.project_id

            },

            token

        );

        fetchTask();

    };


    const handleComment =

        async () => {

            const token =

                localStorage.getItem(
                    "token"
                );

            let filename = null;

            if (

                attachment

            ) {

                const formData =

                    new FormData();

                formData.append(

                    "file",

                    attachment

                );

                const upload =

                    await axios.post(

                        "http://localhost:5000/api/tasks/upload",

                        formData,

                        {

                            headers: {

                                Authorization:

                                    `Bearer ${token}`

                            }

                        }

                    );

                filename =

                    upload.data.filename;

            }

            await axios.post(

                `http://localhost:5000/api/tasks/${id}/comments`,

                {

                    comment,

                    attachment:

                        filename

                },

                {

                    headers: {

                        Authorization:

                            `Bearer ${token}`

                    }

                }

            );

            setComment("");

            fetchTask();

        };



    return (

        <div className="employee-dashboard">

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

                <div className="employee-task-details">

                    <div className="task-header">

                        <div>

                            <p className="breadcrumb">

                                Dashboard / My tasks /
                                {task.title}

                            </p>

                            <h1>

                                {task.title}

                            </h1>

                            <p className="task-subtitle">

                                {task.project_name || "No Project"}

                                <span className="status-pill">

                                    {task.status}

                                </span>

                            </p>

                        </div>

                        <button

                            className="back-btn"

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

                            ← My tasks

                        </button>

                    </div>


                    <div className="details-row">

                        <div className="details-card">

                            <h4>

                                DESCRIPTION

                            </h4>

                            <p>

                                {task.description ||

                                    "No description."}

                            </p>

                            <div className="info-row">

                                <div>

                                    <p>

                                        Estimated hours

                                    </p>

                                    <h3>

                                        {task.estimated_hours}

                                    </h3>

                                </div>

                                <div>

                                    <p>

                                        Due date

                                    </p>

                                    <h3>

                                        {

                                            task.due_date ?

                                                formatDateTime(

                                                    task.due_date

                                                )

                                                :

                                                "-"

                                        }

                                    </h3>

                                </div>

                            </div>

                        </div>

                        <div className="flow-card">

                            <h4>

                                SUGGESTED FLOW

                            </h4>

                            <ul>

                                <li>

                                    → Set In progress when you start

                                </li>

                                <li>

                                    → Update actual hours regularly

                                </li>

                                <li>

                                    → Use comments for blockers

                                </li>

                            </ul>

                        </div>

                    </div>


                    <div className="progress-card">

                        <h2>

                            Update your progress

                        </h2>

                        <p>

                            Change status and record actual hours.

                        </p>

                        <div className="progress-row">

                            <div>

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

                                    <option>

                                        Pending

                                    </option>

                                    <option>

                                        In progress

                                    </option>

                                    <option>

                                        Completed

                                    </option>

                                    <option>

                                        On Hold

                                    </option>

                                </select>

                            </div>

                            <div>

                                <label>

                                    Actual hours

                                </label>

                                <input

                                    value={actualHours}

                                    onChange={(e) =>

                                        setActualHours(

                                            e.target.value

                                        )

                                    }

                                />

                            </div>

                            <button

                                onClick={handleSaveUpdate}

                            >

                                Save update

                            </button>

                        </div>

                    </div>


                    <div className="comments-card">

                        <h2>

                           💬 Comments

                        </h2>

                        <label>

                            Add comment

                        </label>

                        <textarea

                            value={comment}

                            onChange={(e) =>

                                setComment(

                                    e.target.value

                                )

                            }

                        />

                        <br />

                        <label>

                            Attachment(optional)

                        </label>
                        <div className="comment-actions">

                            <input

                                type="file"

                                onChange={(e) =>

                                    setAttachment(

                                        e.target.files[0]

                                    )

                                }

                            />

                            <button

                                onClick={handleComment}

                            >

                                Post

                            </button>
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

                                                        formatDateTime(

                                                            comment.created_at

                                                        )
                                            
                                                    }

                                                </p>

                                                <p className="comment-text">

                                                    {comment.comment}

                                                </p>
                                                {

                                                    comment.attachment && (

                                                        <a

                                                            href={

                                                                `http://localhost:5000/uploads/${comment.attachment}`

                                                            }

                                                            target="_blank"

                                                            rel="noreferrer"

                                                        >

                                                            View attachment

                                                        </a>

                                                    )

                                                }

                                            </div>

                                        )

                                    )
                                }
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default EmployeeTaskDetailsPage;