require('dotenv').config();
const jwt = require('jsonwebtoken');

const authentication = (req,res,next) => {
    const { token } = req.headers;
    try {
        if(!token){
            throw new Error();
        } else {
            const decoded = jwt.verify(token, process.env.SECRET);
            req.userId = decoded.userId;
            next();
        }
    } catch(e) {
        console.log(e);
        res.status(500).json({ message: 'Token is not found' });
    }
}

module.exports = authentication;