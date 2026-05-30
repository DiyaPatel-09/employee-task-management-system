const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");

const {
    getAllLeaves,
    updateLeaveStatus,
    applyLeave,
    getEmployeeLeaves,
    cancelLeave
} = require("../controllers/leaveController");



router.post(
    "/",
    authMiddleware,
    applyLeave
);
router.get(
    "/my-leaves",
    authMiddleware,
    getEmployeeLeaves
);

router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    getAllLeaves
);

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updateLeaveStatus
);
router.delete(
    
    "/:id",
    authMiddleware,
    cancelLeave
);




module.exports = router;