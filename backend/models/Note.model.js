const mongoose = require("mongoose")


const noteSchema = new mongoose.Schema({
    Task : {type : String, required : true},
    Status : {type : Boolean, default : false},
    userId : {type : String, required : true}
})

const NoteModel = mongoose.model("note", noteSchema)


module.exports = {
    NoteModel
}