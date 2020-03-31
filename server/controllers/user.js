const { User } = require('../models');

class UserController {
    static register(req,res){
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }
        console.log(newUser)
        User.create(newUser)
        .then( data => {
            console.log(data)
            res.status(200).json({ data });
        }).catch( err => {
            res.status(400).json({ message: 'Error not found' });
        })
    }
    static login(req,res){

    }
}

module.exports = UserController;