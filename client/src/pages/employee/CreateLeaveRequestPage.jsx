import "./EmployeeDashboard.css";
import "./CreateLeaveRequestPage.css";
import EmployeeSidebar from "../../components/layout/EmployeeSidebar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { applyLeave } from "../../services/leaveService";

function CreateLeaveRequestPage() {

    const navigate = useNavigate();

    const [leaveType, setLeaveType] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [reason, setReason] = useState("");


    const handleApplyLeave = async () => {

        try {

            const token = localStorage.getItem("token");
            if (

                !leaveType ||

                !fromDate ||

                !toDate ||

                !reason.trim()

            ) {

                alert(

                    "Please fill all fields"

                );

                return;

            }
            const today = new Date();

            today.setHours(

                0,

                0,

                0,

                0

            );

            if (

                new Date(fromDate) < today

            ) {

                alert(

                    "Past dates are not allowed"

                );

                return;

            }

            if (

                new Date(toDate)

                <

                new Date(fromDate)

            ) {

                alert(

                    "To Date cannot be before From Date"

                );

                return;

            }
            await applyLeave(

                {

                    leave_type: leaveType,

                    from_date: fromDate,

                    to_date: toDate,

                    reason

                },

                token

            );

            navigate(

                "/employee-dashboard",

                {

                    state: {

                        section: "leaves"

                    }

                }

            );

        }

        catch (error) {

            console.log(error);

        }

    };


    return (

        <div className="employee-container">

            <EmployeeSidebar

                activeSection="leaves"

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

                <h1 className="create-heading">

                    Apply Leave

                </h1>

                <div className="create-card">

                    <div className="field-group">

                        <label>

                            Leave Type

                        </label>

                        <select

                            value={leaveType}

                            onChange={(e) =>

                                setLeaveType(
                                    e.target.value
                                )

                            }

                        >

                            <option value="">

                                Select Leave Type

                            </option>

                            <option value="Sick Leave">

                                Sick Leave

                            </option>

                            <option value="Casual Leave">

                                Casual Leave

                            </option>

                            <option value="Earned Leave">

                                Earned Leave

                            </option>

                        </select>

                    </div>

                    <div className="double-row">

                        <div className="field-group">

                            <label>

                                From Date

                            </label>

                            <input

                                type="date"

                                value={fromDate}

                                onChange={(e) =>

                                    setFromDate(
                                        e.target.value
                                    )

                                }

                            />

                        </div>

                        <div className="field-group">

                            <label>

                                To Date

                            </label>

                            <input

                                type="date"

                                value={toDate}

                                onChange={(e) =>

                                    setToDate(
                                        e.target.value
                                    )

                                }

                            />
                        </div>

                    </div>

                    <div className="field-group">

                        <label>

                            Reason

                        </label>

                        <textarea

                            rows="4"

                            value={reason}

                            onChange={(e) =>

                                setReason(
                                    e.target.value
                                )

                            }

                        />

                    </div>

                    <div className="btn-row">

                        <button

                            className="create-btn"

                            onClick={handleApplyLeave}

                        >

                            Apply Leave

                        </button>

                        <button

                            type="button"

                            onClick={() =>

                                navigate(

                                    "/employee-dashboard",

                                    {

                                        state: {

                                            section: "leaves"

                                        }

                                    }

                                )

                            }

                        >

                            Cancel

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default CreateLeaveRequestPage;