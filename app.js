const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGOURI } = require('./keys');
require("dotenv").config();


require('./models/user')

app.use(express.json());
app.use(require('./routes/admin'));

mongoose.connect(MONGOURI)
mongoose.connection.on('connected',()=>{
    console.log('mongoose connected...!');
})

mongoose.connection.on('error',(err)=>{
    console.log(err);
})


app.listen(process.env.PORT || 8100 );