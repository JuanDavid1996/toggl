const {getPathParam, isValidId, respondWithError, toMongoId, isDate} = require("../utils");
const {TaskService, TrackerService} = require("../services");

const checkTrackerId = async (req, res, next) => {

    const trackerId = getPathParam(req, "trackerId");
    if (!trackerId || !isValidId(trackerId)) {
        return respondWithError(res, "Invalid tracker Id");
    }

    const taskId = getPathParam(req, "taskId");
    const task = await TaskService.getTaskById(taskId);

    if (task.trackers.indexOf(toMongoId(trackerId)) === -1) {
        return respondWithError(res, "Tracker not found");
    }

    next();
}

const checkParams = async (req, res, next) => {
    const {startAt, finishedAt} = req.body;
    const isPost = req.method === "POST";

    if (startAt && !isDate(startAt)) {
        return respondWithError(res, "Invalid startAt param");
    }

    if (finishedAt && !isDate(finishedAt)) {
        return respondWithError(res, "Invalid finishedAt param");
    }

    if (startAt && finishedAt && isDate(startAt) && isDate(finishedAt) && (new Date(finishedAt).getTime() < new Date(startAt).getTime())) {
        return respondWithError(res, "finishedAt param should be greater than startAt ");
    }

    if (!isPost) {
        const trackerId = getPathParam(req, "trackerId");
        const tracker = await TrackerService.getTrackerById(trackerId);

        if (startAt && tracker.finishedAt && tracker.finishedAt.getTime() < new Date(startAt).getTime()) {
            return respondWithError(res, "startAt param should be less than finishedAt");
        }

        if (finishedAt && tracker.startAt.getTime() > new Date(finishedAt).getTime()) {
            return respondWithError(res, "finishedAt param should be greater than startAt");
        }
    }

    next();
}

module.exports = {
    checkTrackerId,
    checkParams,
}