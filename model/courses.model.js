const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Course = new Schema(
    {
        name: { type: String, required: true },
        start: { type: Date, required: true },
        end: { type: Date, required: true },
        status: { type: String },
        price: { type: Number },
        locationID: { type: mongoose.Schema.Types.ObjectId, ref: 'locations' },
        trainerID: { type: mongoose.Schema.Types.ObjectId, ref: 'trainers' },
        schedule: [{ time: { type: String }, day: { type: String } }],
    },
    { timestamps: true },
    { collection: 'courses' },
);
module.exports = mongoose.model('courses', Course);
