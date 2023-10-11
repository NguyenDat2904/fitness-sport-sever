require('dotenv').config();
const jwt = require('jsonwebtoken');
const usersModel = require('../model/users.model');

async function checkAndUpdateRefreshToken(req, res, next) {
    try {
        const refreshToken = req.headers['refresh_token'];
        if (!refreshToken) {
            res.status(400).json({ error: 'Refresh token không tồn tại' });
            return;
        }
        jwt.verify(refreshToken, process.env.SECRET_KEY, async (err, user) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    const userToken = await usersModel.findById(user._id);
                    if (userToken) {
                        userToken.refreshToken = undefined;
                        await userToken.save();
                    }
                }
                res.status(400).json({ error: 'Refresh token không hợp lệ' });
                return;
            } else {
                next();
            }
        });
    } catch (error) {
        res.status(400).json({ error: 'Refresh token không hợp lệ' });
    }
}
module.exports = checkAndUpdateRefreshToken;
