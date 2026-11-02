const express=require("express");
const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const User=require("./models/User");
const Note=require("./models/Note");
const authMiddleware=require("./middleware/auth");
const app=express();
app.use(express.json());
const JWT_SECRET=process.env.JWT_SECRET || "notessecretkey";
app.post("/api/register",async(req,res)=>{
  try{
    const{email,password}=req.body;
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const user=await User.create({email,password:hashedPassword});
    res.status(201).json({message:"User registered",userId:user._id});
  }
  catch(err){
    res.status(500).json({error:err.message});
  }
});
app.post("/api/login",async(req,res)=>{
  try{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user || !(await bcrypt.compare(password,user.password))){
      return res.status(400).json({error:"Invalid credentials"});
    }
    const token=jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:"2h"});
    res.json({token});
  }
  catch(err){
    res.status(500).json({error:err.message});
  }
});
app.post("/api/notes",authMiddleware,async(req,res)=>{
  try{
    const{title,content}=req.body;
    const note=await Note.create({userId:req.user.userId,title,content});
    res.status(201).json(note);
  }
  catch(err){
    res.status(500).json({error:err.message});
  }
});
app.get("/api/notes",authMiddleware,async(req,res)=>{
  try{
    const notes=await Note.find({userId:req.user.userId});
    res.json(notes);
  }
  catch(err){
    res.status(500).json({error:err.message});
  }
});
app.put("/api/notes/:id",authMiddleware,async(req,res)=>{
  try{
    const note=await Note.findOneAndUpdate(
      {_id:req.params.id,userId:req.user.userId},
      req.body,
      {new:true}
    );
    if(!note) return res.status(404).json({error:"Note not found"});
    res.json(note);
  }
  catch(err){
    res.status(500).json({error:err.message});
  }
});
app.delete("/api/notes/:id",authMiddleware,async(req,res)=>{
  try{
    const note=await Note.findOneAndDelete({_id:req.params.id,userId:req.user.userId});
    if(!note) return res.status(404).json({error:"Note not found"});
    res.json({message:"Note deleted successfully"});
  }
  catch(err){
    res.status(500).json({error:err.message});
  }
});
const PORT=process.env.PORT||5000;
mongoose.connect(process.env.MONGO_URI||"mongodb://127.0.0.1:27017/notes_db").then(()=>app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))).catch((err)=>console.error(err));