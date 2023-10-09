var express = require('express');
const orderModel = require('../controller/order.controller');
const auth = require('../middleware/refreshToken.middleware');
var router = express.Router();
// 0. CREATE /order/post
router.post('/post', auth, orderModel.postOrder);

// 1. GET /order/
router.get('/', auth, orderModel.showAllOrder);

/* 2. PUT /order/put/:_id */
router.put('/put/:_id', auth, orderModel.postOrder);

/* 3. DELETE /order/delete/:_id */
router.delete('/delete/:_id', auth, orderModel.deleteOrder);

/* 4. GET /order/:_id */
router.get('/:_id', auth, orderModel.showDetailOrder);

module.exports = router;
