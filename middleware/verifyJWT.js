const jwt = require("jsonwebtoken")
require("dotenv").config()

const verifyJwtToken = (req, res, next) => {
    try{
        const authHeader = req.headers["authorization"]
        if(!authHeader){
            return res.status(404).json({response: "auth header missing"})
        }else{
            const token = authHeader.split(' ')[1]
            
            //* token verification
            jwt.verify(token, process.env.ACCESS_TOKEN,
                (err, decoded) =>{
                    if(err){
                        return res.status(403).json({response: "invalid token"})
                    }
                    console.log({email: decoded.email})
                    next();
            })
        }
    }catch(error){
        return res.status(200).json({response: "internal server error"})
    }
}

module.exports = {
    verifyJwtToken
}