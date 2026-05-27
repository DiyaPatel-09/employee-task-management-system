function AssignTaskSection({

    title,
    setTitle,
    description,
    setDescription,
    employeeId,
    setEmployeeId,
    priority,
    setPriority,
    dueDate,
    setDueDate,
    employees,
    handleAssignTask,
    message,
    errorMessage,
    projectId,
    setProjectId,
    projects,
    editId,
    status,
    setStatus,
    estimatedHours,
    setEstimatedHours,
    attachment,
    setAttachment,
    isTaskEditing,
    editingTaskId,
    setIsTaskEditing,
    setEditingTaskId

}) {
    return (


        <div>

            <h1 className="section-title">
                {isTaskEditing ? "Update Task" : "Assign Task"}
            </h1>

            {message && (

                <p className="success-message">
                    {message}
                </p>

            )}

            {errorMessage && (

                <p className="error-message">
                    {errorMessage}
                </p>

            )}

            <form
                className="task-form"
                onSubmit={handleAssignTask}
            >

                <div className="form-group">

                    <label>Project</label>

                    <select
                        value={projectId}
                        onChange={(e) =>
                            setProjectId(
                                e.target.value
                            )
                        }
                    >

                        <option value="">
                            Select Project
                        </option>

                        {

                            (projects || []).map(
                                (project) => (
                                    <option
                                        key={project.id}
                                        value={project.id}
                                    >

                                        {project.name}

                                    </option>
                                )
                            )

                        }

                    </select>

                </div>


                <div className="form-group">

                    <label>Title</label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) =>
                            setTitle(
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
                        value={description}
                        onChange={(e) =>
                            setDescription(
                                e.target.value
                            )
                        }
                    />

                </div>


                <div className="row">

                    <div className="form-group">

                        <label>
                            Employee
                        </label>

                        <select
                            value={employeeId}
                            onChange={(e) =>
                                setEmployeeId(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                Select Employee
                            </option>

                            {

                                (employees || []).map(
                                    (employee) => (

                                        <option
                                            key={employee.id}
                                            value={employee.id}
                                        >

                                            {employee.name}

                                        </option>

                                    )
                                )

                            }

                        </select>

                    </div>


                    <div className="form-group">

                        <label>
                            Priority
                        </label>

                        <select
                            value={priority}
                            onChange={(e) =>
                                setPriority(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                Select Priority
                            </option>

                            <option value="Low">
                                Low
                            </option>

                            <option value="Medium">
                                Medium
                            </option>

                            <option value="High">
                                High
                            </option>

                        </select>

                    </div>

                </div>
                <div className="form-group">
                    <label>Status</label>

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >

                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>

                    </select>

                </div>

                <div className="form-group">

                    <label>Estimated Hours</label>

                    <input
                        type="number"
                        value={estimatedHours}
                        onChange={(e) => setEstimatedHours(e.target.value)}
                        placeholder="Enter hours"
                    />

                </div>

                <div className="form-group">

                    <label>
                        Due Date
                    </label>

                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) =>
                            setDueDate(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="form-group">

                    <label>
                        Attachment
                    </label>

                    <input
                        type="file"
                        onChange={(e) =>
                            setAttachment(
                                e.target.files[0]
                            )}
                    />

                </div>

                <button
                    type="submit"
                    className="assign-btn"
                >

                    {isTaskEditing ? "Update Task" : "Assign Task"}

                </button>

                {isTaskEditing && (
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => {
                            setIsTaskEditing(false);
                            setEditingTaskId(null);
                            setTitle("");
                            setDescription("");
                            setPriority("");
                            setStatus("Pending");
                            setEmployeeId("");
                            setProjectId("");
                            setEstimatedHours("");
                            setAttachment("");
                            setDueDate("");
                            localStorage.setItem("activeSection", "tasks");
                            setActiveSection("tasks");
                            window.location.reload();
                        }}
                    >
                        Cancel
                    </button>
                )}

            </form>

        </div>

    )
}

export default AssignTaskSection;