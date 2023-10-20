const authorMiddleware = (req, res, next) => {
    const role = req.user.role;
    if (role !== 'admin') {
        return res.status(400).json({ error: 'Bạn không phải là admin' });
    }
    next();
};

module.exports = authorMiddleware;
