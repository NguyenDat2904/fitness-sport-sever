var express = require('express');
var router = express.Router();
const accessToken = require('../middleware/refreshAccessToken.middleware');
const checkAndUpdateRefreshToken = require('../middleware/checkUpdateRefreshToken.middleware');
const paymentController = require('../controller/payment.controller');

router.post('/paypal', checkAndUpdateRefreshToken, accessToken, paymentController.pay);
router.get('/paypal/cancel', paymentController.cancel);
router.get('/paypal/success', paymentController.success);
router.get('/paypal/benefit-success', paymentController.successBenefit);
router.get('/paypal/benefit/:rank/:_id', checkAndUpdateRefreshToken, accessToken, paymentController.benefit);

module.exports = router;
