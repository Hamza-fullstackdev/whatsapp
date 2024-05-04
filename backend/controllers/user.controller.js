import User from '../models/user.model.js'
import errorHandler from '../utils/errorHandler.util.js';
export const getAllUsers= async(req,res,next)=>{
    try{
        const users=await User.find();
        if(!users) return next(errorHandler(400,"User not found"));
        res.status(200).json({
            success:true,
            data:users
        })
    }catch(error){
        next(error);
    }
}