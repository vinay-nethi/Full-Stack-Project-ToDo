const jwt=require("jsonwebtoken")
module.exports=async(req,res,next)=>{
    try{
        const token=await req.header("a-token")
        if(!token){
           return res.status(400).json({message:"token not found"})
        }else{
            const decode=jwt.verify(token,"jwtoken")
            console.log("decode",decode)
            req.user=decode.user
            next()

        }
    }catch(e){
        return res.status(500).json({message:"internal server error"})
    }
}
