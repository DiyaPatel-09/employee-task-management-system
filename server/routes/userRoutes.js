const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');

const {
  registerUser,
  loginUser,
  getAllUsers,
  updateEmployee,
  blockEmployee,
  checkUser,
  deleteEmployee
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

// ============================
// BLOCK USER
// ============================
router.put("/block-user/:id", blockEmployee);

// ============================
// CHECK USER
// ============================
router.get("/check-user", authMiddleware, checkUser);

// ============================
// DELETE USER
// ============================
router.put("/delete/:id",authMiddleware,deleteEmployee);

module.exports = router;