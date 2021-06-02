const {Types: {ObjectId}} = require('mongoose');
const common = require("./common");

const respondWithSuccess = (res, data) => {
    res.send({
        success: true,
        data,
    });
}

const respondWithError = (res, error) => {
    res.send({
        success: false,
        error: error.toString()
    });
}

const getUserId = (res) => (res.locals.userId);

const getQueryParam = (req, field, defaultValue = null) => (req.query[field] || defaultValue);

const getPathParam = (req, field, defaultValue = null) => (req.params[field] || defaultValue);

const isEmail = (input) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(input).toLowerCase());
}

const isValidId = (input) => (/^[0-9a-fA-F]{24}$/.test(input));

const toMongoId = (input) => (ObjectId(input));

const sameId = (firstValue, secondValue) => (String(firstValue) === String(secondValue))

const isDate = (input) => {
    try {
        const date = new Date(input)
        return !isNaN(date.getTime())
    } catch (error) {
        return false;
    }
}

module.exports = {
    respondWithError,
    respondWithSuccess,
    isEmail,
    getUserId,
    getQueryParam,
    getPathParam,
    isValidId,
    toMongoId,
    sameId,
    isDate,
    common,
}