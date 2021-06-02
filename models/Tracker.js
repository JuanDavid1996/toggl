const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    startAt: Date,
    finishedAt: Date,
    time: {
        type: Number,
        default: 0
    },
    task: {
        type: mongoose.Types.ObjectId,
        ref: 'tasks'
    }
}, {
    versionKey: false
})

module.exports = mongoose.model("trackers", schema);