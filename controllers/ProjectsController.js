const {respondWithError, respondWithSuccess, getUserId, getPathParam} = require("../utils");
const {
    ProjectService: {createProject, getProjectByOwnerId, getProjectByIdAndOwnerId, updateProject},
    UserService: {getUserById, addProjectToUser}
} = require("../services");

const list = async (req, res) => {
    try {
        const userId = getUserId(res);
        const projects = await getProjectByOwnerId(userId);
        respondWithSuccess(res, projects);
    } catch (e) {
        respondWithError(res, e);
    }
}

const create = async (req, res) => {
    try {
        const userId = getUserId(res);
        const user = await getUserById(userId);
        const name = req.body.name;
        const project = await createProject(userId, false, name);
        await addProjectToUser(user, project);

        respondWithSuccess(res, project);
    } catch (e) {
        respondWithError(res, e.toString());
    }
}

const show = async (req, res) => {
    try {
        const userId = getUserId(res);
        const projectId = getPathParam(req, "projectId");
        const project = await getProjectByIdAndOwnerId(projectId, userId);
        respondWithSuccess(res, project);
    } catch (e) {
        respondWithError(res, e.toString());
    }
}

const update = async (req, res) => {
    try {
        const userId = getUserId(res);
        const projectId = getPathParam(req, "projectId");
        const name = req.body.name
        const project = await updateProject(projectId, userId, name);
        respondWithSuccess(res, project);
    } catch (e) {
        respondWithError(res, e.toString());
    }
}

module.exports = {
    list,
    create,
    show,
    update,
}