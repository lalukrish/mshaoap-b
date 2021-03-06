const mongoose = require('mongoose')
const User = mongoose.model("User");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

exports.postSignup = ("/signup",(req,res,next)=>{
    const {name,email,password} = req.body
    if(!name || !email || !password){
        return res.status(422).json({error:"please fill all the fields"})
    }
    User.findOne({email:email}).then(savedUser=>{
        if(savedUser){
            return res.status(422).json({error:"user already exist with this email"})

        }
        bcrypt.hash(password,12).then(hasedPassword=>{
            const user = new User({
                name,
                email,
                password:hasedPassword,
               
            })
            user.save()
            .then(user=>{
                res.json({message:"saved succesfully"})
                console.log(user)
            }).catch(err=>{console.log(err)})
        })
    })
})

exports.postSignin=("/signin",(req,res,next)=>{
    const {email,password}=req.body
    if(!email || !password){
         return res.status(422).json({error:"please fill all the fields"})
    }
    User.findOne({email:email}).then(savedUser =>{
        if(!savedUser){
         return   res.status(422).json({error:"invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password).then(doMatch=>{
            if(doMatch){
                res.json({message:"successfully signed in"})
           
            const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
            const {_id,name,email} = savedUser
            res.json({token,user:{_id,name,email}})
        }   else{
                return res.status(422).json({error:"invalid email or password"})
            }
        }).catch(err=>{console.log(err)})
    })
})
