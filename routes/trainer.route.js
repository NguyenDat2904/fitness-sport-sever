var express = require('express');
const refreshAccessToken = require('../middleware/refreshAccessToken.middleware');
const checkAndUpdateRefreshToken = require('../middleware/checkUpdateRefreshToken.middleware');
const TrainerController = require('../controller/trainer.controller');
const authorMiddleware = require('../middleware/author.middleware');
var router = express.Router();

/* GET users listing. */
// I. USER
/* 1. GET /trainer */
router.get(
    '/admin',
    checkAndUpdateRefreshToken,
    refreshAccessToken,
    authorMiddleware,
    TrainerController.showAllTrainer,
);

/* 2. PUT /trainer/put/:_id */
router.put('/put/:_id', checkAndUpdateRefreshToken, refreshAccessToken, TrainerController.putTrainer);

/* 3. DELETE /trainer/admin/delete/:_id */
router.delete(
    '/admin/delete/:_id',
    checkAndUpdateRefreshToken,
    refreshAccessToken,
    authorMiddleware,
    TrainerController.deleteTrainer,
);

/* 4. GET /trainer/:_id */
router.get('/:_id', checkAndUpdateRefreshToken, refreshAccessToken, TrainerController.showDetailTrainer);

module.exports = router;
