const jwt = require("jsonwebtoken");
const {respondWithError} = require("../utils")

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return respondWithError(res, "Unauthorized")
    }

    try {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY)
        if (!decoded.user) {
            return respondWithError(res, 'Token no valido')
        }
        res.locals.userId = decoded.user;
        next();
    } catch (e) {
        respondWithError(res, e)
    }
}

module.exports = {
    authenticate
}