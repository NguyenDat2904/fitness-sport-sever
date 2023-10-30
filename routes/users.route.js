var express = require('express');
var router = express.Router();
const multer = require('multer');

const refreshAccessToken = require('../middleware/refreshAccessToken.middleware');
const checkAndUpdateRefreshToken = require('../middleware/checkUpdateRefreshToken.middleware');
const UserController = require('../controller/user.controller');
const authorMiddleware = require('../middleware/author.middleware');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const originalName = file.originalname;
        const extension = originalName.split('.').pop();
        const filename = `${uniqueSuffix}.${extension}`;
        cb(null, filename);
    },
});

const upload = multer({
    storage: storage,
});

/* GET users listing. */
// I. USER
/* 1. GET /admin/ */
router.get('/admin', checkAndUpdateRefreshToken, refreshAccessToken, authorMiddleware, UserController.showAllUser);

/* 2. PUT user/put/:_id */
router.put(
    '/put/:_id',
    checkAndUpdateRefreshToken,
    refreshAccessToken,
    upload.fields([{ name: 'img' }, { name: 'img_cover' }]),
    UserController.putUser,
);

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
