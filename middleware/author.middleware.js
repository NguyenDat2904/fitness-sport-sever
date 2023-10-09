const authorMiddleware = (req, res, next) => {
    const role = req.user.role;
    if (role !== 'admin') {
        res.status(400);
        throw new Error({ error: 'Bạn không phải là admin' });
    }
    next();
};

module.exports = authorMiddleware;
    