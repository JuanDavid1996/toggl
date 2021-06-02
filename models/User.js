const mongoose = require("mongoose")
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    },
    projects: [{
        type: mongoose.Types.ObjectId,
        ref: 'projects'
    }]
}, {versionKey: false})

schema.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }
    next();
})

schema.statics.findByEmail = function (email) {
    return this.findOne({email})
}

module.exports = mongoose.model("users", schema);