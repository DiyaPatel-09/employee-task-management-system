const pool = require("../config/db");

const createActivityLog = async (

    userId,
    userName,
    userRole,
    module,
    actionType,
    description

) => {

    await pool.query(

        `
        INSERT INTO activity_logs
        (
            user_id,
            user_name,
            user_role,
            module,
            action_type,
            description
        )
        VALUES
        (
            $1,$2,$3,$4,$5,$6
        )
        `,

        [
            userId,
            userName,
            userRole,
            module,
            actionType,
            description
        ]

    );

};


const getActivityLogs = async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT *

             FROM activity_logs

             ORDER BY created_at DESC`

        );

        res.json(

            result.rows

        );

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};




module.exports = {

    createActivityLog,
    getActivityLogs

};