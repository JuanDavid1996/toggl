const express = require('express');
const router = express.Router({mergeParams: true});
const {TasksController: {list, create, show, update}} = require("../controllers");
const {
    common: {authenticate},
    ProjectMiddleware: {checkProjectId},
    TaskMiddleware: {checkTaskId, updateTask,}
} = require("../middlewares");

/* GET users listing. */
router.get('/', authenticate, checkProjectId, list);

router.post('/', authenticate, checkProjectId, create);

router.get('/:taskId', authenticate, checkProjectId, checkTaskId, show);

router.put('/:taskId', authenticate, checkProjectId, checkTaskId, updateTask, update);

router.use('/:taskId/trackers/', require('./trackers'))

module.exports = router;
