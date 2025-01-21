const jwt = require('jsonwebtoken');
const JWT_secret = require('../config');

function userAuth(req,res,next){
    try{
        const header = req.headers.authorization;
        if (!header || !header.startsWith("Bearer ")) {
            console.log(header);
            return res.status(401).json({ msg: "Authorization header missing or malformed" });
        }
        const token = header.split(" ")[1];
        
        const decoded = jwt.verify(token,JWT_secret);
        if(!decoded){
            return res.status(404).json({msg:"JWT not verified"});
        }
        req.userId = decoded.userId;
        console.log(req.userId);
        next();
    }
    catch (err) {
        console.error("JWT Verification Error:", err.message);
        return res.status(401).json({ msg: "Invalid or expired token", error: err.message });
    }
}

module.exports = {userAuth};