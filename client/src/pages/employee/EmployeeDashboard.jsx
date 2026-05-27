import { useState, useEffect } from "react";
import "./EmployeeDashboard.css";
import EmployeeSidebar from "../../components/layout/EmployeeSidebar";
import EmployeeHomeSection from "../../components/sections/EmployeeHomeSection";
import EmployeeTasksSection from "../../components/sections/EmployeeTasksSection";
import EmployeeProfileSection from "../../components/sections/EmployeeProfileSection";
import EmployeeReportsSection from "../../components/sections/EmployeeReportsSection";
import { useLocation } from "react-router-dom";

function EmployeeDashboard() {

    const location = useLocation();
    const [activeSection, setActiveSection]

        =

        useState(
            "dashboard"
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

                    activeSection === "profile"

                    &&

                    <EmployeeProfileSection />

                }

            </div>

        </div>

    );

}

export default EmployeeDashboard;