import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,


    },
    mobile:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","owner","deliveryboy"],
        deafult:"user"
    },
    resetOtp:{
        type:String,

    },
    isOtpVerified:{
        type:Boolean,
        default:false
    },
    otpexpires:{
        type:Date
    }


},{timestamps:true})

export const User = mongoose.model("User",userSchema)