const express = require("express")
const app = express()
const {connection} = require("./configs/db")
const {UserRoutes} = require("./routes/users.routes")
const cors = require("cors")
require("dotenv").config()

app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("This is social media app backend")
})

app.use("/users",UserRoutes);


app.listen(process.env.PORT,async()=>{
    try {
        await connection;
        console.log("Connected to db")
    
    } catch (error) {
        console.log(error)
    }
    console.log(`The server is running on port ${process.env.PORT}`)
})