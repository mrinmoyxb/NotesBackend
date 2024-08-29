const express = require("express")
const router = express.Router()
const {handleSignUp, handleLogin} = require("../controller/userController")

router.route("/register").post(handleSignUp)
router.route("/login").post(handleLogin)

module.exports = router