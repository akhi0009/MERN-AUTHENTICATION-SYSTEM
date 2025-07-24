import {login,register,logout, sendverifyotp, verifyemail, isauthenticated, sendresetotp, resetpass} from '../controllers/authController.js';
import express from 'express';
import userAuth from '../middleware/userAuth.js';

const authRouter=express.Router();

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
authRouter.post('/send-verify-otp',userAuth,sendverifyotp);
authRouter.post('/verify-account',userAuth,verifyemail);
authRouter.post('/is-authenticated',userAuth,isauthenticated);
authRouter.post('/send-reset-otp',sendresetotp);
authRouter.post('/reset-password',resetpass);
export default authRouter;