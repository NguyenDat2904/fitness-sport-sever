const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema(
    {
        userID: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        courseID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'courses' }],
        status: { type: String },
        totalPrice: { type: Number },
        timePrice: { type: Date },
    },
    { timestamps: true },
    { collection: 'orders' },
);

module.exports = mongoose.model('orders', Order);
