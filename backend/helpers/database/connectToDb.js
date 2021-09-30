const mongoose=require('mongoose');

const connectDatabase = ()=>{
    mongoose.connect(process.env.MONGODB_URL, 
        {
            useNewUrlParser: true
        })
        .then(()=>{
            console.log("mongodb successfulyyy CONNECTED!!")
        })
        .catch(err=>{
            console.log(err);
        })
}

module.exports={connectDatabase};