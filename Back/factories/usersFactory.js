var User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var createNewUser = async (userData) => {
    var user = new User(userData);
    try {
        const token = await newAuthToken(user);
        return token;
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

module.exports = {
    createNewUser
};