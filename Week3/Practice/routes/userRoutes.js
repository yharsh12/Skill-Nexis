const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const User=require('../models/User');
const protect=require('../middleware/auth');
router.post('/register',async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        const exists=await User.findOne({email});
        if(exists) return res.status(400).json({msg:'email exists'});
        const user=await User.create({name,email,password});
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.status(201).json({user,token});
    }
    catch(err){
        res.status(500).json({err:err.message});
    }
});
router.post('/login',async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(!user||!(await bcrypt.compare(password,user.password))){
            return res.status(401).json({msg:'invalid credentials'});
    }
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
    res.json({user,token});
    }
    catch(err){
        res.status(500).json({err:err.message});
    }
    });
router.get('/profile',protect,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch(err){
        res.status(500).json({err:err.message});
    }
});
router.put('/profile',protect,async(req,res)=>{
    try{
        const user=await User.findByIdAndUpdate(req.user.id,req.body,{new:true}).select('-password');
        res.json(user);
    }
    catch(err){
        res.status(500).json({err:err.message});
    }
});
router.delete('/profile',protect,async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.user.id);
        res.json({msg:'deleted'});
    }
    catch(err){
        res.status(500).json({err:err.message});
    }
});
module.exports=router;