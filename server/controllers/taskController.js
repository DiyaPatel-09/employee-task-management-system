const pool = require('../config/db');
const bcrypt = require("bcryptjs");

// =========================
// ASSIGN TASK
// =========================

const assignTask = async (req, res) => {

  try {


    const {
      title,
      description,
      employee_id,
      priority,
      status,
      estimated_hours,
      due_date,
      project_id,
      attachment
    } = req.body;

    const result = await pool.query(

      `INSERT INTO tasks
      (
        title,
        description,
        employee_id,
        priority,
        status,
        estimated_hours,
        due_date,
        project_id,
        attachment
      )

      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)

      RETURNING *`,

      [
        title,
        description,
        employee_id,
        priority,
        status,
        estimated_hours,
        due_date,
        project_id,
        attachment
      ]

    );

    res.status(201).json({

      message: 'Task assigned successfully',

      task: result.rows[0],

    });

  } catch (error) {

    console.log(error.message);

    res.status(500).json({

      message: 'Server Error',

    });

  }

};

// =========================
// GET TASKS
// =========================

const getTasks = async (req, res) => {

  try {

    const result = await pool.query(
      `SELECT
            tasks.*,
            users.name AS employee_name,
            projects.name AS project_name

      FROM tasks
      LEFT JOIN users ON tasks.employee_id = users.id
      LEFT JOIN projects
      ON tasks.project_id = projects.id
      WHERE tasks.is_archived = FALSE`
    );

    res.status(200).json(
      result.rows
    );

  } catch (error) {

    console.log(error.message);

    res.status(500).json({

      message: 'Server Error',

    });

  }

};

// =========================
// GET MY TASKS
// =========================

const getMyTasks = async (req, res) => {

  try {

    const employeeId = req.user.id;

    const result = await pool.query(

      `SELECT
        tasks.*,
        projects.name AS project_name

        FROM tasks
        LEFT JOIN projects ON tasks.project_id=projects.id
        WHERE tasks.employee_id=$1`,

      [employeeId]

    );

    res.status(200).json(
      result.rows
    );

  } catch (error) {

    console.log(error.message);

    res.status(500).json({

      message: 'Server Error',

    });

  }

};

// =========================
// UPDATE TASK STATUS
// =========================

const updateTaskStatus = async (req, res) => {

  try {

    const taskId = req.params.id;

    const { status } = req.body;

    const updatedBy = req.user.id;

    const result = await pool.query(

      `UPDATE tasks
       SET status = $1
       WHERE id = $2
       RETURNING *`,

      [status, taskId]

    );

    await pool.query(

      `INSERT INTO task_updates
          (
            task_id,
            updated_by,
            status
          ) 

          VALUES ($1, $2, $3)`,

      [taskId, updatedBy, status]

    );


    res.status(200).json({

      message: 'Task updated successfully',

      task: result.rows[0],

    });

  } catch (error) {

    console.log(error.message);

    res.status(500).json({

      message: 'Server Error',

    });

  }

};


// =========================
// DELETE TASK 
// =========================
const deleteTask = async (req, res) => {

  try {

    const taskId = req.params.id;

    const result = await pool.query(

      `DELETE FROM tasks
       WHERE id = $1
       RETURNING *`,

      [taskId]

    );

    res.status(200).json({

      message: 'Task deleted successfully',

      task: result.rows[0],

    });

  } catch (error) {

    console.log(error.message);

    res.status(500).json({

      message: 'Server Error',

    });

  }

};

// =========================
// GET TASKS BY STATUS
// =========================

const getTasksByStatus = async (req, res) => {

  try {

    const status = req.params.status;

    const result = await pool.query(

      `SELECT * FROM tasks
       WHERE status = $1`,

      [status]

    );

    res.status(200).json(
      result.rows
    );

  } catch (error) {

    console.log(error.message);

    res.status(500).json({

      message: 'Server Error',

    });

  }

};

// =========================
// GET TASKS BY DATES
// =========================

