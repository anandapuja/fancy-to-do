require('dotenv').config();
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const checkPass = require('../helpers/bcrypt').checkPassword;

class UserController {
    static register(req,res){
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
        .then( data => {
            console.log(data.id)
            res.status(200).json({ 
                id: data.id,
                email: data.email,
                token: jwt.sign({
                    userId: data.id,
                    userEmail: data.email
                }, process.env.SECRET)
             });
        }).catch( err => {
            res.status(400).json({ message: 'Error not found' });
        })
    }
    static login(req,res){
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then( data => {
            if(data){
                if(checkPass(req.body.password, data.password)){
                    res.status(200).json({ 
                        token: jwt.sign({
                            userId: data.id,
                            userEmail: data.email
                        }, process.env.SECRET)
                     });
                } else {
                    res.status(400).json({ message: 'email / password invalid 1' });
                }
            } else {
                res.status(400).json({ message: 'email / password invalid 2' });
            }
        }).catch( err => {
            res.status(500).json({ message: 'internal server error' });
        })
    }
}

module.exports = UserController;