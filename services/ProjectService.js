const {calculateProjectsTime, calculateProjectTime} = require("../utils/common");
const {Types: {ObjectId}} = require("mongoose");
const {Project} = require("../models");

const getProjectById = (id) => (Project.findById(ObjectId(id)));

const getProjectsByOwnerId = async (userId) => {
    const projects = await Project.getProjectByOwnerId(userId)
    return calculateProjectsTime(projects);
};

const createProject = async (userId, _default = false, name = "(NO PROJECT)") => {

    const hasProjectWithSameName = await Project.existsProject(userId, name)
    if (hasProjectWithSameName) {
        throw new Error("Project name already used");
    }

    const project = await Project.create({
        owner: ObjectId(userId), default: _default, name
    });

    return calculateProjectTime(project);
}

const addTaskToProject = (project, task) => {
    project.tasks.push(task)
    return project.save()
}

const getProjectByIdAndOwnerId = async (projectId, ownerId) => {
    const project = await Project.getProjectByIdAndOwnerId(projectId, ownerId).populate("tasks")
    if (!project) throw new Error("Project not found.");
    return calculateProjectTime(project);
}

const updateProject = async (projectId, ownerId, name) => {
    const project = await getProjectByIdAndOwnerId(projectId, ownerId);
    if (project.default) throw new Error("Project not found."); //Users can't update the project with name (NO PROJECT)
    project.name = name
    return project.save();
}

const getDefaultProjectByOwnerId = (ownerId) => (Project.getDefaultProjectByOwnerId(ownerId));

module.exports = {
    createProject,
    addTaskToProject,
    getProjectsByOwnerId,
    getProjectByIdAndOwnerId,
    updateProject,
    getDefaultProjectByOwnerId,
    getProjectById,
}