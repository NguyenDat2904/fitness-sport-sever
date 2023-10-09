const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Trainer = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String },
        role: { type: String },
    },
    { timestamps: true },
    { collection: 'trainers' },
);
module.exports = mongoose.model('trainers', Trainer);
