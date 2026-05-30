import { useEffect, useState } from "react";
import { getAllLeaves, updateLeaveStatus } from "../../services/leaveService";
import { formatDate } from "../../utils/formatDate";

function LeaveManagementSection() {

    const [leaves, setLeaves] = useState([]);
    const [remark, setRemark] = useState("");
    const [showRemarkPopup, setShowRemarkPopup] = useState(false);
    const [selectedLeaveId, setSelectedLeaveId] = useState(null);
    const [search, setSearch] = useState("");
    const [leaveType, setLeaveType] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {

        fetchLeaves();

    }, []);

    const fetchLeaves = async () => {

        try {

            const token = localStorage.getItem("token");
            const data = await getAllLeaves(token);
            setLeaves(data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleStatusUpdate = async (

        id,

        status

    ) => {

        try {

            const token = localStorage.getItem("token");

            let adminRemark = "";

            if (status === "Rejected") {

                adminRemark = prompt(

                    "Enter rejection remark"

                );

                if (adminRemark === null) {

                    return;

                }

            }

            await updateLeaveStatus(

                id,

                {

                    status,

                    admin_remark: adminRemark

                },

                token

            );

            fetchLeaves();

        }

        catch (error) {

            console.log(error);

        }

    };

    const filteredLeaves = leaves.filter((leave) => {

        const matchesSearch =

            leave.employee_name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                );

        const matchesType =

            leaveType === ""

            ||

            leave.leave_type === leaveType;

        const matchesStatus =

            statusFilter === ""

            ||

            leave.status === statusFilter;

        return (

            matchesSearch

            &&

            matchesType

            &&

            matchesStatus

        );

    });


    return (

        <div className="projects-container">

            <div className="page-header">

                <p className="breadcrumb">

                    Dashboard / Leave Management

                </p>

                <h1>

                    Leave Management

                </h1>

                <p>

                    Manage employee leave requests and approvals

                </p>

            </div>
          

            <div className="filters-card">
                <p className="filters-heading">

                    FILTERS

                </p>

                <div className="filters-grid">

                    <div >

                        <label>Employee</label>

                        <input
                            type="text"
                            placeholder="Search employee"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>

                    <div className="filter-group">

                        <label>Leave Type</label>

                        <select

                            value={leaveType}

                            onChange={(e) =>

                                setLeaveType(
                                    e.target.value
                                )

                            }

                        >

                            <option value="">

                                All Types

                            </option>

                            {

                                [...new Set(

                                    leaves.map(
                                        leave =>
                                            leave.leave_type
                                    )

                                )].map(type => (

                                    <option
                                        key={type}
                                        value={type}
                                    >

                                        {type}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                    <div className="filter-group">

                        <label>Status</label>

                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(e.target.value)
                            }
                        >

                            <option value="">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>

                        </select>

                    </div>

                </div>

            </div>

            <div className="projects-table-container">

                <table className="projects-table">

                    <thead>
                        <tr>
                            <th>Employee</th>
                            <th>Leave Type</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Days</th>
                            <th>Applied On</th>
                            <th>Status</th>
                            <th>Remark</th>
                            <th>Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        {

                            leaves.length > 0

                                ?

                                filteredLeaves.map((leave) => (

                                    <tr key={leave.id}>

                                        <td>

                                            {leave.employee_name}

                                        </td>

                                        <td>

                                            {leave.leave_type}

                                        </td>

                                        <td>

                                            {formatDate(leave.from_date)}
                                                

                                        </td>

                                        <td>

                                            {formatDate(leave.to_date)}

                                        </td>

                                        <td>

                                            {leave.no_of_days}

                                        </td>
                                        <td>

                                            {formatDate(leave.applied_on)}

                                        </td>

                                        <td>

                                            <span className={`status-badge ${leave.status.toLowerCase()}`}>

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

                                                    <div className="action-buttons">

                                                        <button
                                                            className="approve-btn"
                                                            onClick={() =>
                                                                handleStatusUpdate(
                                                                    leave.id,
                                                                    "Approved"
                                                                )
                                                            }
                                                        >
                                                            Approve
                                                        </button>

                                                        <button
                                                            className="reject-btn"
                                                            onClick={() => {

                                                                setSelectedLeaveId(
                                                                    leave.id
                                                                );

                                                                setShowRemarkPopup(
                                                                    true
                                                                );

                                                            }}
                                                        >
                                                            Reject
                                                        </button>

                                                    </div>

                                                    :

                                                    "-"

                                            }

                                        </td>
                                    </tr>

                                ))

                                :

                                (

                                    <tr>

                                        <td colSpan="8">

                                            No leave requests found

                                        </td>

                                    </tr>

                                )

                        }

                    </tbody>

                </table>
                {
                    showRemarkPopup && (

                        <div className="popup-overlay">

                            <div className="popup-box">

                                <h3>Remark For Rejection</h3>

                                <p>
                                    Please provide a reason for rejection
                                </p>

                                <textarea

                                    value={remark}

                                    onChange={(e) =>

                                        setRemark(
                                            e.target.value
                                        )

                                    }

                                    placeholder="Enter rejection remark"

                                    rows="4"

                                />

                                <div className="popup-buttons">

                                    <button

                                        className="cancel-btn"

                                        onClick={() => {

                                            setShowRemarkPopup(false);

                                            setRemark("");

                                            setSelectedLeaveId(null);

                                        }}

                                    >

                                        Cancel

                                    </button>

                                    <button

                                        className="confirm-btn"

                                        onClick={async () => {

                                            const token = localStorage.getItem("token");

                                            await updateLeaveStatus(

                                                selectedLeaveId,

                                                {

                                                    status: "Rejected",

                                                    admin_remark: remark

                                                },

                                                token

                                            );

                                            setShowRemarkPopup(false);

                                            setRemark("");

                                            setSelectedLeaveId(null);

                                            fetchLeaves();

                                        }}

                                    >

                                        Submit

                                    </button>

                                </div>

                            </div>

                        </div>

                    )
                }

            </div>

        </div>

    );

}

export default LeaveManagementSection;