const express=require("express");
const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const User=require("./models/User");
const app=express();
app.use(express.json());
const JWT_SECRET=process.env.JWT_SECRET || "jwt_secretkey123";
app.post("/api/auth/register",async(req,res)=>{
  try{
    const {username,email,password}=req.body;
    if(!username||!email||!password) return res.status(400).json({error:"All fields are required"});
    const existingUser=await User.findOne({email});
    if(existingUser) return res.status(400).json({error:"Email already registered"});
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const user=await User.create({username,email,password:hashedPassword});
    res.status(201).json({message:"User registered successfully",userId:user._id});
  }
  catch(err){
    res.status(500).json({error:err.message});
  }
});
app.post("/api/auth/login",async(req,res)=>{
  try{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user) return res.status(400).json({error:"Invalid credentials"});
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch) return res.status(400).json({error:"Invalid credentials"});
    const token=jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:"1d"});
    res.json({message:"Login successful",token});
  }
  catch(err){
    res.status(500).json({error:err.message});
  }
});
const PORT=process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI||"mongodb://127.0.0.1:27017/auth_db").then(()=>app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))).catch((err)=>console.error(err));