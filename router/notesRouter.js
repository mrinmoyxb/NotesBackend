const express = require("express")
const {handleGetAllNotes, handlePostAllNotes} = require("../controller/notesController")

const router = express.Router()

router.route("/allnotes").get(handleGetAllNotes)
router.route("/insertnotes").post(handlePostAllNotes)

module.exports = router