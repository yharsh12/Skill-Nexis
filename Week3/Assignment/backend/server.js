const express=require('express');
const cors=require('cors');
require('dotenv').config();
const connectDB=require('./db');
const userRoutes=require('./routes/userRoutes');
const todoRoutes=require('./routes/todoRoutes');
const upload=require('./middleware/upload');
const app=express();
app.use(express.json());
app.use(cors());
app.use('/uploads',express.static('uploads'));
connectDB();
app.use('/api/users',userRoutes);
app.use('/api/todos',todoRoutes);
app.post('/api/upload',upload.single('image'),(req,res)=>{
    if(!req.file){
        return res.status(400).json({msg:'no file'});
    }
    res.json({imageUrl:'/uploads/'+req.file.filename});
});
app.listen(5000,()=>console.log('running on 5000'));