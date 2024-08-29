const express = require("express")
const {handleGetAllNotes, handlePostAllNotes} = require("../controller/notesController")
const {verifyJwtToken} = require("../middleware/verifyJWT")

const router = express.Router()

router.route("/allnotes").get(verifyJwtToken, handleGetAllNotes)
//router.route("/allnotes").get(handleGetAllNotes)
router.route("/insertnotes").post(handlePostAllNotes)

module.exports = router