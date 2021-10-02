//controller kısmında veri tabanı ve bilgi akışı gerçekleşir

const Todo=require("../models/todo");
const errorWrapper=require("./../helpers/error/errorWrapper")
// gettodo, addTodo
const addTodo =errorWrapper(  async(req,res,next)=>{

     const {content, start }= req.body;
     const todo= await Todo.create({
        content
     });
 
    

     res
     .status(200)
     .json({
         success : true,
         message : "todo eklendi",
         data : todo
     });
  
})
const gettodo= errorWrapper(async (req,res, next)=>{
  const {content, start}= req.body; 
  const todo= await Todo.find(content,start)
    return res.status(200).json({
      success:true, 
      data : todo
    });

  
});

const deleteTodo= errorWrapper(async(req,res,next)=>{
  const {_id}= req.params;
  const todok= await Todo.findById(_id);

  await todok.remove();

  return res.status(200).json({
    success:true, 
    data : {}
  })
})
module.exports= {
  gettodo, addTodo, deleteTodo
}