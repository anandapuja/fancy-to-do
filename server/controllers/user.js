const { User } = require('../models');
const jwt = require('jsonwebtoken');

class UserController {
    static register(req,res){
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
        .then( data => {
            res.status(200).json({ 
                token: jwt.sign({
                    userId: data.id,
                    userEmail: data.email
                }, 'cumakamiyangtahu')
             });
        }).catch( err => {
            res.status(400).json({ message: 'Error not found' });
        })
    }
    static login(req,res){

    }
}

module.exports = UserController;