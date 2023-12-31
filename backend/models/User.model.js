const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    user_id : {type : Number},
    email : {type : String, required : true},
    password : {type : String, required : true},
    User : {type : String, required : true},
})

const UserModel = mongoose.model("user", userSchema)


module.exports = {
    UserModel
}