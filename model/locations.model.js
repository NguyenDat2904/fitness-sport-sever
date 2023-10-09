const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Location = new Schema(
    {
        name: { type: String },
        city: { type: String },
        district: { type: String },
        ward: { type: String },
        street: { type: String },
        phone: { type: String },
        desc: { type: String },
        times_days: [{ time: { type: String }, day: { type: String } }],
        img: { type: String },
    },
    { timestamps: true },
    { collection: 'locations' },
);
module.exports = mongoose.model('locations', Location);
