const { response } = require("express")
const Note = require("../model/notesModel")

//* GET notes
async function getAllNotes(req, res){
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
async function postAllNotes(req, res){
    try{
        if(!req.body || !req.body.heading){
            return res.status(403).json({response: "forbidden request"})
        }
        else{
            const countDocument = Note.countDocument()
            const note = await Note.create({
                noteId: countDocument+1,
                heading: req.body.heading,
                body: req.body.body
            })
            return res.status(200).json({response: "added notes"})
        }
    }catch(error){
        return res.status(500).json({response: "internal server error"})
    }
}

module.exports = {
    getAllNotes,
    postAllNotes
}