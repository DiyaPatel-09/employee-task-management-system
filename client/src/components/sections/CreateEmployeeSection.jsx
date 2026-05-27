function CreateEmployeeSection({
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    role,
    setRole,
    handleCreateEmployee,
    message,
    errorMessage,
    isEditing

}) {

    return (

        <div>

            <h1 className="section-title">

                {isEditing ? "Edit Employee" : "Create Employee"}

            </h1>

            {

                message

                &&

                <div className="success-message">

                    {message}

                </div>

            }

            {

                errorMessage

                &&

                <div className="error-message">

                    {errorMessage}

                </div>

            }

            <div className="task-form">

                <div className="form-group">

                    <label>

                        Name

                    </label>

                    <input

                        type="text"

                        value={name}

                        onChange={(e) =>

                            setName(

                                e.target.value

                            )

                        }

                    />

                </div>

                <div className="form-group">

                    <label>

                        Email

                    </label>

                    <input

                        type="email"

                        value={email}

                        onChange={(e) =>

                            setEmail(

                                e.target.value

                            )

                        }

                    />

                </div>

                <div className="form-group">

                    <label>

                        Password

                    </label>

                    <input

                        type="password"

                        value={password}

                        onChange={(e) =>

                            setPassword(

                                e.target.value

                            )

                        }

                    />

                </div>

                <div className="form-group">

                    <label>

                        Role

                    </label>

                    <select

                        value={role}

                        onChange={(e) =>

                            setRole(

                                e.target.value

                            )

                        }

                    >

                        <option value="employee">

                            Employee

                        </option>

                        <option value="admin">

                            Admin

                        </option>

                    </select>

                </div>

                <button

                    className="assign-btn"

                    onClick={handleCreateEmployee}
                >
                    {isEditing ? "Update Employee" : "Create Employee"}

                </button>

            </div>

        </div>

    );

}

export default CreateEmployeeSection;