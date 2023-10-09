var express = require('express');
var router = express.Router();
const AuthController = require('../controller/auth.controller');
/* Route Register. */

// 1. POST /auth/verify
router.post('/verify', AuthController.verify);

// 2. POST /auth/register
router.post('/register', AuthController.register);

// 3. POST /auth/login

router.post('/login', AuthController.login);

// 4. POST /auth/security
router.post('/security', AuthController.security);

// 5. PATCH /auth/forgot
router.patch('/forgot', AuthController.forgot);

// 6. PATCH /auth/:_id/change-password
router.patch('/:_id/change-password', AuthController.changePassword);

module.exports = router;
