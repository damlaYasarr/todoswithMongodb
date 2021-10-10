const { register,getLOggedINUser, login,logout,imageUPload, forgotPassword,resetPassword}=require("../controllers/auth");
const express = require("express");
const router=express.Router();
const {photoUpload}=require("../helpers/libraries/multer")
const {getAccessToRoute}=require("../middlewares/authorization/auth");

router.post("/register", register);
router.get("/getLoggedInUser", getLOggedINUser);
router.post("/login",getAccessToRoute, login);

router.put("/resetpassword",getAccessToRoute, resetPassword);

router.get("/logout", logout);

router.put("/upload",photoUpload.single('image'), imageUPload)
router.post("/forgotpassword",forgotPassword);




module.exports = router;