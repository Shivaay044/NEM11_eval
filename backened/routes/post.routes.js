const express = require("express")
const postModel = require("../Model/post.model")
const Authentication = require("../Middlewares/Authentication.middleware")
const postRouter = express.Router()


postRouter.get("/",async(req,res)=>{
    const {device,device1,device2} = req.query
    let post
    try {
        if(Object.keys(req.query).length===0){
            post =  await postModel.find()
           
        }else{
            post =  await postModel.find({device:[device,device1, device2]})
         
        }
        res.status(200).send(post)
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})


postRouter.post("/add",async(req,res)=>{
    try {
        const post = new postModel(req.body)
        await post.save()
        res.status(200).send({"msg":'post added successfully'})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})


postRouter.put("/update/:id",async(req,res)=>{
    const {id} = req.params
    try {
        const post = await postModel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).send({"msg":'post updated successfully'})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})


postRouter.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params
    try {
        const post = await postModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":'post deleted successfully'})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports = postRouter