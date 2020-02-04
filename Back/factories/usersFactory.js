const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const authentification = require('../middlewares/authentification');

const createNewUser = async (userData) => {
    try {
        var user = new User(userData);
        user.password = await bcrypt.hash(user.password, 10);
        user.token = getNewToken(user.id);
        await user.save();
        return user.token;
    } catch (e) {
        throw e;
    }
}

const  login = async (user, authorization) => {
    try {
        return await authentification(user, authorization);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createNewUser,
    login
};
