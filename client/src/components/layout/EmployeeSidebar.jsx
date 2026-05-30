import { useNavigate } from "react-router-dom";
import { LayoutDashboard, ClipboardList, BarChart3,CalendarDays } from "lucide-react";

function EmployeeSidebar({

    activeSection,
    setActiveSection = () => { }

}) {

    const navigate = useNavigate();

    const user = JSON.parse(

        localStorage.getItem(
            "user"
        )

    );

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");

    };

    return (

        <div className="employee-sidebar">

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
                        DEVELOPER
                    </div>

                    <button
                        onClick={() =>
                            setActiveSection("profile")
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

            <div className="sidebar-links">

                <button

                    className={

                        activeSection === "dashboard"

                            ?

                            "sidebar-btn active-sidebar-btn"

                            :

                            "sidebar-btn"

                    }

                    onClick={() => {

                        if (setActiveSection) {

                            setActiveSection(
                                "dashboard"
                            );

                        }

                    }}

                >

                    <LayoutDashboard size={20} />

                    <span>

                        Dashboard

                    </span>


                </button>

                <button

                    className={

                        activeSection === "tasks"

                            ?

                            "sidebar-btn active-sidebar-btn"

                            :

                            "sidebar-btn"

                    }

                    onClick={() => {

                        if (setActiveSection) {

                            setActiveSection(
                                "tasks"
                            );

                        }

                    }}

                >

                    <ClipboardList size={20} />

                    <span>

                        My Tasks

                    </span>

                </button>

                <button

                    className={

                        activeSection === "reports"

                            ?

                            "sidebar-btn active-sidebar-btn"

                            :

                            "sidebar-btn"

                    }

                    onClick={() => {

                        if (setActiveSection) {

                            setActiveSection(
                                "reports"
                            );

                        }

                    }}

                >

                    <BarChart3 size={20} />

                    <span>

                        Reports

                    </span>

                </button>

        <button

    className={

        activeSection === "leaves"

            ?

            "sidebar-btn active-sidebar-btn"

            :

            "sidebar-btn"

    }

    onClick={() => {

        if (setActiveSection) {

            setActiveSection(
                "leaves"
            );

        }

    }}

>

    <CalendarDays size={20} />

    <span>

        Leaves

    </span>

</button>



            </div>

        </div>






    );

}

export default EmployeeSidebar;