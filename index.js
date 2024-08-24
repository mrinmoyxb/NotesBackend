const express = require("express")
const {connectMongoDB} = require("./connection")
const app = express()
require("dotenv").config()

connectMongoDB()
.then(()=>{
    console.log("MongoDB connected")
})
.catch((error)=>{
    console.log("Sorry couldn't connect to MongoDB, ",error)
})

app.listen(process.env.PORT, ()=>{
    console.log("Server is running on PORT ", process.env.PORT)
})