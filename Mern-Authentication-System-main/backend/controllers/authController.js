import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userModel from "../models/UserModel.js";
import transporter from "../config/nodemailer.js";

export const register= async (req,res)=>{
    const {name,email,password}=req.body;

    if (!name || !email || !password){
        return res.json({success:false,message:'missing details'})
    }
    try {
        const existinguser=await userModel.findOne({email});

        if(existinguser){
            return res.json({success:false,message:'user already exist with this email'});
        }

        const hashedpassword=await bcrypt.hash(password,10);
        const user=new userModel({name,email,password:hashedpassword});
        await user.save();

        const token=jwt.sign({id:user._id},process.env.JWT_KEY,{expiresIn:'7d'});

        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV || 'production',
            sameSite:process.env.NODE_ENV==='production'?'none':'strict',
            maxAge:7*24*60*60*1000
        })

        const mailoptions={
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:`Welcome ${name}`,
            text:`welcome ${name}!,you have been registered successfully in worldstore with email:${email}`
        }

        await transporter.sendMail(mailoptions);
        return res.json({success:true});
    }
    catch(error){
        res.json({success:false,message:error.message});
    }
}

export const login=async(req,res)=>{
    const {email,password}=req.body;
    if (!email || !password){
        return res.json({success:false,message:'missing details'});
    }
    try{
        const user=await userModel.findOne({email});
        if (!user){
            return res.json({success:false,message:'invalid email'});
        }
        const ismatch=await bcrypt.compare(password,user.password)
        if (!ismatch){
            return res.json({success:false,message:'invalid password'});
        }
        const token=jwt.sign({id:user._id},process.env.JWT_KEY,{expiresIn:'7d'});

        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV || 'production',
            sameSite:process.env.NODE_ENV==='production'?'none':'strict',
            maxAge:7*24*60*60*1000
        })

        return res.json({sucess:true});
    }
    catch(error){
         return res.json({success:false,message:error.message});
    }
}

export const logout=(req,res)=>{
    try{
        res.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV || 'production',
            sameSite:process.env.NODE_ENV==='production'?'none':'strict',
        })
        return res.json({sucess:true,message:"logout"});
    }
    catch(error){
        return res.json({success:false,message:error.message});
    }
}

export const sendverifyotp= async(req,res)=>{
    try{
        const {userId}=req.body;
        const user=await userModel.findById(userId);
        if(user.isaccverified){
            return res.json({success:false,message:"account already verified"})
        }
        const otp=String(Math.floor(100000+Math.random()*900000));
        user.verifyotp=otp;
        user.verifyotpexpireat=Date.now()+24*60*60*10000
        await user.save();

        const mailoptions={
            from:process.env.SENDER_EMAIL,
            to:user.email,
            subject:`Account verification otp`,
            text:`Your otp is ${otp}. verify your account using this otp.`
        }
        await transporter.sendMail(mailoptions);
        return res.json({success:true,message:"otp sent to email"});

    }catch(error){
        res.json({success:false,message:error.message});
    }
}

export const verifyemail=async(req,res)=>{
    const {userId,otp}=req.body;
    if(!userId || !otp){
        return res.json({success:false,message:'missing details'});
    }
    try{
        const user=await userModel.findById(userId);
        if(!user){
            return res.json({success:false,message:"user not found"})
        }
        if (user.verifyotp==='' || user.verifyotp!==otp){
            return res.json({success:false,message:"invalid otp"})
        }
        if (user.verifyotpexpireat<Date.now()){
            return res.json({success:false,message:"otp expired"})
        }
        user.isaccverified=true;
        user.verifyotp='';
        user.verifyotpexpireat=0;
        await user.save();
        return res.json({success:true,message:"email verified successfully"})

    }catch(error){
        return res.json({success:false,message:error.message});
    }
}

export const isauthenticated=async(res,req)=>{
    try{
        return res.json({success:true});
    }catch(error){
        return res.json({success:false,message:error.message});
    }
}

export const sendresetotp=async(req,res)=>{
    const {email}=req.body;
    if (!email){
        return res.json({success:false,message:"email required"});
    }
    try{
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"user not found"});
        }
         const otp=String(Math.floor(100000+Math.random()*900000));
        user.resetotp=otp;
        user.resetotpexpireat=Date.now()+24*60*60*10000
        await user.save();

        const mailoptions={
            from:process.env.SENDER_EMAIL,
            to:user.email,
            subject:`Password Reset OTP`,
            text:`Your otp is ${otp}. verify your account using this otp.`
        }
        await transporter.sendMail(mailoptions);
        return res.json({success:true,message:"otp sent to email"});

    }catch(error){
        return res.json({success:false,message:error.message});
    }
}

export const resetpass=async(req,res)=>{
    const {email,otp,newpassword}=req.body;
    if(!email || !otp || !newpassword){
        return res.json({success:false,message:"requries details"});
    }
    try{
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"user not found"});
        }
        if (user.resetotp=='' ||user.resetotp!=otp){
            return res.json({success:false,message:"invalid otp"});
        }
        if (user.resetotpexpireat<Date.now()){
            return res.json({success:false,message:"otp expired"})
        }
        const hashedpassword=await bcrypt.hash(newpassword,10);
        user.password=hashedpassword;
        user.resetotp='';
        user.resetotpexpireat=0;
        await user.save();
        return res.json({success:false,message:"your password has been changed successfully"});
    }catch(error){
        return res.json({success:false,message:error.message});
    }
}