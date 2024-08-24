const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    noteId: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    body: {
        type: String
    }
}, {timestamp: true})

const Note = mongoose.model("note", noteSchema)

module.exports = Note