require('dotenv').config();
const jwt = require('jsonwebtoken');

const authentication = (req,res,next) => {
    try {
        if(!req.headers.token){
            throw new Error()
        } else {
            const decoded = jwt.verify(req.headers.token, process.env.SECRET);
            req.userId = decoded.userId;
            next();
            // req.userId = decoded.;
        }
    } catch(e) {
        console.log(e);
        res.status(500).json({ message: 'Token is not found' });
    }
}

module.exports = authentication;