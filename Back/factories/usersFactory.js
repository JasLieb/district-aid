const User = require('../models/userModel');
const authentification = require('../middlewares/authentification');

const createNewUser = async (userData) => {
    var user = new User(userData);
    user.token = authentification.getNewToken(user.id);

    try {
        user.password = await authentification.hashPassword(user.password);
        await user.save();
        return user.token;
    } catch (e) {
        throw e;
    }
}

const login = async (userData, authorization) => {
    try {
        var user = new User(userData);
        return await authentification.login(user, authorization);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createNewUser,
    login
};
