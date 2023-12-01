import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    token = await req.cookies.jwt;

    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.email).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, invalid token")
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token')
    }
})

const officialProtected = asyncHandler(async (req, res, next) => {
    let token;

    token = await req.cookies.jwt;

    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.email)
            // if(req.user.role == "gov") {
                next();
            // }
            // else {
                // throw new Error(req.user.role + " is not allowed")
            // }
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, invalid token")
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token')
    }
})

export { protect, officialProtected };