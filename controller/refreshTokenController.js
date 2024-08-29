const express =  require("express")
const jwt = require("jsonwebtoken")
const User = require("../model/userModel")
require("dotenv").config()

//* it provides new access token after verifying the refresh token

async function handleRefreshToken(req, res){
    try{
        const cookies = req.cookies
        if(!cookies?.jwt_token){
            return res.status(401).json({response: "cookies not found"})
        }
        else{
            const refreshToken = cookies.jwt_token
            const existingUser = await User.findOne({refreshToken: refreshToken})
            if(existingUser){
                jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded)=>{
                    if(err || existingUser._id != decoded.userId){
                        return res.status(404).json({response: "invalidate refresh token"})
                    }
                    else{
                        const newAccessToken = jwt.sign({userId: decoded.userId, email: decoded.email}, process.env.ACCESS_TOKEN, {expiresIn: '30s'})
                        return res.status(200).json({response: "new token", access_token: newAccessToken})
                    }
                }
                )
            }
        }
    }catch(error){
        return res.status(500).json({response: "internal server error"})
    }
}

module.exports = {
    handleRefreshToken
}