const express = require("express")
const {connectMongoDBAtlas} = require("./connection")

const notesRouter = require("./router/notesRouter")
const authRouter  = require("./router/authRouter")
const refreshTokenRouter = require("./router/refreshRoute")
const logoutTokenRouter = require("./router/logOutRouter")

const {verifyJwtToken} = require("./middleware/verifyJWT")
const cookieParser = require("cookie-parser")
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
app.use(cookieParser())


//! api endpoints
app.get("/",(req, res)=>{
    return res.json({r: "homepage"})
})
app.use("/auth", authRouter)
app.use("/refresh", refreshTokenRouter)
app.use("/logout", logoutTokenRouter)


//* must satisfy the token to access notes
app.use(verifyJwtToken)
app.use("/api", notesRouter)

app.listen(process.env.PORT, ()=>{
    console.log("Server is running on PORT ", process.env.PORT)
})