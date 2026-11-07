const express=require('express');
const router=express.Router();
const Todo=require('../models/Todo');
const protect=require('../middleware/auth');
router.post('/',protect,async(req,res)=>{
    try{
        const todo=await Todo.create({title:req.body.title,user:req.user.id});
        res.status(201).json(todo);
    }
    catch(err){
        res.status(500).json({err:err.message});
    }
});
router.get('/',protect,async(req,res)=>{
    try{
        const todos=await Todo.find({user:req.user.id}).sort({createdAt:-1});
        res.json(todos);
    }
    catch(err){
        res.status(500).json({err:err.message});
    }
});
router.put('/:id',protect,async(req,res)=>{
    try{
        const todo=await Todo.findOneAndUpdate({_id:req.params.id,user:req.user.id},req.body,{new:true});
        res.json(todo);
    }
    catch(err){
        res.status(500).json({err:err.message});
    }
});
router.delete('/:id',protect,async(req,res)=>{
    try{
        await Todo.findOneAndDelete({_id:req.params.id,user:req.user.id});
        res.json({msg:'deleted'});
    }
    catch(err){
        res.status(500).json({err:err.message});
    }
});
module.exports=router;