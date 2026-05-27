function DevelopersSection({

    employees,
    search,
    setSearch,
    setActiveSection,
    handleEditEmployee

}) {
    console.log(employees);
    return (

        <div>

            <p className="page-breadcrumb">

                Dashboard / Developers

            </p>

            <h1 className="page-title">

                Developers

            </h1>

            <p className="page-subtitle">

                Create developers, reset passwords, and keep your team list clean.

            </p>

            <div className="developer-search-box">

                <div>

                    <label>

                        Name or email

                    </label>

                    <input

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                        placeholder="e.g. abc or abc@example.com"

                    />

                </div>

                <button
                    className="assign-btn"

                    onClick={() => {

                        localStorage.setItem(
                            "activeSection",
                            "createEmployee"
                        );

                        window.location.href =
                            "/admin";

                    }}
                >

                    + Add developer

                </button>

            </div>

            <table className="developer-table">

                <thead>

                    <tr>

                        <th>

                            NAME

                        </th>

                        <th>

                            EMAIL

                        </th>

                        <th>

                            ACTIONS

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        employees.filter(emp => emp.name?.toLowerCase().includes(search.toLowerCase())
                                    ||
                                    emp.email?.toLowerCase().includes( search .toLowerCase())

                            )

                            .map(emp => (

                                <tr key={emp.id}>
                                    <td>{emp.name} </td>
                                    <td>{emp.email}</td>
                                    <td>
                                        <span className="action-edit" onClick={() => handleEditEmployee(emp)}> Edit </span>
                                        <span className="action-delete">Delete</span>
                                    </td>
                                </tr>

                            ))
                    }

                </tbody>
            </table>
        </div>

    );

}

export default DevelopersSection;