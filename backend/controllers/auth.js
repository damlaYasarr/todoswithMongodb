//login logout 

const User = require("../models/user");
const errorWrapper = require("../helpers/error/errorWrapper");
const CustomError = require("../helpers/error/customError");
const bcrypt = require("bcryptjs");


const register = errorWrapper(async (req, res, next) => {
    const { email, password, role } = req.body;

    const user = await User.create({
        email, password, role
    });


    res.status(200).json({
        success: true,
        data: user
    })

    sendTokenToClient(user, res, 200);


})
const login = errorWrapper(async (req, res, next) => {
    const { email, password } = req.body;

    if (!validateUserInput(email, password)) {
        return next(new CustomError("please check your information"));

    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !checkPassword(password, user.password)) {

        return next(new CustomError("Please check your credentials", 404));
    }

    sendTokenToClient(user, res, 200);
});

const getLOggedINUser = errorWrapper(async (req, res, next) => {

    res.status(200).json({
        success: true,
        data: req.user
    });
});

const logout = errorWrapper(async (req, res, next) => {
    const { JWT_COOKIE_EXPIRE, NODE_ENV } = process.env;

    //send to client with res
    return res.status(200).cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: NODE_ENV === "development" ? false : true
    })
        .json({
            success: true,
            message: "logout successfully"
        });
})
const imageUPload = errorWrapper(async (req, res, next) => {
    // const user = await User.findByIdAndUpdate(req.user.id, {
    //     "profile_image": req.savedImage
    // }, {
    //     new: true,
    //     runValidators: true
    // });
    // res.status(200).json({
    //     success: true,
    //     message: "photo upload successful"
    // })
    console.log(req.file);
})
const forgotPassword = errorWrapper(async (req, res, next) => {

    const resetEmail = req.body.email;
    const user = await User.findOne({ email: resetEmail });

    if (!user) {
        return next(new CustomError("User Not Found With That Email", 400));

    }
    const resetPasswordToken = user.getResetPasswordToken();

    await user.save();


    const resetPasswordUrl = `http://localhost:5000/api/v1/auth/resetPassword?resetPasswordToken=${resetPasswordToken}`;


    const emailTemplate = `
                <h3>Reset Your Password</h3>
                <p>This <a href = '${resetPasswordUrl}' target = '_blank'>link</a>  will expire in 1 hour</p>
                
            `;
    try {
        await sendMail({
            from: process.env.SMTP_EMAIL,
            to: resetEmail,
            subject: "Reset Password Token",
            html: emailTemplate
        });
        return res.status(200)
            .json({
                success: true,
                message: "Email Sent",
                data: user
            });
    }
    catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        user.save();

        return next(new CustomError("Email Could Not Be Sent", 500));
    }
});

const resetPassword = errorWrapper(async (req, res, next) => {

    const { resetPasswordToken } = req.query;
    const { password } = req.body;

    if (!resetPasswordToken) {
        return next(new CustomError("Please provide a valid token", 400));

    }
    let user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });
    if (!user) {
        return next(new CustomError("Invalid Token or Session Expired", 404));
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    user = await user.save();

    sendTokenToClient(user, res, 200);

});
const validateUserInput = (email, password) => email && password;

const checkPassword = (password, hashedPassword) => {

    return bcrypt.compareSync(password, hashedPassword);

}


const sendTokenToClient = (user, res, status) => {
    //get token from user model
    const token = user.getTokenFromUserModel();
    const { JWT_COOKIE_EXPIRE, NODE_ENV } = process.env;
    //send to client with res

    return res.status(status).cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + parseInt(JWT_COOKIE_EXPIRE) * 1000 * 60),
        secure: NODE_ENV === "development" ? false : true
    })
        .json({
            success: true,
            token,
            data: {
                email: user.email,
                password: user.password,
                role: user.role
            }
        });
}
module.exports = {
    register, getLOggedINUser, login, logout, imageUPload, forgotPassword, resetPassword
}

