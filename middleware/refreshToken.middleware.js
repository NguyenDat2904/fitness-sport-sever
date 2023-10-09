require('dotenv').config();
const jwt = require('jsonwebtoken');
const { generateToken } = require('../helpers/generateToken.helper');

const refreshToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        res.status(400);
        throw new Error('Token không tồn tại');
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            // Token không hợp lệ hoặc không tồn tại
            if (err.name === 'TokenExpiredError') {
                const refreshToken = req.headers['authorization'];
                if (!refreshToken) {
                    res.status(400);
                    throw new Error('Refresh token không tồn tại');
                }

                // Xác thực Refresh token
                jwt.verify(refreshToken, process.env.SECRET_KEY, (err, user) => {
                    if (err) {
                        res.status(400);
                        throw new Error('Refresh token không hợp lệ');
                    }
                    const newToken = generateToken(user);
                    res.setHeader('authorization', newToken);
                    next();
                });
            } else {
                res.status(400);
                throw new Error('token không hợp lệ');
            }
        } else {
            // Token hợp lệ
            req.user = user;
            next();
        }
    });
};
module.exports = refreshToken;
