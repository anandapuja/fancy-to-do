require('dotenv').config();
const axios = require('axios');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const checkPass = require('../helpers/bcrypt').checkPassword;

class UserController {
    static register(req,res){
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }
        axios({
            method: 'POST',
            url: `https://api.mailboxvalidator.com/v1/validation/single?key=${process.env.MAILBOX_KEY}&email=${newUser.email}`
        }).then( result =>{
            if(result.data.is_verified === 'True'){
                return User.create(newUser);
            }else {
                return 'Email UNVERIFIED by MAILBOXVALIDATOR';
            }
        })
        .then( data => {
            if(data === 'Email UNVERIFIED by MAILBOXVALIDATOR'){
                res.status(400).json({ msg: data})
            } else {
                res.status(200).json({ 
                    id: data.id,
                    email: data.email,
                    token: jwt.sign({
                        userId: data.id,
                        userEmail: data.email
                    }, process.env.SECRET)
                 })
            }
        })
        .catch( err => {
            res.status(400).json({ msg: 'Email has been registered, loggin please!' });
        });
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
                    res.status(400).json({ message: 'Email / Password INVALID' });
                }
            } else {
                res.status(400).json({ message: 'Email / Password INVALID' });
            }
        }).catch( err => {
            res.status(500).json({ message: 'Internal server error' });
        })
    }
}

module.exports = UserController;