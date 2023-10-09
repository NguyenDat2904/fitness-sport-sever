const handleErrorMiddleware = (error, req, res, next) => {
    const statusCode = res.statusCode ?? 500;
    response.status(statusCode).json({
        statusCode,
        error: error.message,
        stack: error.stack,
    });
};

module.exports = handleErrorMiddleware;
