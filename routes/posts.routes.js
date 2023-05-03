const express = require("express")
const {PostModel} = require("../model/posts.model")

const PostRoutes = express.Router()

PostRoutes.get("/posts",async(req,res)=>{
    try {
        let posts = await PostModel.find()
        .populate("user")
        .populate("likes")
        
        res.status(200).json(posts)
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})

PostRoutes.post("/posts",async(req,res)=>{
    
    try {
        let posts = new PostModel(req.body)
        await posts.save()

        res.status(200).json({
            msg:"A new post has been added"
        })
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})

module.exports = {PostRoutes}

