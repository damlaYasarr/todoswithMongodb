//login logout 

const User = require("../models/user");
const errorWrapper = require("../helpers/error/errorWrapper");
const CustomError = require("../helpers/error/customError");
//const bcrypt = require("bcryptjs");


const register = errorWrapper(async(req,res,next)=>{
    const {email, password,role}=req.body;
 
    const user= await User.create({
        email, password
    }); 

    res.status(200).json({
        success:true, 
        data: user
    })

  //token gönderilmeli


}) 
    // const login =errorWrapper(async(req,res,next)=>{
    //    const {email, password}=req.body; 

    //    if(!validateUserInput(email,password)){
    //        return next(new CustomError("please check your information"));

    //    }

    //    const user= await User.findOne({email}).select("+password"); 
    //    if ( !user || !checkPassword(password,user.password)) {
        
    //     return next(new CustomError("Please check your credentials",404));
    // }


    // })


    const validateUserInput = (email,password) => email && password;
    const checkPassword = (password,hashedPassword) => {

        return bcrypt.compareSync(password, hashedPassword);
    
    }

    module.exports={
        register
    }
    
    