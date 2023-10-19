var express = require('express');
var router = express.Router();
const AdminController = require('../controller/admin.controller');
const authorMiddleware = require('../middleware/author.middleware');
const accessToken = require('../middleware/refreshAccessToken.middleware');
const checkAndUpdateRefreshToken = require('../middleware/checkUpdateRefreshToken.middleware');

// IV. COURSES
// 0. POST /admin/course/post
router.post('/course/post', checkAndUpdateRefreshToken, accessToken, authorMiddleware, AdminController.postCourse);

// 1. GET /admin/course/
router.get('/course', AdminController.showAllCourses);

/* 2. PUT /admin/course/put/:_id */
router.put('/course/put/:_id', checkAndUpdateRefreshToken, accessToken, authorMiddleware, AdminController.putCourses);

/* 3. DELETE /admin/course/delete/:_id */
router.delete(
    '/course/delete/:_id',
    checkAndUpdateRefreshToken,
    accessToken,
    authorMiddleware,
    AdminController.deleteCourse,
);

/* 4. GET /admin/course/:_id */
router.get('/course/:_id', authorMiddleware, AdminController.showDetailCourse);

// V. BENEFITS
// 0. POST /admin/benefit/post
router.post('/benefit/post', checkAndUpdateRefreshToken, accessToken, authorMiddleware, AdminController.postBenefit);

// 1. GET /admin/benefit/
router.get('/benefit', AdminController.showAllBenefits);

/* 2. PUT /admin/benefit/put/:_id */
router.put('/benefit/put/:_id', accessToken, authorMiddleware, AdminController.putBenefit);

/* 3. DELETE /admin/benefit/delete/:_id */
router.delete('/benefit/delete/:_id', accessToken, authorMiddleware, AdminController.deleteBenefit);

/* 4. GET /admin/benefit/:_id */
router.get('/benefit/:_id', AdminController.showDetailBenefit);
module.exports = router;
