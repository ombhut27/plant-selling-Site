import express from 'express'
import { isAuthenticated, login, logout, register, forgotPassword, sendResetOtp, verifyResetOtp } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';


const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/is-auth', userAuth, isAuthenticated);
authRouter.post('/send-forgot-password-otp', sendResetOtp);
authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/verify-forgot-password-otp', verifyResetOtp);




export default authRouter ;

