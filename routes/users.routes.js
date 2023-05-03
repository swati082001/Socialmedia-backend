const express = require("express")
const {UserModel} = require("../model/users.model")
const bcrypt = require("bcrypt");

const UserRoutes = express.Router()

UserRoutes.post("/register",async(req,res)=>{
    const {name,email,password,dob,bio} = req.body;
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.send({
                    "msg":err.message
                })
            }
            else{
                let user = new UserModel({name,email,password:hash,dob,bio})
                await user.save()
                res.send({
                    "msg": "new user has been registered"
                })

            }
        })

        
    } catch (error) {
        res.send({
            "msg": error.message
        })
    }
})

UserRoutes.get("/user",async(req,res)=>{
    try {
        let users = await UserModel.find()
        res.send(users)
        
    } catch (error) {
        res.send({
            "msg":error.message
        })
    }
})

module.exports = {UserRoutes}