const express = require("express");
const {gettodo, addTodo, deleteTodo}= require("../controllers/todo"); 

const router=express.Router();

router.get("/", (req,res)=>{
    res.json({
        success:true
    })
})
router.get("/getTodo", gettodo);
router.post("/addTodo", addTodo);
router.delete("/deletetodo", deleteTodo);

module.exports=router