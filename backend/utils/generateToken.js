const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    res.cookie('jwt', token, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict'
        });
}

module.exports = generateToken;