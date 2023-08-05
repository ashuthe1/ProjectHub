const express = require("express");
const router = express.Router();

const {authenicateToken} = require("../middleware/authMiddleware"); // Will add this later
const {createProject, getAllProjects, getProject, getFeaturedProjects, updateProject, deleteProject} = require("../controllers/projectController");

router.post("/createProject/:userName", createProject);
router.get("/getAllProjects", getAllProjects);
router.get("/getFeatured", getFeaturedProjects);
router.get("/findById/:projectId", getProject);
router.put("/updateById/:projectId", updateProject);
router.delete("/:projectId", deleteProject);

module.exports = router;