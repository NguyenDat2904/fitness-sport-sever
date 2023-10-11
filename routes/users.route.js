var express = require('express');
var router = express.Router();
const refreshAccessToken = require('../middleware/refreshAccessToken.middleware');
const checkAndUpdateRefreshToken = require('../middleware/checkUpdateRefreshToken.middleware');
const UserController = require('../controller/user.controller');
const authorMiddleware = require('../middleware/author.middleware');

/* GET users listing. */
// I. USER
/* 1. GET /admin/ */
router.get('/admin', checkAndUpdateRefreshToken, refreshAccessToken, authorMiddleware, UserController.showAllUser);

/* 2. PUT user/put/:_id */
router.put('/put/:_id', checkAndUpdateRefreshToken, refreshAccessToken, UserController.putUser);

/* 3. DELETE /user/admin/delete/:_id */
router.delete(
    '/admin/delete/:_id',
    checkAndUpdateRefreshToken,
    refreshAccessToken,
    authorMiddleware,
    UserController.deleteUser,
);

/* 4. GET users/:_id */
router.get('/:_id', checkAndUpdateRefreshToken, refreshAccessToken, UserController.showDetailUser);

module.exports = router;
