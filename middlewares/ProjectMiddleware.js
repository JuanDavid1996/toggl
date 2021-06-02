const {getUserById} = require("../services/UserService");
const {getPathParam, respondWithError, isValidId, getUserId, toMongoId, sameId} = require("../utils");

const checkProjectId = async (req, res, next) => {
    const projectId = getPathParam(req, "projectId")
    if (!projectId || !isValidId(projectId)) {
        return respondWithError(res, "Invalid projectId");
    }

    const userId = getUserId(res);
    const user = await getUserById(userId);

    if (user.projects.indexOf(toMongoId(projectId)) === -1) {
        return respondWithError(res, "Project not found");
    }

    next();
}

module.exports = {
    checkProjectId
}