var express = require('express');
const locationController = require('../controller/location.controller');
const accessToken = require('../middleware/refreshAccessToken.middleware');
const checkAndUpdateRefreshToken = require('../middleware/checkUpdateRefreshToken.middleware');
const author = require('../middleware/author.middleware');
const multer = require('multer');

var router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images_location');
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

// III. Location
// 0. CREATE /location/post
router.post(
    '/post',
    checkAndUpdateRefreshToken,
    accessToken,
    author,
    upload.fields([{ name: 'img' }]),
    locationController.postLocation,
);

// 1. GET /location/
router.get('/', locationController.showAllLocation);

/* 2. PUT /location/put/:_id */
router.put(
    '/put/:_id',
    checkAndUpdateRefreshToken,
    accessToken,
    author,
    upload.fields([{ name: 'img' }]),
    locationController.putLocation,
);

/* 3. DELETE /location/delete/:_id */
router.delete('/delete/:_id', checkAndUpdateRefreshToken, accessToken, author, locationController.deleteLocation);

/* 4. GET /location/:_id */
router.get('/:_id', locationController.showDetailLocation);

module.exports = router;
