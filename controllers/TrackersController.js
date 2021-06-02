const {respondWithError, respondWithSuccess, getPathParam} = require("../utils");
const {
    TaskService: {addTrackerToTask, getTaskById},
    TrackerService: {getTrackersByTaskId, createTracker, updateTracker},
} = require("../services");

const list = async (req, res) => {
    try {
        const taskId = getPathParam(req, "taskId");
        const trackers = await getTrackersByTaskId(taskId);
        respondWithSuccess(res, trackers);
    } catch (e) {
        respondWithError(res, e.toString());
    }
}

const create = async (req, res) => {
    try {
        const taskId = getPathParam(req, "taskId");
        const task = await getTaskById(taskId);

        const {startAt, finishedAt} = req.body;

        const tracker = await createTracker(task, startAt, finishedAt);
        await addTrackerToTask(task, tracker)

        respondWithSuccess(res, tracker);
    } catch (e) {
        respondWithError(res, e.toString());
    }
}

const update = async (req, res) => {
    try {
        const trackerId = getPathParam(req, "trackerId");
        const {startAt, finishedAt, resetTime} = req.body;
        const tracker = await updateTracker(trackerId, startAt, finishedAt, resetTime);
        respondWithSuccess(res, tracker);
    } catch (e) {
        respondWithError(res, e.toString());
    }
}

module.exports = {
    list,
    create,
    update,
}