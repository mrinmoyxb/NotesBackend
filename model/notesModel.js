const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    noteId: {
        type: Number,
        required: true
    },
    noteheading: {
        type: String,
        required: true
    },
    notebody: {
        type: String
    }
}, {timestamp: true})

const Note = mongoose.model("note", noteSchema)

module.exports = Note