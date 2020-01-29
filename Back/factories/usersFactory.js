var User = require('../models/userModel');
const jwt = require('jsonwebtoken');

var createNewUser = async (userData) => {
    var user = new User(userData);
    try {
        const token = await newAuthToken(user);
        return { user, token };
    } catch (e) {
        throw e;
    }
}

var newAuthToken = async (user) => {
    const token = jwt.sign({ _id: user.id.toString() }, process.env.JWTSECRETKEY, { expiresIn: "7 days" });
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

module.exports = {
    createNewUser
};