const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const register = async({ username, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    return user;
};

const login = async({ username, password }) => {
    const user = await User.findOne({ where: { username } });
    if (!user) throw new Error('Invalid username or password');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid username or password');

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    return { token };
};

module.exports = { register, login };