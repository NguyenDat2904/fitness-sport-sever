require('dotenv').config();
const jwt = require('jsonwebtoken');
const generateToken = (user) => {
    const payload = { userId: user._id, role: user.role };
    const options = {
        expiresIn: '24h', // Thời gian sống của mã thông báo (ví dụ: 2 giờ)
    };
    return jwt.sign(payload, process.env.SECRET_KEY, options);
};
module.exports = { generateToken };
