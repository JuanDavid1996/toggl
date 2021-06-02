const express = require('express');
const router = express.Router();
const {SessionsController} = require("../controllers")

/* GET users listing. */
router.post('/sign_in', SessionsController.signIn);

module.exports = router;
