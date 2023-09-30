import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
/**
 * @author  @KRISHNA-git11
 * @desc    Route POST /api/users/auth
 * @access  Public
*/
const authUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if (user && (await user.checkPassword(password))) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.firstName + " " + user.lastName,
            email: user.email
        });
    } else {
        res.status(401)
        throw new Error('Authentication failed Invalid user data')
    }

})

/**
 * @author  @KRISHNA-git11
 * @desc    Route POST /api/users
 * @access  Public
*/
const registerUser = expressAsyncHandler(async (req, res) => {
    // console.log(req.body);
    const { firstName, lastName, email, mobileNumber, address, password } = req.body;
    let userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists')
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        mobileNumber,
        address,
        password
    })

    if (user) {
        generateToken(res, user._id)
        res.status(200).json({
            _id: user._id,
            name: user.firstName + ' ' + user.lastName,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

/**
 * @author  @KRISHNA-git11
 * @desc    Route POST /api/users/logout
 * @access  Public
*/
const logoutUser = expressAsyncHandler(async (req, res) => {

    res.cookie('jwt', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
      });
      res.status(200).json({
        success: true,
        data: {},
      });
})

/**
 * @author  @KRISHNA-git11
 * @desc    Route GET /api/users/profile
 * @access  Private
*/
const getUserProfile = expressAsyncHandler(async (req, res) => {

    if(req.user) {
        res.status(200).json({
            _id: req.user._id,
            name: req.user.firstName + " " + req.user.lastName,
            email: req.user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }   
})

/**
 * @author  @KRISHNA-git11
 * @desc    Route PUT /api/users/profile
 * @access  Private
*/
const updateUserPorfile = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if(user) {
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.mobileNumber = req.body.mobileNumber || user.mobileNumber;
        user.address = req.body.address || user.address;

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.firstName + " " + updatedUser.lastName,
            email: updatedUser.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }  
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserPorfile
};