const jwt = require("jsonwebtoken");
const errorWrapper = require("../../helpers/error/errorWrapper");
const User = require("../../models/user");

const CustomError = require("../../helpers/error/customError");

const getAccessRoute= errorWrapper(async(req,res,next)=>{
    if(!isTokenIncluded(req)){
        return next(new CustomError("you are not to authorization to access this page",403) )

    }

    const accessToken= getAccessTokenFromHeader(req);
    //control if token is valid

    jwt.verify(accessToken,process.env.JWT_SECRET_KEY,(err, decodedToken)=>{

    })
})

const getAccessTokenFromHeader = (req) => {

    const authorization = req.headers.authorization;
    
    const accessToken = authorization.split(" ")[1];
    return accessToken;

}
const getAdminAccess = errorWrapper(async(req,res,next) => {
    
    const user = await User.findById(req.user.id);

    if (user.role !== "admin") {
        return next(new CustomError("Only admins can access this route",403));

    }
    return next();

});
const isTokenIncluded = (req) => {
    return req.headers.authorization && req.headers.authorization.startsWith("Bearer:")
}

module.exports={
    getAccessRoute,getAdminAccess
};