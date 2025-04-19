module.exports = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    const details = err.details || [];

    console.error(`[${status}] ${message}`, details);

    res.status(status).json({ status, message, details });
};