const getCompletedTaskReports = async (req, res) => {

  try {

    const { startDate, endDate } = req.query;

    const result = await pool.query(

      `SELECT
          tasks.*,
          users.name AS employee_name

      FROM tasks

      JOIN users
      ON tasks.employee_id = users.id

      WHERE tasks.status='Completed'

      AND tasks.due_date BETWEEN $1 AND $2`,

      [startDate, endDate]

    );

    res.status(200).json(
      result.rows
    );

  } catch (error) {

    console.log(error.message);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

// =========================
// GET PROJECT REPORT
// =========================
const getProjectReport = async (req, res) => {

  try {

    const result = await pool.query(

      `SELECT
        projects.id,
        projects.name,
        projects.status,
        COUNT(tasks.id) AS total_tasks,

        COUNT(
        CASE
        WHEN tasks.status='Completed'
        THEN 1
        END
        )
        AS completed,

        COUNT(
        CASE
        WHEN tasks.status!='Completed'
        THEN 1
        END
        )
        AS pending,

        COALESCE(SUM(tasks.estimated_hours),0)
        AS estimated_hours,

        COALESCE(SUM(tasks.actual_hours),0)
        AS actual_hours

        FROM projects
        LEFT JOIN tasks ON projects.id=tasks.project_id
        WHERE projects.archived=FALSE
        GROUP BY projects.id`

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


// =========================
// UPDATE TASK
// =========================
const updateTask = async (req, res) => {

  try {

    const {

      title,

      description,

      employee_id,

      project_id,

      priority,

      status,

      estimated_hours,

      actual_hours,

      due_date,

      attachment

    }

      =

      req.body;

    const result = await pool.query(

      `UPDATE tasks

SET

title=$1,

description=$2,

employee_id=$3,

project_id=$4,

priority=$5,

status=$6,

estimated_hours=$7,

actual_hours=$8,

due_date=$9,

attachment=$10

WHERE id=$11

RETURNING *`,

      [

        title,

        description,

        employee_id,

        project_id,

        priority,

        status,

        estimated_hours,

        actual_hours,

        due_date,

        attachment,

        req.params.id

      ]

    );

    res.json(

      result.rows[0]

    );

  }

  catch (error) {

    console.log(error);

    res.status(500)

      .json({

        message:

          "Server error"

      });

  }

};

// =========================
// ADD COMMENT
// =========================
const addComment = async (req, res) => {

  try {

    const {
      task_id,
      comment,
      attachment
    } = req.body;

    await pool.query(

      `INSERT INTO comments(
      task_id,
      user_id,
      comment,
      attachment
      )

      VALUES($1,$2,$3,$4)`,

      [
        req.params.id,
        req.user.id,
        comment,
        attachment
      ]

    );

    res.json({
      message:
        "Comment added"
    });

  } catch (error) {

    console.log(error);

  }

};

// =========================
// GET COMMENT
// =========================
const getComments = async (req, res) => {

  try {

    const data =
      await pool.query(

        `SELECT
        comments.*,
        users.name as user_name

        FROM comments
        JOIN users ON comments.user_id= users.id
        WHERE task_id=$1
        ORDER BY created_at`,

        [
          req.params.id
        ]

      );

    res.json(
      data.rows
    );

  } catch (error) {

    console.log(error);

  }

};

// =========================
// ARCHIEVE TASKS
// =========================
const archiveTask = async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(
      `UPDATE tasks
      SET is_archived=TRUE
      WHERE id=$1`,

      [id]

    );

    res.json({ message: "Archived" });

  }

  catch (error) {

    console.log(error);

  }

};


// =========================
// GET DEVELOPER REPORT
// =========================
const getDeveloperReport =

  async (req, res) => {

    try {

      const result =

        await pool.query(

          `SELECT
          users.id,
          users.name,
          COUNT(tasks.id) AS assigned_tasks,

          COUNT(
          CASE
          WHEN tasks.status='Completed'
          THEN 1
          END
          )
          AS completed,

          COUNT(
          CASE
          WHEN tasks.status!='Completed'
          THEN 1
          END
          )
          AS pending,

          COUNT(
          DISTINCT
          tasks.project_id
          )
          AS projects_count,

          COALESCE(SUM(tasks.actual_hours),0)
          AS actual_hours

          FROM users
          LEFT JOIN tasks ON users.id=tasks.employee_id 
          WHERE users.role='employee'
          GROUP BY users.id`

        );

      res.json(
        result.rows
      );

    }

    catch (error) {

      console.log(error);

    }

  };

const getTaskById =

  async (req, res) => {

    try {

      const result =

        await pool.query(

          `SELECT
            tasks.*,
            users.name AS employee_name,
            projects.name AS project_name

            FROM tasks
            LEFT JOIN users ON tasks.employee_id=users.id
            LEFT JOIN projects ON tasks.project_id=projects.id
            WHERE tasks.id=$1`,

          [req.params.id]

        );

      res.json(

        result.rows[0]

      );

    }

    catch (error) {

      console.log(
        error
      );

    }

  };


const getEmployeeReport =

  async (req, res) => {

    try {

      const {

        from,

        to

      } = req.query;

      const result =

        await pool.query(

          `SELECT
          tasks.*,
          projects.name AS project_name

          FROM tasks
          LEFT JOIN projects
          ON tasks.project_id=
          projects.id
          WHERE  tasks.employee_id=$1
          AND tasks.status='Completed'
          AND DATE(tasks.created_at)
          BETWEEN $2 AND $3

          ORDER BY created_at DESC`,

          [

            req.user.id,

            from,

            to

          ]

        );

      res.json(

        result.rows

      );

    }

    catch (err) {

      console.log(err);

    }

  };


const uploadAttachment =

  async (

    req,

    res

  ) => {

    try {

      res.json({

        filename:

          req.file.filename

      });

    }

    catch (err) {

      console.log(err);

    }

  };




const changePassword =

  async (req, res) => {

    try {

      const {

        currentPassword,

        newPassword

      } = req.body;

      const user =

        await pool.query(

          `SELECT *
FROM users
WHERE id=$1`,

          [req.user.id]

        );

      const valid =

        await bcrypt.compare(

          currentPassword,

          user.rows[0]
            .password

        );

      if (!valid) {

        return res
          .status(400)
          .json({

            message:
              "Wrong password"

          });

      }

      const hashed =

        await bcrypt.hash(

          newPassword,

          10

        );

      await pool.query(

        `UPDATE users
SET password=$1
WHERE id=$2`,

        [

          hashed,

          req.user.id

        ]

      );

      res.json({

        message:
          "Password updated"

      });

    }

    catch (err) {

      console.log(err);

    }

  };



const archiveAccount =

  async (req, res) => {

    try {

      await pool.query(

        `UPDATE users

        SET is_deleted=TRUE

        WHERE id=$1`,

        [req.user.id]

      );

      res.json({

        message:
          "Account archived"

      });

    }

    catch (err) {

      console.log(err);

    }

  };



const updateProfile =

  async (req, res) => {

    try {

      const {

        name,

        email

      } = req.body;

      await pool.query(

        `UPDATE users

SET

name=$1,

email=$2

WHERE id=$3`,

        [

          name,

          email,

          req.user.id

        ]

      );

      res.json({

        message:
          "Profile updated"

      });

    }

    catch (err) {

      console.log(err);

    }

  };

module.exports = {
  assignTask,
  getTasks,
  getMyTasks,
  updateTaskStatus,
  deleteTask,
  getTasksByStatus,
  getCompletedTaskReports,
  getProjectReport,
  updateTask,
  addComment,
  getComments,
  archiveTask,
  getDeveloperReport,
  getTaskById,
  getEmployeeReport,
  uploadAttachment,
  changePassword,
  archiveAccount,
  updateProfile

};