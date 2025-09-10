import express from "express"
import { googleAuth, resetPassword, sendOtp, signin, signout, signup, verifyOtp } from "../controllers/auth.contollers.js";
const authRoutes = express.Router();

authRoutes.post("/signup",signup);
authRoutes.post("/signin",signin);
authRoutes.post("/signout",signout);
authRoutes.post("/sendotp",sendOtp);
authRoutes.post("/verifyotp",verifyOtp);
authRoutes.post("/resetpassword",resetPassword);
authRoutes.post("/googleauth",googleAuth);






export default authRoutes ; 