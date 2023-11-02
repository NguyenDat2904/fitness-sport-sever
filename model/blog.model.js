const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Blog = new Schema(
    {
        category: { type: String },
        sub_category: { type: String },
        title: { type: String },
        img: { type: String },
        date: { type: Date },
        main_content: {
            list: [{ type: String }],
            content: [{ title: { type: String }, desc: [{ type: String }] }],
            img: { type: String },
            final_content: { type: String },
            table: {
                title: { type: String },
                desc: { type: String },
                price: { type: Number },
                combo: [{ type: String }],
                class: [{ type: String }],
                service: [{ type: String }],
                end_of_content: [{ type: String }],
            },
        },
    },
    { timestamps: true },
    { collection: 'blogs' },
);
module.exports = mongoose.model('blogs', Blog);
