const express=require("express");
const todos=require("./todos");
const auth=require("./Auth");
const user=require("./user");
const router=express.Router();


router.use("/auth",auth);
router.use("/todos",todos);
router.use("/user",user);

//each router should be here

module.exports=router;