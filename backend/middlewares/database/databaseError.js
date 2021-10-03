//HERE İS CONTROL DATABASE
const User=require( "../../models/user");
const ErrorWrapper=require("./../../helpers/error/errorWrapper");
const customError=require("../../helpers/error/customError");
const checkUserExist= ErrorWrapper(async(req,res,next)=>{
   const {id}=req.params; 
   const user= await User.findById(id); 
        if(!user){
            return next(new customError("user is not found") )
        }
        next();

}) 


module.exports={
    checkUserExist 
}


