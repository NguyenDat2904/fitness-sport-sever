var express = require('express');
const locationController = require('../controller/location.controller');
const author = require('../middleware/author.middleware');

var router = express.Router();

// III. Location
// 0. CREATE /location/post
router.post('/post', author, locationController.postLocation);

// 1. GET /location/
router.get('/', locationController.showAllLocation);

/* 2. PUT /location/put/:_id */
router.put('/put/:_id', locationController.putLocation);

/* 3. DELETE /location/delete/:_id */
router.delete('/delete/:_id', locationController.deleteLocation);

/* 4. GET /location/:_id */
router.get('/:_id', locationController.showDetailLocation);

module.exports = router;
