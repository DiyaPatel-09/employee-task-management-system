import axios from "axios";
import "./TaskCard.css";
import { useEffect, useState } from "react";

function TaskCard({ task }) {

  const [status, setStatus] = useState(task.status);
  const [actualHours, setActualHours] = useState(task.actual_hours || 0);
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {

    fetchComments();

  }, []);

  const handleUpdateStatus = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.put(

        `http://localhost:5000/api/tasks/${task.id}`,

        {
          status,
          actual_hours: actualHours
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );

      console.log(response.data);

      setIsEditing(false);

    } catch (error) {

      console.log(error.response.data);

    }

  };


  const handleComment = async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await axios.post(

        "http://localhost:5000/api/tasks/comment",

        {
          task_id: task.id,
          comment
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );

      fetchComments();

      setComment("");

    } catch (error) {

      console.log(error);

    }

  };

  const fetchComments = async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await axios.get(

          `http://localhost:5000/api/tasks/comment/${task.id}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

      setComments(
        response.data
      );

    } catch (error) {

      console.log(error);

    }

  };


  return (

    <div className="task-card">

      <h2 className="task-title">
        {task.title}
      </h2>

      <p className="task-desc">
        {task.description}
      </p>

      {
        task.attachment

        &&

        <a
          href={`http://localhost:5000/uploads/${task.attachment}`}

          target="_blank"
        >
          View Attachment
        </a>

      }

      <div className="hours-section">

        <p>
          Estimated:
          {task.estimated_hours || 0} hrs
        </p>

        <p>
          Actual:
          {actualHours} hrs
        </p>

      </div>

      <div className="comment-box">

        <h4>
          Comments
        </h4>

        <input
          type="text"
          value={comment}
          onChange={(e) =>
            setComment(
              e.target.value
            )}
          placeholder="Add comment"
        />

        <button
          onClick={handleComment}
        >

          Send

        </button>

        {
          comments.map(
            (c) => (

              <p key={c.id}>

                <b>
                  {c.name}
                </b>

                :
                {c.comment}

              </p>

            )
          )
        }

      </div>

      <div className="task-footer">

        {!isEditing ? (

          <>

            <span className="status">
              {status}
            </span>

            <button
              className="update-btn"
              onClick={() => setIsEditing(true)}
            >
              Change Status
            </button>

          </>

        ) : (

          <>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >

              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Completed">
                Completed
              </option>

              <option value="On Hold">
                On Hold
              </option>

            </select>

            <div className="hours-box">

              <label>Actual Hours</label>

              <input
                type="number"
                value={actualHours}
                onChange={(e) =>
                  setActualHours(
                    e.target.value
                  )
                }
              />

            </div>

            <button
              className="update-btn"
              onClick={handleUpdateStatus}
            >
              Save
            </button>

          </>

        )}

      </div>

    </div>

  );

}

export default TaskCard;