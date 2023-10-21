require('dotenv').config();

const nodemailer = require('nodemailer');
const userModel = require('../model/users.model');
const trainerModel = require('../model/trainers.model');
const checkEmailExists = async (email) => {
    const user = await userModel.findOne({ email });
    const trainer = await trainerModel.findOne({ email });
    if (user) {
        return user;
    } else if (trainer) {
        return trainer;
    } else {
        return null;
    }
};
// Cấu hình Nodemailer với SMTP của Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // type: 'OAuth2',
        user: process.env.USER_EMAIL,
        pass: process.env.PASSWORD_EMAIL,
    },
});
module.exports = { checkEmailExists, transporter };
