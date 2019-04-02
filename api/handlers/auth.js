const database = require('../models');
const jwt = require('jsonwebtoken');

exports.signIn = function(){

}

exports.signUp = async function(req, res, next){
    try {
        let user = await database.User.create(req.body);
        let {id, email, profileImageUrl} = user;
        let token = jwt.sign({
            id,
            email,
            profileImageUrl
        }, process.env.SECRET_KEY);

        return res.status(200).json({
            id,
            email,
            token
        });
    } catch (error) {
        // If validation fails
        if (error.code === 11000){
            error.message = 'Sorry, that email is already taken!';
        }

        return next({
            status: 400,
            message: error.message
        });
    }
}