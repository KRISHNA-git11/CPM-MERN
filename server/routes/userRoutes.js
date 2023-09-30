import express from "express";
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserPorfile
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/', registerUser) // register user
router.post('/auth', authUser) // login user
router.post('/logout', logoutUser) // log out user
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserPorfile) // get user profile, update user profile    


export default router;