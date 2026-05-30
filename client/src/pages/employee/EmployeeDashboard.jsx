import { useState, useEffect } from "react";
import "./EmployeeDashboard.css";
import axios from "axios";
import EmployeeSidebar from "../../components/layout/EmployeeSidebar";
import EmployeeHomeSection from "../../components/sections/EmployeeHomeSection";
import EmployeeTasksSection from "../../components/sections/EmployeeTasksSection";
import EmployeeProfileSection from "../../components/sections/EmployeeProfileSection";
import EmployeeReportsSection from "../../components/sections/EmployeeReportsSection";
import { useLocation } from "react-router-dom";
import EmployeeLeaveRequestSection from "../../components/sections/EmployeeLeaveRequestSection";

function EmployeeDashboard() {

    const location = useLocation();
    const [activeSection, setActiveSection] = useState("dashboard"
    );

    useEffect(() => {

        if (

            location.state?.section

        ) {

            setActiveSection(

                location.state.section

            );

        }

    }, [location]);

    useEffect(() => {

        const checkBlockedStatus = async () => {

            try {

                const token = localStorage.getItem("token");
                if (!token) {

                    return;

                }

                await axios.get(

                    "http://localhost:5000/api/users/check-user",

                    {

                        headers: {

                            Authorization: `Bearer ${token}`

                        }

                    }

                );

            }

            catch (err) {

                if (err.response?.status === 403) {

                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    localStorage.removeItem("role");

                    window.location.href = "/blocked";

                }

            }

        };

        checkBlockedStatus();

        const interval = setInterval(

            checkBlockedStatus,

            5000

        );

        return () => clearInterval(interval);

    }, []);




    return (

        <div className="employee-container">

            <EmployeeSidebar

                activeSection={activeSection}

                setActiveSection={setActiveSection}

            />

            <div className="employee-main">

                {

                    activeSection === "dashboard"

                    &&

                    <EmployeeHomeSection />

                }

                {

                    activeSection === "tasks"

                    &&

                    <EmployeeTasksSection />

                }

                {

                    activeSection === "reports"

                    &&

                    <EmployeeReportsSection />

                }
                {
                    activeSection === "leaves"
                    &&
                    <EmployeeLeaveRequestSection />
                }

                {

                    activeSection === "profile"

                    &&

                    <EmployeeProfileSection />

                }

            </div>

        </div>

    );

}

export default EmployeeDashboard;