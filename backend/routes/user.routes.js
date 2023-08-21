const {Router} = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const {UserModel} = require("../models/User.model")

const userController = Router();


userController.post("/signup", (req, res) => {
    const {email, password, User} = req.body;

    bcrypt.hash(password, 5, async function(err, hash) {
        if(err){
            res.send("Something went wrong, plz try again later")
        }
        const user = new UserModel({
            email,
            password : hash,
            User
        })
        try{
            await user.save()
            res.json({message : "Signup successfull"})
        }
        catch(err){
            console.log(err)
            res.send("Something went wrong, plz try again")
        }
       
    });
})

userController.post("/login", async (req, res) => {
    const {email, password} = req.body
    const user = await UserModel.findOne({email})
    const hash = user?.password || ""
    const name = user?.User
    bcrypt.compare(password, hash, function(err, result) {
        if(err){
            // console.log(err)
            res.send("Something went wrong, plz try again later")
        }
        if(result){
            // console.log(result)
            const token = jwt.sign({ userId : user._id }, process.env.JWT_SECRET);
            res.json({message : "Login successfull", token,name})
        }
        else{
            res.send("Invalid credentials, plz signup if you haven't")
        }
    });
    
})


userController.post('/logout', async(req, res) => {
    try{
        let randomNumberToAppend = toString(Math.floor((Math.random() * 1000) + 1));
        let hashedRandomNumberToAppend = await bcrypt.hash(randomNumberToAppend, 10);
        console.log("robin")
    
        // now just concat the hashed random number to the end of the token
        let token = req.token + hashedRandomNumberToAppend;
        return res.json({message : "LogOut successfull", token})
    }catch(err){
        return res.status(500).json(err.message);
    }
});

module.exports = {
    userController
}