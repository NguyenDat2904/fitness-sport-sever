require('dotenv').config();
const jwt = require('jsonwebtoken');
const { generateToken } = require('../helpers/generateToken.helper');

const usersModel = require('../model/users.model');

const refreshAccessToken = (req, res, next) => {
    const token = req.headers['authorization'];
    const refreshToken = req.headers['refresh_token'];

    if (!token) {
        res.status(400);
        throw new Error('Token không tồn tại');
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
        if (err) {
            // Token không hợp lệ hoặc hết hạn
            if (err.name === 'TokenExpiredError') {
                // Kiểm tra và cập nhật refreshToken
                try {
                    const user = await usersModel.find({ refreshToken: refreshToken });
                    if (user) {
                        // Tạo accessToken mới và trả về cho user
                        const accessToken = generateToken(user, '24h');
                        res.status(200).json({ accessToken });
                        return;
                    } else {
                        res.status(400).json({ error: 'Invalid refresh token' });
                        return;
                    }
                } catch (error) {
                    res.status(400).json({ error: 'Invalid refresh token' });
                    return;
                }
            } else {
                res.status(400).json({ error: 'Invalid token' });
                return;
            }
        } else {
            // Token hợp lệ
            req.user = user;
            next();
        }
    });
};
module.exports = refreshAccessToken;
