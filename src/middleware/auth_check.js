const jwt=require('jsonwebtoken');

const authVerify=(req,res,next)=>{
    const token=req.header('auth-token');
    if(token==undefined||token==null)return res.status(400).json({success:false,message:"Authentication failed Token Not Found"});
    try {
        const verified=jwt.verify(token,process.env.token_private)
        console.log("what is verified: ",verified);
        req.user=verified;
        next();
    } catch (error) {
        res.status(500).json({success:false,message:"Authentication Error"});
    }
}

module.exports={
    authVerify
}