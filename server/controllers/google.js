require('dotenv').config();
const { User } = require('../models');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_OAUTH_ID);

class GoogleController {
    static googleSignIn(req,res,next){
        const token = req.body.token;
        const googleUser = {};
        client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_OAUTH_ID
        }).then( data => {
            const payload = data.getPayload();
            googleUser['email'] = payload.email;
            googleUser['password'] = '12345';
            return User.findOne({
                where: {
                    email: payload.email
                }
            })
        })
        .then( data => {
            if( !data ){
                //  If Not Exist in Database
                return User.create(googleUser);
            } else {
                // If Exist in Database
                return data;
            }
        })
        .then( data => {
            const user = {
                id: data.id,
                email: data.email
            };
            res.status(200).json({
                id: data.id,
                email: data.email,
                token: jwt.sign(user, process.env.SECRET)
            })
        })
        .catch( err => {
            console.log(err);
        })
    }
}

module.exports = GoogleController;