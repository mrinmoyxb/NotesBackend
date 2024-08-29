const express = require("express")
const User = require("../model/userModel")

async function handleLogOut(req, res){
    //* delete access token in frontend, and deleting refresh token in backend

    try{
        const cookies = req.cookies
        if(!cookies?.jwt_token){
            return res.status(200).json({response: "success/no content"})
        }
        else{
            const refreshToken = cookies.jwt_token
            const existingUser = await User.findOne({refreshToken: refreshToken})
            if(existingUser){
                const updateUser = await User.findOneAndUpdate({_id: existingUser._id}, {$set: {refreshToken: ""}})
                res.clearCookie("jwt_token", {httpOnly: true, secure: true})
                return res.status(200).json({response: "success/no content"})
            }else{
                res.clearCookie("jwt_token", {httpOnly: true, secure: true})
                return res.status(200).json({response: "success/no content"})
            }
        }
    }catch(error){
        return res.status(500).json({response: "internal server error"})
    }
}

module.exports = {
    handleLogOut
}