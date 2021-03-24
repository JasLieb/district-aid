const User = require('../models/userModel');
const authentication = require('../middlewares/authentication');

const createNewUser = async (userData) => {
    try {
        var user = new User(userData);
        user.password = await authentication.hashPassword(user.password);
        user.token = authentication.getNewToken(user.id);
        await user.save();
        return user.token;
    } catch (e) {
        console.log(e);
        if(e.code == '11000')
            throw new Error(`500 : ${user.email} is already register`);
        throw new Error('500 : Fails to create new user');
    }
}

const login = async (userData, authorization) => {
    try {
        var user = new User(userData);
        user.token = authorization ?? user.token;

        return await authentication.match(user);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createNewUser,
    login
};
