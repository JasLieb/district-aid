var User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var createNewUser = async (userData) => {
    try {
        var user = new User(userData);
        user.password = await bcrypt.hash(user.password, 10);
        return await saveUser(user);
    } catch (e) {
        throw e;
    }
}

var saveUser = async (user) => {
    user.token = getNewToken(user.id);
    try {
        await user.save();
    } catch (error) {
        throw error;
    }
    return user.token;
}

var login = async (user) => {
    try {
        var userFound = await User.findOne({'email': user.email});
        
        if(user.password && !await bcrypt.compare(user.password, userFound.password)) {
            throw new Error('401 : NotConnected');
        }
        
        userFound.token = getNewToken(userFound.id);
        return userFound;
    } catch (error) {
        throw error;
    }
}

/// TODO Tokens expiration date verification
var getNewToken = (id) => jwt.sign({ _id: id.toString() }, process.env.JWTSECRETKEY, { expiresIn: "7 days" });


module.exports = {
    createNewUser,
    login
};
