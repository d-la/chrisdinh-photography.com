const mongoose = require('mongoose');
const bcrupt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    }
});

// Before each document is saved in mongoose, we will set the hashed password then move onto the next action
userSchema.pre('save', async function(next){
    try {
        // If you haven't changed the password, move on
        if (!this.isModified('password')){
            return next;
        }

        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next;
    } catch (error){
        return next(error);
    }
});

userSchema.method.comparePassword = async function(userPassword, next){
    try {
        let isMatch = await bcrypt.compare(userPassword, this.password);
        return isMatch;
    } catch (error) {
        return next(error);
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;