const express = require("express")
const {UserModel} = require("../model/users.model")
const bcrypt = require("bcrypt");

const UserRoutes = express.Router()

UserRoutes.post("/register",async(req,res)=>{
    const {name,email,password,dob,bio} = req.body;
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res
                .status(500)
                .json({
                    "msg":err.message
                })
            }
            else{
                let user = new UserModel({name,email,password:hash,dob,bio})
                await user.save()
                res
                .status(201)
                .json({
                    "msg": "new user has been registered"
                })

            }
        })

        
    } catch (error) {
        res
        .status(500)
        .json({
            "msg": error.message
        })
    }
})

UserRoutes.get("/users",async(req,res)=>{
    try {
        let users = await UserModel.find()
        res
        .status(200)
        .json(users)
        
    } catch (error) {
        res
        .status(500)
        .json({
            "msg":error.message
        })
    }
})


UserRoutes.get("/users/:id/friends",async(req,res)=>{
    let {id} = req.params.id;
    try {
        let user = await UserModel.findById(id).populate("friends")
        res.status(200).json(user)

        
    } catch (error) {
        res
        .status(500)
        .json({
            "msg":error.message
        })
    }
})

UserRoutes.post("/users/:id/friends",async(req,res)=>{
    
    try {
        let user = await UserModel.findById(req.params.id)
        console.log(user)
        let friend = await UserModel.findById(req.body.friendID)
        console.log(friend)

        user.friendRequests.push(friend._id)
        friend.friendRequests.push(user._id)

        await user.save();
        await friend.save();

        res.status(201).json(friend)
        
        
    } catch (error) {
        res
        .status(500)
        .json({
            "msg":error.message
        })
    }
})

UserRoutes.patch("/users/:id/friends/:friendId",async(req,res)=>{
    try {
        let user = await UserModel.findById(req.params.id)
        let friend = await UserModel.findById(req.params.friendId)

        user.friendRequests.pull(friend._id)
        friend.friendRequests.pull(user._id)
        console.log(req.body.accept)
        if(req.body.accept){
            user.friends.push(friend._id)
            friend.friends.push(user._id)  
            

            res.json({ message: "Friend request accepted successfully" });
        }
        else{
            res
            .json({ message: "Friend request rejected successfully" });
        }

        await user.save()
        await friend.save()
        
    } catch (error) {
        res
        .status(500)
        .json({
            "msg":error.message
        })
    }
})


module.exports = {UserRoutes}