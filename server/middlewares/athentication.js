require('dotenv').config();
const jwt = require('jsonwebtoken');

const authentication = (req,res,next) => {
    console.log('MASUK MIDDLE WARE')
    try {
        if(!req.headers.token){
            req.status(404).json('Token not found');
        } else {
            const decoded = jwt.verify(req.headers.token, process.env.SECRET);
            req.userId = decoded.userId;
            next();
            // req.userId = decoded.;
        }
    } catch(e) {
        console.log(e);
        res.status(500).json({ message: 'internal server error' });
    }
}

module.exports = authentication;