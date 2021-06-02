const {Types: {ObjectId}} = require("mongoose");
const {isEmail} = require("../utils");
const {User} = require("../models")

const getUsers = (filters = {}, project = {password: 0, projects: 0}) => {
    return User.find(filters, project);
}

const getUserById = (userId) => (User.findById(ObjectId(userId)))

const createUser = async (params) => {
    if (!params) {
        throw new Error("Invalid request");
    }

    if (!isEmail(params.email)) {
        throw new Error("Invalid email address");
    }

    if (String(params.password).trim().length < 8) {
        throw new Error("The password should be at least 8 characters");
    }

    const existUser = await User.findByEmail(params.email);
    if (existUser) {
        throw new Error("Email already taken");
    }

    return User.create(params);
}

const addProjectToUser = async (user, project) => {
    user.projects.push(project)
    return user.save();
}

const getUserByEmail = (email) => (User.findByEmail(email));


module.exports = {
    getUsers,
    getUserById,
    createUser,
    addProjectToUser,
    getUserByEmail,
}