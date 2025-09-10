import { User } from "../../models/user.model.js";
import bcrypt, { hash } from "bcryptjs";
import { genToken } from "../utils/gentoken.js";
import { sendOtpMail } from "../utils/sendmail.js";

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;

    // check user
    const existuser = await User.findOne({ email });
    if (existuser) {
      return res.status(409).json({ message: "User already exists" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    if (mobile.length < 10) {
      return res.status(400).json({ message: "Phone number must be 10 digits." });
    }

    const hashpassword = await bcrypt.hash(password, 14);

    const user = await User.create({
      fullName,
      email,
      password: hashpassword,
      mobile,
      role,
    });

    const token = genToken(user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


// SIGNIN
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not exists" });
    }

    const ispassword = await bcrypt.compare(password, user.password);
    if (!ispassword) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }

    const token = genToken(user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true
    });

    return res.status(200).json({ message: "User logged in successfully", user });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
    
  }
};

// SIGNOUT
export const signout = (req, res) => {
  return res.clearCookie("token").status(200).json({ message: "Signed out" });
};


// sending otp via mail  step 1 

export const sendOtp = async (req,res)=>{
  try {
    const {email} = req.body ; 

    const user = await  User.findOne({email});
    if(!user){
      return res.status(404).json({message:"User doesnt exist with this email !"})
    }
    const otp = Math.floor(1000+Math.random()*9000).toString();
    user.resetOtp = otp;
    user.otpexpires = Date.now()+5*60*1000;
    user.isOtpVerified = false 
    
    await user.save();
    await sendOtpMail(user.email,otp)
    
    return res.status(200).json({message:"Otp Sent Sucessfully !"})
  } catch (error) {
    return res.status(404).json({message:"Otp sent error",error})
    
  }
}

// verify otp step 2 

export const verifyOtp = async(req,res)=>{
  try {
    const {email,otp} = req.body ; 
  
    const user = await User.findOne({email});
  
    if(!user || user.resetOtp!=otp || user.otpexpires < Date.now()  ){
      return res.status(404).json({message:"invalid/expired otp "})
    }
    user.resetOtp = undefined ; 
    user.isOtpVerified = true ; 
    user.otpexpires = undefined ; 
    await user.save()
  
    return res.status(200).json({mesage:"Otp verified Sucessfully !"})
    
  } catch (error) {
    return res.status(404).json({message:"Error while Sending Otp ."})
    
  }
}

export const resetPassword = async(req,res)=>{
  try {
    const {email,newPassword} = req.body ; 

    const user = await User.findOne({email});

    if(!user||!user.isOtpVerified){
      return res.status(400).json({message:"otp verification required !"})
    }
    const hashpass = await bcrypt.hash(newPassword,14);

    user.password = hashpass; 
    user.isOtpVerified = false ; 

    await user.save()

    return res.status(200).json({message:"Password Changed Sucessfully !"})
    
  } catch (error) {
    return res.status(404).json({message:"Reset Password error",error})

  }
}

export const googleAuth = async (req,res)=>{
  try {
    const {fullName,email,mobile,role} = req.body ;
    let user = await User.findOne({email});

    if(!user){
      user = await User.create({
        fullName,
        email,
        mobile,role
      })

    }

    const token = genToken(user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true
    });

    return res.status(200).json({ message: "User logged in successfully", user });

    
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" , error});

    
  }
}