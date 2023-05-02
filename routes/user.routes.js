const express = require("express")
const userModel = require("../Model/user.model")
const userRouter = express.Router()
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')


userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password} = req.body
    try {
        bcrypt.hash(password, 5,  async(err, hash)=>{
            const newUser = new userModel({name,email,gender,password:hash})
            await newUser.save()
        });   
        res.status(200).send({"msg":"User Registered"})
    } catch (error) {
        res.status(400).send({"msg": error.message})
    }
})



userRouter.post("/login",async(req,res)=>{
    const {name,email,gender,password} = req.body
    try {
        const user = await userModel.find({email})
        if(user.length>0){
        bcrypt.compare(password, user[0].password, async(err, result) => {
            result ? res.status(200).send({"msg":"Login Successfully","token":jwt.sign({ "userID": user[0].id}, 'post')}) : res.status(400).send({"msg":"Wrong Credentials"});
        })
        }else{
            res.status(400).send({"msg":"User doesn't exist"}) 
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})



module.exports = userRouter