import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    phone:{
        type: Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true,
    },
    profileimg:{
        type:String,
        required:true,
    }
},{timestamps:true});

const User = mongoose.model("User",userSchema);
export default User;