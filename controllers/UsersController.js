const {respondWithError, respondWithSuccess} = require("../utils");
const {UserService: {getUsers, createUser, addProjectToUser}, ProjectService: {createProject}} = require("../services");

const list = async (req, res) => {
    try {
        const users = await getUsers();
        respondWithSuccess(res, users);
    } catch (e) {
        respondWithError(res, e);
    }
}

const create = async (req, res) => {
    try {
        const user = await createUser(req.body);
        const defaultProject = await createProject(user, true);
        await addProjectToUser(user, defaultProject);
        respondWithSuccess(res, user);
    } catch (e) {
        respondWithError(res, e.toString());
    }
}

module.exports = {
    list,
    create
}