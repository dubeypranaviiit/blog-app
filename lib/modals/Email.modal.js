import mongoose  from "mongoose";

const emailSchema = new mongoose.Schema({
 email:{
    type:String,
    required:true
 },
 
},{timestamps:true})

const Email = mongoose.models.email ||  mongoose.model("Email",emailSchema );
export default Email;