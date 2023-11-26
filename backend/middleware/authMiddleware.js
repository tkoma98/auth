const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = expressAsyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;
    
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId, '-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not Authorised, Invalid token');
        }
    } else {
        res.status(401);
        throw new Error('Not Authorised, No token provided');
    }
});

module.exports = protect;