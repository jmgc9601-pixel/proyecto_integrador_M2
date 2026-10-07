const errorMiddleware = (error, req, res, next) => {
res.status(500).json({
    error: "internal server error"
});
};

module.exports = errorMiddleware;