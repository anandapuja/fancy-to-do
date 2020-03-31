const { Todo } = require('../models');

const authorization = (req,res,next) => {
    Todo.findByPk(Number(req.params.id))
    .then( data => {
        if(!data){
            throw new Error();
        } else {
            if(data.UserId === Number(req.userId)){
                next();
            } else {
                throw new Error();
            }
        }
    }).catch( err => {
        res.status(400).json({ message: 'Forbidden access' });
    })
}

module.exports = authorization;