const express = require("express");

const router = express.Router();

const { createProject, getProjects, deleteProject, updateProject, addProjectMember, getProjectMembers, archiveProject} = require("../controllers/projectController");

const auth = require("../middleware/authMiddleware");

router.post("/", auth, createProject);

router.get("/", auth, getProjects);

router.delete("/:id", auth, deleteProject);

router.put("/:id",auth,updateProject);

router.post("/members",auth, addProjectMember);

router.get("/:id/members", auth, getProjectMembers);

router.put("/archive/:id",auth,archiveProject);


module.exports = router;