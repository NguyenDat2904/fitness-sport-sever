var express = require('express');
const refreshToken = require('../middleware/refreshToken.middleware');
const TrainerController = require('../controller/trainer.controller');
const authorMiddleware = require('../middleware/author.middleware');
var router = express.Router();

/* GET users listing. */
// I. USER
/* 1. GET /trainer */
router.get('/admin', refreshToken, authorMiddleware, TrainerController.showAllTrainer);

/* 2. PUT /trainer/put/:_id */
router.put('/put/:_id', refreshToken, TrainerController.putTrainer);

/* 3. DELETE /trainer/admin/delete/:_id */
router.delete('/admin/delete/:_id', refreshToken, authorMiddleware, TrainerController.deleteTrainer);

/* 4. GET /trainer/:_id */
router.get('/:_id', refreshToken, TrainerController.showDetailTrainer);

module.exports = router;
