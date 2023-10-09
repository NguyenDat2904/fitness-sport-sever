var express = require('express');
var router = express.Router();
const AdminController = require('../controller/admin.controller');
const authorMiddleware = require('../middleware/author.middleware');
const refreshToken = require('../middleware/refreshToken.middleware');

// IV. COURSES
// 0. POST /admin/course/post
router.post('/course/post', refreshToken, authorMiddleware, AdminController.postCourse);

// 1. GET /admin/course/
router.get('/course', refreshToken, authorMiddleware, AdminController.showAllCourses);

/* 2. PUT /admin/course/put/:_id */
router.put('/course/put/:_id', refreshToken, authorMiddleware, AdminController.putCourses);

/* 3. DELETE /admin/course/delete/:_id */
router.delete('/course/delete/:_id', refreshToken, authorMiddleware, AdminController.deleteCourse);

/* 4. GET /admin/course/:_id */
router.get('/course/:_id', refreshToken, authorMiddleware, AdminController.showDetailCourse);

// V. BENEFITS
// 0. POST /admin/benefit/post
router.post('/benefit/post', refreshToken, authorMiddleware, AdminController.postBenefit);

// 1. GET /admin/benefit/
router.get('/benefit', refreshToken, authorMiddleware, AdminController.showAllBenefits);

/* 2. PUT /admin/benefit/put/:_id */
router.put('/benefit/put/:_id', refreshToken, authorMiddleware, AdminController.putBenefit);

/* 3. DELETE /admin/benefit/delete/:_id */
router.delete('/benefit/delete/:_id', refreshToken, authorMiddleware, AdminController.deleteBenefit);

/* 4. GET /admin/benefit/:_id */
router.get('/benefit/:_id', refreshToken, authorMiddleware, AdminController.showDetailBenefit);
module.exports = router;
