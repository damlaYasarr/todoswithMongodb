//burda backend çalıştırıyoruz. 

const express= require("express");
const {connectDatabase}=require('./backend/helpers/database/connectToDb');//fonksiyonu çektik
const dotenv=require('dotenv');

const routes=require("./backend/routes")
const path= require('path');
const cors = require('cors')


dotenv.config({
    path: "./backend/config/config.env"
})

const app=express();//yönlendirmelerimizde express kullanılırz
app.use(express.json());
app.use(cors())//axios için kullandık, araştır
const PORT=process.env.PORT;
connectDatabase();


app.use("/todos", routes);





app.listen(PORT, ()=>{
    console.log("halloooowwww");
});