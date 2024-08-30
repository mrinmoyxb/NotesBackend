const passport = require("passport")
const User = require("../model/userModel")
const bcrypt = require("bcrypt")
const {Strategy} = require("passport-local")

passport.use(new Strategy({usernameField: "email"}, async (username, password, done)=>{
    try{
        const existingUser = await User.findOne({email: username})
        if(!existingUser){
            return done(null, false, {response: "invalid email"})
        }
        else{
            const checkPassword = await bcrypt.compare(password, existingUser.password);
            if(!checkPassword){
                return done(null, false, {response: "invalid password"})
            }
            else{
                return done(null, existingUser, {response: "validated"})
            }
        }
    }catch(error){
        done(error, null)
    }
}))