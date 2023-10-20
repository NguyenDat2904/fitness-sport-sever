require('dotenv').config();

const paypal = require('paypal-rest-sdk');
const orderModel = require('../model/orders.model');
const convertVndToUsd = require('../helpers/convertVndToUsd.helper');
const usersModel = require('../model/users.model');
const benefitsModel = require('../model/benefits.model');

class PaymentController {
    async pay(req, res) {
        try {
            const { userID, courseID, totalPrice, timePrice } = req.body;
            const total = await convertVndToUsd(totalPrice);

            const newOrder = new orderModel({
                userID,
                courseID,
                totalPrice,
                status: 'Chưa thanh toán',
                timePrice,
            });
            const order = await newOrder.save();
            if (!order) {
                res.status(400);
                throw new Error('Order was not created');
            }
            paypal.configure({
                mode: 'sandbox', //sandbox or live
                client_id: process.env.CLIENT_ID_PAYPAL,
                client_secret: process.env.SECRET_KEY_PAYPAL,
            });

            const create_payment_json = {
                intent: 'sale',
                payer: {
                    payment_method: 'paypal',
                },
                redirect_urls: {
                    return_url: `${process.env.LOCALHOST}/payment/success`,
                    cancel_url: `${process.env.LOCALHOST}/payment/cancel`,
                },
                transactions: [
                    {
                        item_list: {
                            items: [
                                {
                                    name: 'Thanh toán Khóa học',
                                    sku: newOrder._id.toString(),
                                    price: total,
                                    currency: 'USD',
                                    quantity: 1,
                                },
                            ],
                        },
                        amount: {
                            currency: 'USD',
                            total: total,
                        },
                        description: 'This is the payment description.',
                    },
                ],
            };

            paypal.payment.create(create_payment_json, async function (error, payment) {
                if (error) {
                    res.status(400);
                    throw new Error('Error payment');
                } else {
                    for (let i = 0; i < payment.links.length; i++) {
                        if (payment.links[i].rel === 'approval_url') {
                            return res.status(200).json(payment.links[i]);
                        }
                    }
                }
            });
        } catch (error) {
            res.status(400);
            throw new Error('Error Payment');
        }
    }
    async success(req, res) {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        const execute_payment_json = {
            payer_id: payerId,
        };

        paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
            if (error) {
                throw new Error(error);
            } else {
                try {
                    const orderID = payment.transactions[0].item_list.items[0].sku;

                    const order = await orderModel.findById({ _id: orderID });

                    if (!order) {
                        res.status(404);
                        throw new Error('Order not found');
                    }
                    // Cập nhật thông tin đơn hàng
                    await orderModel.findByIdAndUpdate(orderID, { status: 'Đã thanh toán' });
                    res.status(200).json({ message: 'Information edited successfully' });
                } catch (error) {
                    res.status(400);
                    throw new Error(error);
                }
            }
        });
    }

    cancel(req, res) {
        res.status(400).json({ msg: 'Payment Error' });
    }

    async benefit(req, res) {
        try {
            const rank = req.params.rank;
            const userID = req.params._id;

            const user = await usersModel.findById(userID);
            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }
            let total;
            if (user.rank === '' && rank === 'Gold') {
                total = await convertVndToUsd(499999);
            } else if (user.rank === '' && rank === 'Platinum') {
                total = await convertVndToUsd(899999);
            } else if (user.rank === '' && rank === 'Diamond') {
                total = await convertVndToUsd(1499999);
            } else if (user.rank === 'Gold' && rank === 'Platinum') {
                total = await convertVndToUsd(400000);
            } else if (user.rank === 'Platinum' && rank === 'Diamond') {
                total = await convertVndToUsd(600000);
            } else if (user.rank === 'Gold' && rank === 'Diamond') {
                total = await convertVndToUsd(1000000);
            } else {
                return res.status(400).json({ msg: 'Rank không hợp lệ' });
            }

            paypal.configure({
                mode: 'sandbox', //sandbox or live
                client_id: process.env.CLIENT_ID_PAYPAL,
                client_secret: process.env.SECRET_KEY_PAYPAL,
            });

            const create_payment_json = {
                intent: 'sale',
                payer: {
                    payment_method: 'paypal',
                },
                redirect_urls: {
                    return_url: `${process.env.LOCALHOST}/payment/paypal/benefit-success`,
                    cancel_url: `${process.env.LOCALHOST}/payment/cancel`,
                },
                transactions: [
                    {
                        item_list: {
                            items: [
                                {
                                    name: rank.toString(),
                                    sku: userID.toString(),
                                    price: total.toString(),
                                    currency: 'USD',
                                    quantity: 1,
                                },
                            ],
                        },
                        amount: {
                            currency: 'USD',
                            total: total,
                        },
                        description: 'This is the payment description.',
                    },
                ],
            };

            paypal.payment.create(create_payment_json, async function (error, payment) {
                if (error) {
                    res.status(400);
                    throw new Error(error);
                } else {
                    for (let i = 0; i < payment.links.length; i++) {
                        if (payment.links[i].rel === 'approval_url') {
                            return res.status(200).json(payment.links[i]);
                        }
                    }
                }
            });
        } catch (error) {
            return res.status(400).json({ msg: 'Lỗi tạo bill thanh toán' });
        }
    }

    successBenefit(req, res) {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        const execute_payment_json = {
            payer_id: payerId,
        };

        paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
            if (error) {
                throw new Error(error);
            } else {
                try {
                    const userID = payment.transactions[0].item_list.items[0].sku;
                    const rank = payment.transactions[0].item_list.items[0].name;

                    const user = await usersModel.findById(userID);

                    if (!user) {
                        res.status(404);
                        throw new Error(error);
                    }
                    let newBenefits = [];
                    if (rank === 'Gold') {
                        newBenefits = await benefitsModel.find({ rank: 'Gold' }, '_id');
                    } else if (rank === 'Platinum') {
                        newBenefits = await benefitsModel.find({ rank: { $in: ['Gold', 'Platinum'] } }, '_id');
                    } else if (rank === 'Diamond') {
                        newBenefits = await benefitsModel.find(
                            { rank: { $in: ['Gold', 'Platinum', 'Diamond'] } },
                            '_id',
                        );
                    } else {
                        return res.status(400).json({ msg: 'Rank not found' });
                    }

                    newBenefits.forEach((id) => {
                        if (!user.benefitID.includes(id)) {
                            user.benefitID.push(id);
                        }
                    });

                    user.rank = rank;

                    await user.save();
                    res.status(200).json({ message: 'Information edited successfully' });
                } catch (error) {
                    res.status(400);
                    throw new Error(error);
                }
            }
        });
    }
}
module.exports = new PaymentController();
