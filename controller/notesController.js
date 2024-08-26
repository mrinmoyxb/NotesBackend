const express = require("express")
const Note = require("../model/notesModel")

//* GET notes
async function handleGetAllNotes(req, res){
    try{
        const allNotes = await Note.find()
        if(!allNotes){
            return res.status(404).json({response: "no notes available"})
        }
        else{
            return res.status(200).json({response: allNotes})
        }
    }catch(error){
        return res.status(500).json({response: "internal server error"})
    }
}

//* POST notes
async function handlePostAllNotes(req, res){
    try{
        if(!req.body || !req.body.noteheading){
            console.log("body: ", req.body)
            console.log("body: ", req.body.noteheading)
            return res.status(403).json({response: "forbidden request"})
        }
        else{
            const countDocument = await Note.countDocuments()
            const note = await Note.create({
                noteId: countDocument+1,
                noteheading: req.body.noteheading,
                notebody: req.body.notebody
            })
            return res.status(200).json({response: "added notes"})
        }
    }catch(error){
        return res.status(500).json({response: "internal server error"})
    }
}

module.exports = {
    handleGetAllNotes,
    handlePostAllNotes
}