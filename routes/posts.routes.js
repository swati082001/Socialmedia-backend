const express = require("express")
const {PostModel} = require("../model/posts.model")
const {UserModel} = require("../model/users.model")

const PostRoutes = express.Router()

PostRoutes.get("/posts",async(req,res)=>{
    try {
        let posts = await PostModel.find()
        .populate("user")
        .populate("likes")
        .populate({
            path:"comments",
            populate:{
                path:"user",
                model:"user"
            }
        })
        
        res.status(200).json(posts)
        
    } catch (error) {
        res.status(500).json({
            "message":error.message
        })
    }
})

PostRoutes.post("/posts",async(req,res)=>{
    
    try {
        let posts = new PostModel(req.body)
        await posts.save()

        let user = await UserModel.findById(req.body.user)
        console.log(user)
        user.posts.push(posts._id)

        await user.save()

        res.status(200).json({
            msg:"A new post has been added"
        })
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})

PostRoutes.patch("/posts/:id",async(req,res)=>{
    
    let payload = req.body;
    try {
         await PostModel.findByIdAndUpdate({_id:req.params.id},payload);
         res.status(201).json({
            msg:"Details have been updated "
         })

        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})

PostRoutes.delete("/posts/:id",async(req,res)=>{
    try {
        await PostModel.findByIdAndDelete({_id:req.params.id})
        res.status(201).json({
            msg:"Details have been successfully deleted"
         })
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})

PostRoutes.post("/posts/:id/like",async(req,res)=>{
    try {
        let postToLike = await PostModel.findById(req.params.id) //post ka id
        let me = await UserModel.findById(req.body.UserId); //user ka id

        postToLike.likes.push(me._id)

        await postToLike.save()

        res.status(201).json(postToLike);
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})

PostRoutes.get("/posts/:id",async(req,res)=>{
    try {
        let posts = await PostModel.findById(req.params.id) .populate("user")
        .populate({
          path: "comments",
          populate: {
            path: "user",
            model: "user",
          },
        });
  

        res.status(201).json(posts);
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})

module.exports = {PostRoutes}

