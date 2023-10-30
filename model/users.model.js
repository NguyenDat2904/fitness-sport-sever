const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema(
    {
        name: { type: String, minlength: 3, maxlength: 30, required: true },
        email: { type: String, lowercase: true, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String },
        address: { type: String },
        age: { type: Number },
        rank: { type: String },
        courseID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'courses' }],
        benefitID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'benefits' }],
        role: { type: String },
        status: { type: Boolean },
        refreshToken: { type: String },
        img: { type: String },
        img_cover: { type: String },
        gender: { type: String },
    },
    { timestamps: true },
    { collection: 'users' },
);
module.exports = mongoose.model('users', User);
