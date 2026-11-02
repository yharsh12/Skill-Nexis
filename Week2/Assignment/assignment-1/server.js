const express=require("express");
const mongoose=require("mongoose");
const Todo=require("./models/Todo");
const app=express();
app.use(express.json());
app.post("/api/todos",async(req,res)=>{
  try{
    const {title}=req.body;
    if(!title) return res.status(400).json({error:"Title is required"});
    const todo=await Todo.create({title});
    res.status(201).json(todo);
  }
  catch(err){
    res.status(500).json({error:err.message});
  }
});
app.get("/api/todos",async(req,res)=>{
  try{
    const todos=await Todo.find();
    res.json(todos);
  }
  catch(err){
    res.status(500).json({error:err.message});
  }
});
app.put("/api/todos/:id",async(req,res)=>{
  try{
    const todo=await Todo.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(!todo) return res.status(404).json({error:"Task not found"});
    res.json(todo);
  }
  catch(err){
    res.status(500).json({error:err.message});
  }
});
app.delete("/api/todos/:id",async(req,res)=>{
  try{
    const todo=await Todo.findByIdAndDelete(req.params.id);
    if(!todo) return res.status(404).json({error:"Task not found"});
    res.json({message:"Task deleted successfully"});
  }
  catch(err){
    res.status(500).json({error:err.message});
  }
});
const PORT=process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI||"mongodb://127.0.0.1:27017/todolist").then(()=>app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))).catch((err)=>console.error(err));