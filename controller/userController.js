const User = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

//* signup
async function handleSignUp(req, res){
    try{
        if(!req.body || !req.body.email || !req.body.password){
            return res.status(404).json({response: "enter all details"})
        }
        if(req.body.password.length < 6){
            return res.status(400).json({response: "length of password is less than 6"})
        }
        else{
            const checkExistingUser = await User.findOne({email: req.body.email})
            if(!checkExistingUser){
                const hashPassword = await bcrypt.hash(req.body.password, 10)
                const newUser = await User.createOne({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashPassword
                })
                return res.status(200).json({response: "Welcome, signed up successfully"})
            }
            else{
                return res.status(409).json({response: "email already exists"})
            }
        }
    }catch{
        return res.status(500).json({response: "internal server error"})
    }
}

//* login
async function handleLogin(req, res){
    try{
        if(!req.body || !req.body.email || !req.body.password){
            return res.status(400).json({response: "enter valid details"})
        }
        else{
            const existingUser = await User.findOne({email: req.body.email})
            if(existingUser){
                const checkPassword = await bcrypt.compare(req.body.password, existingUser.password)
                if(checkPassword){
                    const accessToken = jwt.sign({userId: existingUser._id, email: existingUser.email}, process.env.ACCESS_TOKEN, {expiresIn: "30s"})
                    const refreshToken = jwt.sign({userId: existingUser._id, email: existingUser.email}, process.env.REFRESH_TOKEN, {expiresIn: ""})
                    const updateUser = await User.findAndModify({_id: existingUser._id}, {$set: {refreshToken: refreshToken}})
                    return res.status(200).json({response: "Welcome", token: refreshToken})
                }
                else{
                    return res.status(400).json({response: "enter valid password"})
                }
            }else{
                return res.status(404).json({response: "email doesn't exist"})
            }
        }
    }catch(error){
        return res.status(500).json({response: "internal server error"})
    }
}

module.exports = {
    handleSignUp,
    handleLogin
}