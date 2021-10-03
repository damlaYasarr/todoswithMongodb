const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const todoSchema= new Schema({
    content :[{
        type: String, 
        required: [true, "please enter a todo"],
        unique: true
    }],
    start :{
        type: Date,
        default: Date.now,
        required: 'Must have end date - default value is the created date + 1day'
    },
    
     user :{
        type : mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    }

})


 module.exports= mongoose.model("todo",todoSchema );