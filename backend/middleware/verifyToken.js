import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();



export const verifyToken=async(req,res,next)=>{
    const token=req.cookies.accessToken;
    if(!token){
        return res.status(401).json({message:"Token not found"});
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET);
        if(!decoded.userId){
            return res.status(401).json({message:"Invalid token"});
        }
        req.userId=decoded.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({message:"Invalid token"});
    }
}