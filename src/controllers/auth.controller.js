const authService = require('../services/auth.service');

exports.register = async(req, res, next) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json({ message: 'User registered successfully', user: { id: user.id, username: user.username, email: user.email } });
    } catch (err) {
        next(err);
    }
};

exports.login = async(req, res, next) => {
    try {
        const { token } = await authService.login(req.body);
        res.json({ token });
    } catch (err) {
        res.status(401).json({ status: 401, message: err.message });
    }
};