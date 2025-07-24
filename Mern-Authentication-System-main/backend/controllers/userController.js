import userModel from "../models/UserModel";

export const getuserdata=async(req,res)=>{
    try{
        const {usetId}=req.body;
        const user=await userModel.findById(userId);
        if (!user){
            return res.json({success:false,message:"user not found"});
        }
        return res.json({success:false,
            userData:{
                name:user.name,
                isaccverified:isaccverified
            }
        });
    }catch(error){
        return res.json({success:false,message:error.message});
    }
}