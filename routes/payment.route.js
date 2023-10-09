var express = require('express');
var router = express.Router();
const auth = require('../middleware/refreshToken.middleware');
const paymentController = require('../controller/payment.controller');

router.post('/paypal', auth, paymentController.pay);
router.get('/paypal/cancel', paymentController.cancel);
router.get('/paypal/success', paymentController.success);
router.get('/paypal/benefit-success', paymentController.successBenefit);

router.get('/paypal/benefit/:rank/:_id', paymentController.benefit);

module.exports = router;
