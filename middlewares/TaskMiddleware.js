const {getPathParam, isValidId, respondWithError, toMongoId} = require("../utils");
const {ProjectService} = require("../services");

const checkTaskId = async (req, res, next) => {

    const taskId = getPathParam(req, "taskId");
    if (!taskId || !isValidId(taskId)) {
        return respondWithError(res, "Invalid task Id");
    }

    const projectId = getPathParam(req, "projectId");
    const project = await ProjectService.getProjectById(projectId);

    if (project.tasks.indexOf(toMongoId(taskId)) === -1) {
        return respondWithError(res, "Task not found");
    }

    next();
}

const updateTask = async (req, res, next) => {
    const {projectId} = req.body;
    if (projectId && !isValidId(projectId)) {
        return respondWithError(res, "Invalid project Id");
    }

    next();
}

module.exports = {
    checkTaskId,
    updateTask,
}