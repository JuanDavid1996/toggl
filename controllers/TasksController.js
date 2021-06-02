const {respondWithError, respondWithSuccess, getPathParam} = require("../utils");
const {
    ProjectService: {getProjectById, addTaskToProject},
    TaskService: {createTask, updateTask, getTaskById, getTasksByProjectId},
} = require("../services");

const list = async (req, res) => {
    try {
        const projectId = getPathParam(req, "projectId")
        const tasks = await getTasksByProjectId(projectId);
        respondWithSuccess(res, tasks);
    } catch (e) {
        respondWithError(res, e.toString());
    }
}

const show = async (req, res) => {
    try {
        const taskId = getPathParam(req, "taskId");
        const task = await getTaskById(taskId);
        respondWithSuccess(res, task);
    } catch (e) {
        respondWithError(res, e.toString());
    }
}

const create = async (req, res) => {
    try {
        const {name} = req.body;

        const projectId = getPathParam(req, "projectId");
        const project = await getProjectById(projectId);

        const task = await createTask(projectId, name);
        await addTaskToProject(project, task)

        respondWithSuccess(res, task);
    } catch (e) {
        respondWithError(res, e.toString());
    }
}

const update = async (req, res) => {
    try {
        const taskId = getPathParam(req, "taskId");

        const {name, projectId} = req.body;

        const project = projectId && await getProjectById(projectId)

        const task = await updateTask(project, taskId, name);
        respondWithSuccess(res, task);
    } catch (e) {
        respondWithError(res, e.toString());
    }
}

module.exports = {
    list,
    create,
    update,
    show,
}