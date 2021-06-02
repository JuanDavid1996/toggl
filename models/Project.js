const mongoose = require("mongoose");
const {Types: {ObjectId}} = mongoose;

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    default: Boolean,
    tasks: [{
        type: mongoose.Types.ObjectId,
        ref: 'tasks'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    }
}, {versionKey: false})

schema.statics.getProjectByOwnerId = function (userId) {
    return this.find({
        owner: ObjectId(userId)
    }).populate({
        path: "tasks",
        populate: {
            path: "trackers"
        }
    }).sort({_id: -1});
}

schema.statics.existsProject = function (userId, name) {
    return this.findOne({
        owner: ObjectId(userId),
        name
    });
}

schema.statics.getProjectByIdAndOwnerId = function (projectId, ownerId) {
    return this.findOne({
        owner: ObjectId(ownerId),
        _id: ObjectId(projectId)
    });
}

schema.statics.getDefaultProjectByOwnerId = function (ownerId) {
    return this.findOne({
        owner: ObjectId(ownerId),
        default: true
    });
}

schema.index({name: 1, owner: 1}, {unique: true})

module.exports = mongoose.model("projects", schema);