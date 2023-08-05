const Project = require('../models/Project');
const User = require('../models/User');

const cloudinary = require('../config/cloudinaryConfig');
const upload = require('../middleware/imageUploadMiddleware')

const createProject = async (req, res) => {
    try{
        console.log(req.body, req.params.userName);
        res.status(201).json({ message: "Project created successfully" });
        // var newProject = { ...req.body};
        // const image = req.file;
        // const result = await cloudinary.uploader.upload(image.path);
        // newProject.thumbnailImageUrl = result.secure_url;
        // console.log(newProject.thumbnailImageUrl);
        // newProject.userNameOfCreator = req.params.userName;
        // newProject.projectId = newProject.title.replace(/\s+/g, '-').toLowerCase() + Date.now();

        // const project = new Project(newProject);
        // await project.save();
        // res.status(201).json(project);
    }
    catch(err){
        res.status(409).json({ message: err.message });
    }
};

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
};

const getProject = async (req, res) => {
    try {
        const project = await Project.findOne({projectId: req.params.projectId});
        res.status(200).json(project);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
};

const getFeaturedProjects = async (req, res) => {
    try {
        const projects = await Project.find({isFeatured: true});
        res.status(200).json(projects);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
};

const updateProject = async (req, res) => {
    try {
        const newProjectData = { ...req.body};
        Project.updateOne({projectId: req.params.projectId}, newProjectData).then((result) =>{
            res.status(200).json(result);
        }).catch((err) =>{
            res.status(404).json({ message: err.message });
        });
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
};

const deleteProject = async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({projectId: req.params.projectId});
        res.status(200).json(project);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
};

module.exports = {
    createProject,
    getAllProjects,
    getProject,
    getFeaturedProjects,
    updateProject,
    deleteProject,
}