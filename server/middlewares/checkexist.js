const { User } = require('../models');

const checkexist = (req,res,next) => {
    User.findByPk(Number(req.userId))
    .then( data => {
        if( !data ){
            throw new Error();
        } else {
            next();
        }
    }).catch( err => {
        res.status(500).json({ message: 'User not found' });
    })
}

module.exports = checkexist;