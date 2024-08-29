const express = require("express")
const {handleLogOut} = require("../controller/logOutController")
const router = express.Router()

router.route("/").get(handleLogOut)

module.exports = router