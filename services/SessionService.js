const jwt = require("jsonwebtoken");
const UserService = require("./UserService");
const bcrypt = require("bcrypt");
const {isEmail} = require("../utils");

const authenticate = async (params) => {
    if (!params) throw new Error("Invalid request");

    if (!isEmail(params.email)) throw new Error("Please send a valid email address");

    if (!params.password) throw new Error("Please send a password");

    let user = await UserService.getUserByEmail(params.email)


    if (user) {
        const match = await bcrypt.compare(params.password, user.password)
        if (match) {
            user = user.toObject();
            delete user.password;

            return {
                user,
                token: jwt.sign({user: user._id}, process.env.PRIVATE_KEY)
            };
        }
    }

    return Promise.reject("Wrong email or password")
}

module.exports = {
    authenticate
}