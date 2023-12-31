const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Benefit = new Schema(
    {
        name: { type: String, required: true },
        rank: { type: String },
    },
    { timestamps: true },
    { collection: 'benefits' },
);
module.exports = mongoose.model('benefits', Benefit);
