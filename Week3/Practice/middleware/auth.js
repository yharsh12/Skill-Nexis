const jwt=require('jsonwebtoken');
const protect=(req,res,next)=>{
const h=req.headers.authorization;
if(!h || !h.startsWith('Bearer ')){
    return res.status(401).json({msg:'unauthorized'});
}
try{
    const token=h.split(' ')[1];
    req.user=jwt.verify(token,process.env.JWT_SECRET);
    next();
}
catch(err){
    return res.status(401).json({msg:'invalid token'});
}
};
module.exports=protect;