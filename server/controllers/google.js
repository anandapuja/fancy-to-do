require('dotenv').config();
const { User } = require('../models');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_OAUTH_ID);

class GoogleController {
    static googleSignIn(req,res,next){
        // console.log('MASUK CONTROLLER GOOGLE 1')
        const token = req.body.token;
        const googleUser = {};
        client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_OAUTH_ID
        }).then( data => {
            // console.log('MASUK CONTROLLER GOOGLE 2')
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
                // console.log('MASUK CONTROLLER CREATE')
                return User.create(googleUser);
            } else {
                // If Exist in Database
                // console.log('MASUK CONTROLLER FIND ONE')
                return data;
            }
        })
        .then( data => {
            const user = {
                userId: data.id,
                email: data.email
            };
            // console.log('MASUK CONTROLLER THEN 3')
            res.status(200).json({
                userId: data.id,
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