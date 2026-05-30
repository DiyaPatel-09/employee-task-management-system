import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEmployeeLeaves, cancelLeave } from "../../services/leaveService";
import { formatDate } from "../../utils/formatDate";
import DeleteModal from "../DeleteModal";

function EmployeeLeaveRequestSection() {

    const navigate = useNavigate();

    const [leaves, setLeaves] = useState([]);
    const [showCancelPopup, setShowCancelPopup] = useState(false);
    const [selectedLeaveId, setSelectedLeaveId] = useState(null);

    useEffect(() => {

        fetchLeaves();

    }, []);

    const fetchLeaves = async () => {

        try {

            const token = localStorage.getItem("token");

            const data = await getEmployeeLeaves(
                token
            );

            setLeaves(data);

        }

        catch (error) {

            console.log(error);

        }

    };


    const handleCancelLeave = async (

        id

    ) => {

        try {

            const token =

                localStorage.getItem(
                    "token"
                );

            await cancelLeave(

                id,

                token

            );

            fetchLeaves();

        }

        catch (error) {

            console.log(error);

        }

    };


    return (

        <div className="projects-container">
<div className="page-header">

    <p className="breadcrumb">

        Dashboard / Leave Requests

    </p>

    <h1>

        Leave Requests

    </h1>

    <p>

        Apply and track your leave requests

    </p>

</div>

<div className="page-actions">

    <button

        className="create-project-btn"

        onClick={() =>

            navigate(
                "/create-leave-request"
            )

        }

    >

        + Apply Leave

    </button>

</div>

<h2 className="table-heading">

    Leave History

</h2>
            <div className="projects-table-container">

                <table className="projects-table">

                    <thead>

                        <tr>

                            <th>Leave Type</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Days</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Remark</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            leaves.length > 0

                                ?

                                leaves.map((leave) => (

                                    <tr key={leave.id}>

                                        <td>

                                            {leave.leave_type}

                                        </td>

                                        <td>

                                            {formatDate(
                                                leave.from_date
                                            )}

                                        </td>

                                        <td>

                                            {formatDate(
                                                leave.to_date
                                            )}

                                        </td>

                                        <td>

                                            {leave.no_of_days}

                                        </td>
                                        <td>

                                            {

                                                leave.reason.length > 30

                                                    ?

                                                    leave.reason.substring(0, 30) + "..."

                                                    :

                                                    leave.reason

                                            }

                                        </td>

                                        <td>

                                            <span

                                                className={`status-badge ${leave.status.toLowerCase()}`}

                                            >

                                                {leave.status}

                                            </span>

                                        </td>
                                        <td>

                                            {leave.admin_remark || "-"}

                                        </td>
                                        <td>

                                            {

                                                leave.status === "Pending"

                                                    ?

                                                    <button

                                                        className="reject-btn"

                                                        onClick={() => {

                                                            setSelectedLeaveId(
                                                                leave.id
                                                            );

                                                            setShowCancelPopup(
                                                                true
                                                            );

                                                        }}
                                                    >

                                                        Cancel

                                                    </button>

                                                    :

                                                    "-"

                                            }

                                        </td>

                                    </tr>

                                ))

                                :

                                <tr>

                                    <td colSpan="8">

                                        No leave requests found

                                    </td>


                                </tr>



                        }

                    </tbody>

                </table>
                <DeleteModal

                    isOpen={showCancelPopup}

                    onClose={() => {

                        setShowCancelPopup(false);

                        setSelectedLeaveId(null);

                    }}

                    onDelete={async () => {

                        await handleCancelLeave(

                            selectedLeaveId

                        );

                        setShowCancelPopup(false);

                        setSelectedLeaveId(null);

                    }}

                    message="Are you sure you want to cancel this leave request?"
                    
                    confirmText="Yes"
                    
                    cancelText="No"
                />

            </div>


        </div>

    );

}

export default EmployeeLeaveRequestSection;