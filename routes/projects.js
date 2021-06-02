const express = require('express');
const router = express.Router();
const {ProjectsController: {list, create, show, update}} = require("../controllers");
const {common: {authenticate}, ProjectMiddleware: {checkProjectId}} = require("../middlewares");

/* GET users listing. */
router.get('/', authenticate, list);

router.post('/', authenticate, create);

router.get('/:projectId', authenticate, checkProjectId, show);

router.put('/:projectId', authenticate, checkProjectId, update);

router.use('/:projectId/tasks/', require("./tasks"));

module.exports = router;
