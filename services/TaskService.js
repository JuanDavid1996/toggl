const {calculateTaskTime, calculateTasksTime} = require("../utils/common");
const {Task} = require("../models");
const {Types: {ObjectId}} = require("mongoose");

const createTask = async (project, name = "") => {
    const task = await Task.create({
        project,
        name
    });
    return calculateTaskTime(task);
}

const updateTask = async (project, taskId, name) => {
    const task = await getTaskById(taskId);
    if (project && String(task.project) !== String(project._id)) {
        task.project = project._id;
    }
    task.name = name;
    await task.save()
    return calculateTaskTime(task);
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
    return calculateTaskTime(task);
};

const getTasksByProjectId = async (projectId) => {
    const tasks = await Task.find({project: ObjectId(projectId)}).populate("trackers")
    return calculateTasksTime(tasks);
}

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    addTrackerToTask,
    getTaskById,
    getTasksByProjectId,
}