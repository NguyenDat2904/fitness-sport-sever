var express = require('express');
const orderModel = require('../controller/order.controller');
const accessToken = require('../middleware/refreshAccessToken.middleware');
const checkAndUpdateRefreshToken = require('../middleware/checkUpdateRefreshToken.middleware');
var router = express.Router();
// 0. CREATE /order/post
router.post('/post', checkAndUpdateRefreshToken, accessToken, orderModel.postOrder);

// 1. GET /order/
router.get('/', checkAndUpdateRefreshToken, accessToken, orderModel.showAllOrder);

/* 2. PUT /order/put/:_id */
router.put('/put/:_id', checkAndUpdateRefreshToken, accessToken, orderModel.postOrder);

/* 3. DELETE /order/delete/:_id */
router.delete('/delete/:_id', checkAndUpdateRefreshToken, accessToken, orderModel.deleteOrder);

/* 4. GET /order/:_id */
router.get('/:_id', checkAndUpdateRefreshToken, accessToken, orderModel.showDetailOrder);

module.exports = router;
