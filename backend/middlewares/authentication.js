const jwt = require("jsonwebtoken")
require("dotenv").config()

const authentication = (req, res, next) => {
    if(!req.headers.authorization){
        return res.json({message:"Please login again"})
    }
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if(err){
                res.json({message:"Please login"})
            }
            else{
                req.body.userId = decoded.userId
                next()
            }
        });
}

module.exports = {authentication}