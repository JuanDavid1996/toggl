const mongoose = require("mongoose")
const {Types: {ObjectId}} = mongoose;

const schema = new mongoose.Schema({
    name: String,
    trackers: [{
        type: mongoose.Types.ObjectId,
        ref: 'trackers'
    }],
    project: {
        type: mongoose.Types.ObjectId,
        ref: 'projects'
    }
}, {versionKey: false})

schema.statics.getTaskByProjectIdAndId = function (projectId, taskId) {
    return this.findOne({
        _id: ObjectId(taskId),
        project: ObjectId(projectId)
    })
}

module.exports = mongoose.model("tasks", schema);