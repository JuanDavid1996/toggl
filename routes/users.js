const express = require('express');
const router = express.Router();
const {UsersController} = require("../controllers")

/* GET users listing. */
router.get('/', UsersController.list);

router.post('/', UsersController.create);

module.exports = router;
