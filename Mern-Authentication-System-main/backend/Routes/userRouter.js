import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getuserdata } from '../controllers/userController.js';

const authRouter=express.Router();

userRouter.get('/data',userAuth,getuserdata);

export default userRouter;