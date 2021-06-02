const {respondWithSuccess, respondWithError} = require("../utils");
const {SessionService: {authenticate}, ProjectService: {getDefaultProjectByOwnerId}} = require("../services/");

const signIn = async (req, res) => {
    try {
        const userAuthenticated = await authenticate(req.body);
        const defaultProject = await getDefaultProjectByOwnerId(userAuthenticated.user._id);
        respondWithSuccess(res, {
            ...userAuthenticated,
            defaultProject
        });
    } catch (e) {
        respondWithError(res, e.toString());
    }
}

module.exports = {
    signIn
}