const User=require("../models/user");

const errorWrapper=require("../helpers/error/errorWrapper");


//adduser, deleteuser, getAlluser, 

const getAlluser= errorWrapper(async(req,res,next)=>{
 return res.status(200).json(res.advanceQueryResults);
})

const deleteUser=errorWrapper(async(req,res,next)=>{
    const {id}=req.params; 
    const user= await User.findById(id); 

    await user.remove(); 
    return res.status(200).json({
        success:true,
        data:{}
    });
});

module.exports={
    getAlluser, deleteUser
}
