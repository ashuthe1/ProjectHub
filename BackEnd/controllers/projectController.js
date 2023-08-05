const Project = require('../models/Project');
const User = require('../models/User');
const cloudinary = require('../utils/cloudinary');

const createProject = async (req, res) => {
    try{
        var newProject = { ...req.body};
        // const thumbImg = await cloudinary.uploader.upload(newProject.thumbnailImage, {
        //     folder: "ThumbnailImages",
        // })
        // newProject.thumbnailImageUrl = thumbImg.secure_url;
        newProject.userNameOfCreator = req.params.userName;
        newProject.projectId = newProject.title.replace(/\s+/g, '-').toLowerCase() + Date.now();
        const project = new Project(newProject);
        try {
            await project.save();
            res.status(201).json(project);
        }
        catch (err) {
            res.status(409).json({ message: err.message });
        }
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