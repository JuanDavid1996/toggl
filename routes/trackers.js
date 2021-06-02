const express = require('express');
const router = express.Router({mergeParams: true});
const {TrackersController: {list, create, update}} = require("../controllers");
const {
    common: {authenticate},
    ProjectMiddleware: {checkProjectId},
    TaskMiddleware: {checkTaskId},
    TrackerMiddleware: {checkTrackerId, checkParams}
} = require("../middlewares");


router.get('/', authenticate, checkProjectId, checkTaskId, list);

router.post('/', authenticate, checkProjectId, checkTaskId, checkParams, create);

router.put('/:trackerId', authenticate, checkProjectId, checkTaskId, checkTrackerId, checkParams, update);

module.exports = router;