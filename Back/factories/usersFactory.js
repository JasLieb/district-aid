var User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var createNewUser = async (userData) => {
    var user = new User(userData);
    try {
        return await newAuthToken(user);
    } catch (e) {
        throw e;
    }
}

var newAuthToken = async (user) => {
    const token = jwt.sign({ _id: user.id.toString() }, process.env.JWTSECRETKEY, { expiresIn: "7 days" });
    try {
        user.password = await bcrypt.hash(user.password, 10);
        user.tokens = user.tokens.concat({ token })
        await user.save();
    } catch (error) {
        throw error;
    }
    return token;
}

var login = async (user) => {
    try {
        var userFound = await User.findOne({'email': user.email});
        var match = await bcrypt.compare(user.password, userFound.password);

        if(!match) {
            throw new Error('401 : NotConnected');
        }

        userFound = await addNewToken(userFound);
        return userFound.tokens.slice(-1)[0];
    } catch (error) {
        throw error;
    }
}

/// TODO Tokens expiration date verification
var addNewToken = async (user) => {
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWTSECRETKEY, { expiresIn: "7 days" });
    user.tokens = user.tokens.concat({token});
    try {
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createNewUser,
    login
};