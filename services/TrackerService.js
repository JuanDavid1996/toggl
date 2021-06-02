const {Types: {ObjectId}} = require("mongoose");
const {Tracker} = require("../models");
const moment = require("moment")

const getTrackersByTaskId = (taskId) => {
    return Tracker.find({
        task: ObjectId(taskId),
    })
}

const calculateTime = (startAt, finishedAt) => {
    if (startAt && finishedAt) {
        return moment(finishedAt).diff(moment(startAt), "seconds");
    }
    return 0;
}

const createTracker = (task, startAt = new Date(), finishedAt) => {
    return Tracker.create({
        task: task._id,
        startAt,
        finishedAt,
        time: calculateTime(startAt, finishedAt)
    })
}

const updateTracker = async (trackerId, startAt, finishedAt, restartTime) => {
    const tracker = await getTrackerById(trackerId);

    if (restartTime) {
        const now = new Date();
        tracker.startAt = now;
        tracker.finishedAt = now;
    }

    if (startAt) {
        tracker.startAt = new Date(startAt);
    }

    if (finishedAt) {
        tracker.finishedAt = new Date(finishedAt);
    }

    tracker.time = calculateTime(tracker.startAt, tracker.finishedAt)
    return tracker.save()
}

const deleteTracker = async (trackerId) => {
    const task = await getTrackerById(trackerId);
    return task.remove();
}

const getTrackerById = async (trackerId) => {
    const tracker = await Tracker.findById(ObjectId(trackerId))
    if (!tracker) throw new Error("Tracker not found");
    return tracker;
}


module.exports = {
    getTrackersByTaskId,
    createTracker,
    updateTracker,
    deleteTracker,
    getTrackerById,
}