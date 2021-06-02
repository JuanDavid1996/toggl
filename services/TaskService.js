const {Task} = require("../models");
const {Types: {ObjectId}} = require("mongoose");

const createTask = async (project, name = "") => {
    return Task.create({
        project,
        name
    })
}

const updateTask = async (project, taskId, name) => {
    const task = await getTaskById(taskId);
    if (project && String(task.project) !== String(project._id)) {
        task.project = project._id;
    }
    task.name = name;
    return task.save()
}

const deleteTask = async (taskId) => {
    const task = await getTaskById(taskId);
    return task.remove();
}

const addTrackerToTask = (task, tracker) => {
    task.trackers.push(tracker);
    return task.save();
}

const getTaskById = async (taskId) => {
    const task = await Task.findById(ObjectId(taskId))
    if (!task) throw new Error("Task not found");
    return task;
};

const getTasksByProjectId = (projectId) => (Task.find({project: ObjectId(projectId)}))

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    addTrackerToTask,
    getTaskById,
    getTasksByProjectId,
}