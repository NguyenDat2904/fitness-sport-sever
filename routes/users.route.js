var express = require('express');
var router = express.Router();
const refreshToken = require('../middleware/refreshToken.middleware');
const UserController = require('../controller/user.controller');
const authorMiddleware = require('../middleware/author.middleware');

/* GET users listing. */
// I. USER
/* 1. GET /admin/ */
router.get('/admin', refreshToken, authorMiddleware, UserController.showAllUser);

/* 2. PUT user/put/:_id */
router.put('/put/:_id', refreshToken, UserController.putUser);

/* 3. DELETE /user/admin/delete/:_id */
router.delete('/admin/delete/:_id', refreshToken, authorMiddleware, UserController.deleteUser);

/* 4. GET users/:_id */
router.get('/:_id', refreshToken, UserController.showDetailUser);

module.exports = router;
