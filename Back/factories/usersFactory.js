const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
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

const  login = async (user) => {
    try {
        var userFound =await authentification(req.header('Authorization')) ||  await User.findOne({'email': user.email});
        var match = !(await bcrypt.compare(user.password, userFound.password));

        if(user.password && match) {
            throw new Error('401 : NotConnected - Wrong email and password');
        }

        return getNewToken(userFound.id);
    } catch (error) {
        throw error;
    }
}

const getNewToken = (id) => 'Bearer ' + jwt.sign({ _id: id.toString() }, process.env.JWTSECRETKEY, { expiresIn: "7 days" });


module.exports = {
    createNewUser,
    login
};
