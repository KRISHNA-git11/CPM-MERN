import expressAsyncHandler from "express-async-handler";

/**
 * @author  @KRISHNA-git11
 * @desc    Route POST /api/users/auth
 * @access  Public
*/
const authUser =  expressAsyncHandler(async(req, res) => {
    res.status(200).json({
        messsage: 'Auth User'
    })
})

/**
 * @author  @KRISHNA-git11
 * @desc    Route POST /api/users
 * @access  Public
*/
const registerUser =  expressAsyncHandler(async(req, res) => {
    res.status(200).json({
        messsage: 'Register User'
    })
})

/**
 * @author  @KRISHNA-git11
 * @desc    Route POST /api/users/logout
 * @access  Public
*/
const logoutUser =  expressAsyncHandler(async(req, res) => {
    res.status(200).json({
        messsage: 'Logout User'
    })
})

/**
 * @author  @KRISHNA-git11
 * @desc    Route GET /api/users/profile
 * @access  Private
*/
const getUserProfile =  expressAsyncHandler(async(req, res) => {
    res.status(200).json({
        messsage: 'Get User Profile'
    })
})

/**
 * @author  @KRISHNA-git11
 * @desc    Route PUT /api/users/profile
 * @access  Private
*/
const updateUserPorfile =  expressAsyncHandler(async(req, res) => {
    res.status(200).json({
        messsage: 'Update User Profile'
    })
})

export { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserPorfile
};