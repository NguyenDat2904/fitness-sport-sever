const orderModel = require('../model/orders.model');
class OrderController {
    async postOrder(req, res) {
        try {
            const { userID, courseID, status, totalPrice, timePrice } = req.body;

            const order = new orderModel({
                userID,
                courseID,
                status,
                totalPrice,
                timePrice,
            });
            await order.save();
            res.status(200).json({ msg: 'Post Order Success' });
        } catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }

    async showAllOrder(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const totalOrder = await orderModel.countDocuments();
            const totalPages = Math.ceil(totalOrder / limit);

            const orders = await orderModel
                .find()
                .skip((page - 1) * limit)
                .populate('userID courseID', '-password')
                .limit(limit);
            if (!orders) {
                throw new Error(error);
            }
            res.status(200).json({ orders, totalPages, page, totalOrder });
        } catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }

    async putOrder(req, res) {
        try {
            const id = req.params._id;
            const updateData = req.body;
            const order = await orderModel.findById({ _id: id });

            if (!order) {
                res.status(404);
                throw new Error(error);
            }

            // Cập nhật thông tin đơn hàng
            await orderModel.findByIdAndUpdate(id, updateData);
            res.status(200).json({ message: 'Information edited successfully' });
        } catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }

    async deleteOrder(req, res) {
        try {
            const id = req.params._id;
            const order = await orderModel.findById(id);
            if (!order) {
                res.status(404);
                throw new Error('Order not found');
            }
            await orderModel.findByIdAndRemove({ _id: id });
            response.status(200).json('Delete Order Success');
        } catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }

    async showDetailOrder(req, res) {
        try {
            const id = req.params._id;

            const order = await orderModel.findById({ _id: id }).populate('userID courseID', '-password');
            if (!order) {
                res.status(400);
                throw new Error(error);
            }
            res.status(200).json(order);
        } catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }
}

module.exports = new OrderController();
