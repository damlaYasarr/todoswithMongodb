const express = require("express");
const {getAlluser, deleteUser}=require("../controllers/admin"); 
const {checkUserExist }=require("../middlewares/database/databaseError")
const {getAccessRoute,getAdminAccess}=require("../middlewares/authorization/auth");
const {register}=require("./../controllers/auth")
const router=express.Router();
 

 router.post("/register", register); 
 //router.post("/login", login); s
//router.use([getAccessRoute,getAdminAccess]);
router.get("/getAllUser",checkUserExist, getAlluser);
router.delete("/deleteUser/:id", checkUserExist, deleteUser); 




module.exports=router
