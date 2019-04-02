const database = require('../models');
const jwt = require('jsonwebtoken');

/**
 * Find the user
 * Check if their password matches the hash in the server
 * Log them in if it matches
 */
exports.signIn = async function(req, res, next){
    try {
        let user = await database.User.findOne({
            email: req.body.email
        });
        let { id, email, profileImageUrl } = user;
        let isMatch = await user.comparePassword(req.body.password);
        
        if (isMatch === true){
            let token = jwt.sign({
                id,
                email,
                profileImageUrl
            }, process.env.SECRET_KEY);
    
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            });
        } else {
            return next({
                status: 400,
                message: 'Invalid email/password combination.'
            });
        }
    } catch (error){
        return next({
            status: 400,
            message: 'Invalid email/password combination.'
        });
    }
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