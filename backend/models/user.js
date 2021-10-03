//kullanıcı sadece email i ilr giricek
//email verify lazım

const mongoose = require("mongoose")
const Schema= mongoose.Schema;
const Todo=require("./todo")
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const userSchema= new Schema({
      email :{
          type: String,
          required: true,
          unique: true,
          match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"
          ]
      }, 
      role : {
        type : String,
        enum : ["user","admin"],
        default : "user"
    },
    password : {
        type : String,
        minlength : 6,
        required : [true,"Please provide a password"],
        select : false
    }, profile_image : {
        type : String,
        default : "default.jpg"
    },

    resetPasswordToken : {
        type:String
    },
    resetPasswordExpire: {
        type : Date
    }
       
}); 

//  userSchema.methods.getTokenFromUserModel=function(){
//      const {JWT_SECRET_KEY,JWT_EXPIRE }=process.env;
//      const payload={
         
//          email=this.email
//      }
//      const token=jwt.sign(payload,JWT_SECRET_KEY,{expiresIn : JWT_EXPIRE}  )
//      return token; 
//  } ;


 userSchema.methods.getResetPasswordToken= function(){
    const randomHexString = crypto.randomBytes(15).toString("hex");

    const resetPasswordToken = crypto
    .createHash("SHA256")
    .update(randomHexString)
    .digest("hex");

    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpire = Date.now() + parseInt(process.env.RESET_PASSWORD_EXPIRE)

    
    return resetPasswordToken;
 }


 userSchema.pre("save",function (next) {
    

    if (!this.isModified("password")){
        next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err);
            this.password = hash;
            next();
        });
    });
});

userSchema.post("remove",async function(next){
    const result = await Todo.deleteMany({
        user : this._id
    });
});module.exports  = mongoose.model("User",userSchema);