const {Router} = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const {authentication} = require("../middlewares/authentication")

const {NoteModel} = require("../models/Note.model")

const notesController = Router();


notesController.get("/", async (req, res) => { 
    const notes = await NoteModel.find({userId : req.body.userId})
    res.send(notes)
})


notesController.post("/create", async (req, res) => {
    const {Task,Status, userId} = req.body;
    console.log(req.body)
    const note = new NoteModel({
        Task,
        Status,
        userId
    })
    try{
        await note.save()
        res.json("note created")
    }
    catch(err){
        res.send("something went wrong")
    }
})


notesController.delete("/delete/:noteId", async (req, res) => {
    const {noteId} = req.params
    const deletedNote = await NoteModel.findByIdAndRemove({_id : noteId})
    console.log(deletedNote,req.body.userId)
    if(deletedNote){
        res.status(200).send("Deleted")
    }
    else{
        res.send("couldn't delete")
    }
})

notesController.patch("/edit/:noteId", async (req, res) => {
    const {noteId} = req.params
    const eiditedNote = await NoteModel.findByIdAndUpdate({_id : noteId},req.body)
    console.log(eiditedNote)
    if(eiditedNote){
        res.send("Edited")
    }
    else{
        res.send("couldn't edit")
    }
})


module.exports = {
    notesController
}