const pool = require("../config/db");

const getAllLeaves = async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT
                l.*,
                u.name AS employee_name
             FROM leaves l
             JOIN users u
             ON l.employee_id = u.id
             ORDER BY l.applied_on DESC`

        );

        res.json(result.rows);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};



const updateLeaveStatus = async (req, res) => {

    try {

        const { status, admin_remark } = req.body;

        const { id } = req.params;

        const result = await pool.query(

            `UPDATE leaves

             SET

             status = $1,

             admin_remark = $2

             WHERE id = $3

             RETURNING *`,

            [

                status,

                admin_remark,

                id

            ]

        );
        if (status === "Approved") {

            await createActivityLog(

                req.user.id,

                req.user.name,

                req.user.role,

                "Leave Management",

                "Approved",

                `Approved leave request #${id}`

            );

        }

        if (status === "Rejected") {

            await createActivityLog(

                req.user.id,

                req.user.name,

                req.user.role,

                "Leave Management",

                "Rejected",

                `Rejected leave request #${id}`

            );

        }

        res.json(result.rows[0]);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};


const applyLeave = async (req, res) => {

    try {

        const {

            leave_type,

            from_date,

            to_date,

            reason

        } = req.body;
        if (

            !leave_type ||

            !from_date ||

            !to_date ||

            !reason

        ) {


            return res.status(400).json({

                message:

                    "All fields are required"

            });

        }

        const employee_id = req.user.id;

        const fromDate = new Date(from_date);

        const toDate = new Date(to_date);

        const no_of_days =

            Math.ceil(

                (toDate - fromDate)

                /

                (1000 * 60 * 60 * 24)

            ) + 1;

        const result = await pool.query(

            `INSERT INTO leaves(

                employee_id,

                leave_type,

                from_date,

                to_date,

                no_of_days,

                reason

            )

            VALUES(

                $1,$2,$3,$4,$5,$6

            )

            RETURNING *`,

            [

                employee_id,

                leave_type,

                from_date,

                to_date,

                no_of_days,

                reason

            ]

        );

        await createActivityLog(
            req.user.id,
            req.user.name,
            req.user.role,
            "Leave Management",
            "Submitted",
            `${req.user.name} applied for ${leave_type} leave`
        );

        res.status(201).json(

            result.rows[0]

        );

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

const getEmployeeLeaves = async (

    req,

    res

) => {

    try {

        const result = await pool.query(

            `SELECT *

             FROM leaves

             WHERE employee_id = $1

             ORDER BY applied_on DESC`,

            [

                req.user.id

            ]

        );

        res.json(

            result.rows

        );

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message:

                "Server Error"

        });

    }

};


const cancelLeave = async (req, res) => {

    try {

        const result = await pool.query(

            `DELETE FROM leaves

             WHERE id = $1

             AND employee_id = $2

             AND status = 'Pending'`,

            [

                req.params.id,

                req.user.id

            ]

        );
        await createActivityLog(

            req.user.id,

            req.user.name,

            req.user.role,

            "Leave Management",

            "Cancelled",
            `${req.user.name} cancelled leave request #${req.params.id}`

        );

        res.json({

            message: "Leave cancelled"

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};


module.exports = {

    getAllLeaves,
    applyLeave,
    updateLeaveStatus,
    getEmployeeLeaves,
    cancelLeave

};