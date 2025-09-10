import { User } from "../../models/user.model.js";


export const getCurrentUser = async(req,res)=>{
   try {
     const {userId} = req;
     if(!userId){
         return res.status(400).json({message:"User not found ..."})
     }
 
     const user = await User.findById(userId) ;
 
     if(!user) {
         return res.status(400).json({message:"User not found .."})
     }
   } catch (error) {

    return res.status(500).json("Error in get current user " , error)
    
   }

}