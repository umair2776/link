
const User=require("../models/user.models")
const bcrypt=require("bcrypt")
const salt = 10;
var jwt = require('jsonwebtoken');
const sendEmail=require("../utilis/sendmail")



exports.register=async(req,res)=>{
    try{
        const  {password}=req.body;
        const hashedPassword= await bcrypt.hash(password, salt)
        req.body.password=hashedPassword;
        const randomNumber=Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
        const user=await User.create(req.body)
        user.code=randomNumber;
        user.save();
        const subject="Welcome to the LMS"
        const text=`This is a email sending. This is your verifcation code ${randomNumber}`
        sendEmail(user.email,subject,text);
        res.json({status:200,message:"User created Successfully",user})
    }
    catch(err){
        console.log(err);
    }
}
exports.verifyUser=async(req,res,next)=>{
try{
    const {email}=req.query;
    const {verifyCode}=req.body;
    const user =await User.findOne({email:email})
   if(user.code===verifyCode){
    user.isEmailVerified=true;
    user.code=null;
    user.save();
   }
   else{
    return res.json({message:"Code is not Correct"})
   }
   res.json({message:"User Verified Successfully"})
}
catch(err){
    console.log(err);
}
}

exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email:email})
        if(!user){
            return res.json({message:"User not found ",status:404,success:false})
        }
        const checkPassword=await bcrypt.compare(password,user.password);
        if(checkPassword){
            var token = jwt.sign({ id:user._id }, 'Abc 12345');
            return res.json({message:"User logged in Successfully",success:true,status:200,token:token})
        }
        else {
            return res.json ({message:"password is wrong",success:false,status:404})
        }
    }
    catch(err){
        console.log(err);
    }
}

// exports.index=async(req,res)=>{
//     try{
//         const {category}=req.query;
//         const query={};
//         if(category){
//             query.category=category;
//         }
//         const products=await Product.find(query)
//         res.json({status:200,message:"Product created Successfully",products})
//     }
//     catch(err){
//         console.log(err);
//     }
// }



exports.get=async(req,res)=>{
    try{
        const {id}=req.params;
        const user=await User.findOne({_id:id})
        if(!user){
            return res.json({status:404,success:false,message:"couldn't fing product"})
        }
        res.json({status:200,success:true,message:"Product fetched Successfully",user})
    }
    catch(err){
        console.log(err);
    }
}


// exports.destroy=async(req,res)=>{
//     try{
//         const {id}=req.params;
//         const product=await Product.findOneAndDelete({_id:id})
//         if(!product){
//             return res.json({status:400,success:false,message:"couldn't find product"})
//         }
//         res.json({status:200,message:"Product deleted Successfully"})
//     }
//     catch(err){
//         console.log(err);
//     }
// }



// exports.update=async(req,res)=>{
//     try{
//         const {id}=req.params;
//         const product=await Product.findOneAndUpdate({_id:id},req.body,{new:true})
//         if(!product){
//             return res.json({status:400,success:false,message:"couldn't find product"})
//         }
//         res.json({status:200,message:"Product Updated Successfully"})
//     }
//     catch(err){
//         console.log(err);
//     }
