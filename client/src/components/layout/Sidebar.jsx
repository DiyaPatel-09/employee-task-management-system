import { LayoutDashboard, FolderKanban, Users, ClipboardList, BarChart3 } from "lucide-react";


function Sidebar({

    activeSection,

    setActiveSection,

    handleLogout

}) {

    const user = JSON.parse(localStorage.getItem("user"));

    return (

        <div className="sidebar">

            <div className="sidebar-profile-section">

                <div className="sidebar-profile-header">

                    <div className="sidebar-avatar">

                        {

                            user?.name?.charAt(0)

                        }

                    </div>

                    <div>

                        <h4>

                            {

                                user?.name

                            }

                        </h4>

                        <p>

                            {

                                user?.email

                            }

                        </p>

                    </div>

                </div>

                <div className="sidebar-profile-actions">

                    <div className="sidebar-role">

                        {

                            user?.role?.toUpperCase()

                        }

                    </div>

                    <button

                        onClick={() =>

                            setActiveSection(
                                "profile"
                            )

                        }

                    >

                        Profile

                    </button>

                    <button
                        onClick={handleLogout}
                    >

                        Log out

                    </button>

                </div>

            </div>



            <button

                className={

                    activeSection === "dashboard"

                        ?

                        "active-sidebar-btn"

                        :

                        ""

                }

                onClick={() =>

                    setActiveSection(

                        "dashboard"

                    )

                }

            >

                <LayoutDashboard size={20} />
                <span>Dashboard</span>

            </button>

            <button

                className={

                    activeSection === "projects"

                        ?

                        "active-sidebar-btn"

                        :

                        ""

                }

                onClick={() =>

                    setActiveSection(

                        "projects"

                    )

                }

            >

                <FolderKanban size={20} />
                <span>Projects</span>

            </button>

            <button

                className={

                    activeSection === "employee"

                        ?

                        "active-sidebar-btn"

                        :

                        ""

                }

                onClick={() =>

                    setActiveSection(

                        "employee"

                    )

                }

            >

                <Users size={20} />
                <span>Developers</span>

            </button>


            <button

                className={

                    activeSection === "progress"

                        ?

                        "active-sidebar-btn"

                        :

                        ""

                }

                onClick={() =>

                    setActiveSection(

                        "tasks"

                    )

                }

            >

                <ClipboardList size={20} />
                <span>Tasks</span>

            </button>

            <button

                className={

                    activeSection === "reports"

                        ?

                        "active-sidebar-btn"

                        :

                        ""

                }

                onClick={() =>

                    setActiveSection(

                        "reports"

                    )

                }

            >

                <BarChart3 size={20} />
                <span>Reports</span>

            </button>


        </div>

    );

}

export default Sidebar;