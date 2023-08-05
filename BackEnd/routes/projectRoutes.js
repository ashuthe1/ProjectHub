const express = require("express");
const router = express.Router();

const {authenicateToken} = require("../middleware/authMiddleware");
const {createProject, getAllProjects, getProject, getFeaturedProjects, updateProject, deleteProject} = require("../controllers/projectController");

router.post("/createProject/:userName", createProject);
router.get("/getAllProjects", getAllProjects);
router.get("/:projectId", getProject);
router.get("/featured", getFeaturedProjects);
router.put("/:projectId", authenicateToken, updateProject);
router.delete("/:projectId", authenicateToken, deleteProject);

module.exports = router;