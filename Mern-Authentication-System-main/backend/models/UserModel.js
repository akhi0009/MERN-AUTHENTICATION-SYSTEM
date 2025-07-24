import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    verifyotp:{type:String,default:''},
    verifyotpexpireat:{type:Number,default:0},
    isaccverified:{type:Boolean,default:'false'},
    resetotp:{type:String,default:''},
    resetotpexpireat:{type:Number,default:0},
})

const userModel = mongoose.models.user || mongoose.model('user',userSchema)  // we use OR operater beacuase to avoid creating model everytime so it check in models whether user is available.

export default userModel;