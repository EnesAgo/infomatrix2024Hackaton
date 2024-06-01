const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = function(req,res,next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

    if(!token) return res.status(401).send("Access Denied")

    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next()
    }catch(e){
        res.status(400).send('Invalid Token')
    }
}