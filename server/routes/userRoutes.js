const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');

const {
  registerUser,
  loginUser,
  getAllUsers,
  updateEmployee
} = require('../controllers/userController');

const router = express.Router();

const pool = require('../config/db');


// ============================
// GET USERS
// ============================

router.get(
    "/",
    authMiddleware,
    getAllUsers
);

// ============================
// REGISTER USER
// ============================

router.post('/register', registerUser);


// ============================
// LOGIN USER
// ============================

router.post('/login', loginUser);

// ============================
// UPDATE USER
// ============================
router.put("/employees/:id",updateEmployee);



module.exports = router;