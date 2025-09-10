import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const URI = process.env.MONGO_URI

export const connectDB = async ()=>{
    try {
        await mongoose.connect(URI);
        console.log("Db connected Sucess !!")
        
    } catch (error) {
        console.log(error)
        
    }
}