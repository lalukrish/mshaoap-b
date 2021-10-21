const express = require('express');
const app = express();
require("dotenv").config();

app.use("/",(req,res,next)=>{
    console.log("hello")
    next();
})

app.use("/get",(req,res,next)=>{
    console.log("hi")
})

app.listen(process.env.PORT || 8100 );