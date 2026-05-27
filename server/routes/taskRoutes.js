const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const upload = require("../middleware/uploadMiddleware");

const {
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
} = require('../controllers/taskController');


// ASSIGN TASK
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("attachment"),
  assignTask
);

// GET ALL TASKS
router.get(
  '/',
  authMiddleware,
  adminMiddleware,
  getTasks
);

//UPDATE PROFILE
router.put(
"/update-profile",
authMiddleware,
updateProfile
);


// GET MY TASKS
router.get(
  '/my',
  authMiddleware,
  getMyTasks
);

//CHNAGE PASSWORD
router.put(
"/change-password",
authMiddleware,
changePassword
);

//ARCHIVE ACCOUNT
router.put(
"/archive-account",
authMiddleware,
archiveAccount
);
//UPDATE TASKS
router.put(
  '/:id',
  authMiddleware,
  updateTaskStatus
);

// DELETE TASK
router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  deleteTask
);

//GET TASKS BY STATUS
router.get(
  '/status/:status',
  authMiddleware,
  adminMiddleware,
  getTasksByStatus
)

//GET TASKS BY DATES
router.get(
  "/reports",
  authMiddleware,
  getCompletedTaskReports
);


//GET PROJECT REPORT
router.get(
  "/project-report",
  authMiddleware,
  getProjectReport
);
//GET EMPLOYEE REPORT
router.get(
"/employee-report",
authMiddleware,
getEmployeeReport
);

//UPDATE TASK
router.put(
  "/edit/:id",
  authMiddleware,
  updateTask
);

//ADD COMMENT
router.post(
  "/:id/comments",
  authMiddleware,
  addComment
);

//GET COMMENTS
router.get(
  "/:id/comments",
  authMiddleware,
  getComments
);

//ARCHIEVE TASKS
router.put(
  "/archive/:id",
  authMiddleware,
  archiveTask
);

router.get(
  "/developer-report",
  authMiddleware,
  getDeveloperReport
);

router.get(
  "/:id",
  authMiddleware,
  getTaskById
);

router.post(
"/upload",
authMiddleware,
upload.single("file"),
uploadAttachment
);



module.exports = router;