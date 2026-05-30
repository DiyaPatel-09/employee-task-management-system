const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const pool = require('../config/db');


// =========================
// REGISTER USER
// =========================

const registerUser = async (req, res) => {

  try {

    const { name, email, password, role } = req.body;

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(
      password,
      saltRounds
    );

    const result = await pool.query(

      `INSERT INTO users
      (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,

      [name, email, hashedPassword, role]

    );

    res.status(201).json({

      message: 'User created successfully',

      user: result.rows[0],

    });

  } catch (error) {

    console.log(error.message);

    res.status(500).json({

      message: 'Server Error',

    });

  }

};


// =========================
// LOGIN USER
// =========================

const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND is_deleted=FALSE',
      [email]
    );

    if (result.rows.length === 0) {

      return res.status(404).json({
        message: 'User not found',
      });

    }
    

    const user = result.rows[0];
    if(user.is_blocked){

    return res.status(403).json({

        message: "Your account has been blocked"

    });

}

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(401).json({
        message: 'Invalid password',
      });

    }

    const token = jwt.sign(

      {
        id: user.id,
        role: user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: '1d',
      }

    );

    res.status(200).json({

      message: 'Login successful',

      token,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },

    });

  } catch (error) {

    console.log(error.message);

    res.status(500).json({

      message: 'Server Error',

    });

  }

};

// =========================
// GET ALL USER
// =========================

const getAllUsers = async (req, res) => {

  try {

    const result = await pool.query(

      `SELECT id,name,email,is_blocked
             FROM users
             WHERE role='employee'`

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


const updateEmployee = async (req, res) => {

  try {

    const { id } = req.params;

    const { name, email, role } = req.body;

    await pool.query(

      `UPDATE users
      SET name=$1,
      email=$2,
      role=$3
      WHERE id=$4`,

      [name, email, role, id]

    );

    res.status(200).json({

      message: "Updated"

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Error"

    });

  }

};


const blockEmployee = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(

            `
            UPDATE users
            SET is_blocked = NOT is_blocked
            WHERE id=$1
            `,
            [id]

        );

        res.json({

            success: true

        });

    }

    catch (err) {

        res.status(500).json({

            error: err.message

        });

    }

};


const checkUser = async (req, res) => {

    try {

        const result = await pool.query(

            `
            SELECT * FROM users
            WHERE id=$1
            `,
            [req.user.id]

        );

        const user = result.rows[0];

        if(user.is_blocked){

            return res.status(403).json({

                message: "Blocked"

            });

        }

        res.json({

            success: true

        });

    }

    catch(err){

        res.status(500).json({

            error: err.message

        });

    }

};


const deleteEmployee = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(

            `
            UPDATE users
            SET is_deleted = TRUE
            WHERE id=$1
            `,
            [id]

        );

        res.json({

            success: true

        });

    }

    catch(err){

        res.status(500).json({

            error: err.message

        });

    }

};


module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  updateEmployee,
  blockEmployee,
  checkUser,
  deleteEmployee
};