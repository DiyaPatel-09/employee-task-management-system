const pool = require("../config/db");

const createProject = async (req, res) => {

    try {

        const { name, description, status, start_date, end_date } = req.body;

        const created_by = req.user.id;

        const result = await pool.query(

            `INSERT INTO projects
                (name,description,status,start_date,end_date,created_by)
                VALUES($1,$2,$3,$4,$5,$6)
                RETURNING *`,

            [name, description, status, start_date, end_date, created_by]

        );

        res.status(201).json(result.rows[0]);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({ message: "Server Error" });

    }

};


const getProjects = async (req, res) => {

    try {

        const result=await pool.query(

            `SELECT
                projects.*,
                COUNT(tasks.id) AS task_count

            FROM projects
            LEFT JOIN tasks ON projects.id=tasks.project_id
            WHERE projects.archived=FALSE
            GROUP BY projects.id
            ORDER BY projects.created_at DESC`

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


const deleteProject = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(

            "DELETE FROM projects WHERE id=$1",

            [id]

        );

        res.json({

            message: "Deleted"

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};


const updateProject = async (req, res) => {

    try {

        const { id } = req.params;

        const { name, description, status, start_date, end_date } = req.body;

        const result = await pool.query(

            `UPDATE projects
            SET
            name=$1,
            description=$2,
            status=$3,
            start_date=$4,
            end_date=$5
            WHERE id=$6
            RETURNING *`,

            [name, description, status, start_date, end_date, id]

        );

        res.json(result.rows[0]);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({ message: "Server Error" });

    }

};

const addProjectMember = async (req, res) => {

    try {

        const { project_id, employee_id } = req.body;

        const result = await pool.query(

            `INSERT INTO project_members(
                project_id,
                employee_id
                )

                VALUES($1,$2)

                RETURNING *`,

            [project_id, employee_id]

        );

        res.status(201).json(result.rows[0]);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

};


const getProjectMembers = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(

            `SELECT
                users.id,
                users.name

            FROM project_members

            JOIN users ON project_members.employee_id=users.id

            WHERE project_members.project_id=$1`,

            [id]

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

const archiveProject =

  async (req, res) => {

    await pool.query(

      `

UPDATE projects

SET archived=TRUE

WHERE id=$1

`,

      [req.params.id]

    );

    res.json({

      message:

        "Archived"

    });

  };
module.exports = { createProject, getProjects, deleteProject, updateProject, addProjectMember, getProjectMembers, archiveProject};