const express = require("express")
const {connectMongoDBAtlas} = require("./connection")
const notesRouter = require("./router/notesRouter")
const authRouter  = require("./router/userRouter")
require("dotenv").config()

const app = express()

//* database
connectMongoDBAtlas()
.then(()=>{
    console.log("Connected to MongoDB Atlas")
})
.catch(()=>{
    console.log("Couldn't connect to MongoDB Atlas")
})

//* middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get("/",(req, res)=>{
    return res.json({r: "homepage"})
})

app.use("/auth", authRouter)
app.use("/api", notesRouter)

app.listen(process.env.PORT, ()=>{
    console.log("Server is running on PORT ", process.env.PORT)
})