const express = require("express");
const {gettodo, addTodo}= require("../controllers/todo"); 

const router=express.Router();

router.get("/", (req,res)=>{
    res.json({
        success:true
    })
})
router.get("/getTodo", gettodo);
router.post("/addTodo", addTodo);

module.exports=router