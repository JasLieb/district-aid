const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const getNewToken = (id) => 'Bearer ' + jwt.sign({ _id: id.toString() }, process.env.JWTSECRETKEY, { expiresIn: "7 days" });

const classicLogin = async (user) => {
    var userFound = await User.findOne({'email': user.email});
    if(await bcrypt.compare(user.password, userFound.password))
    return getNewToken(userFound.id);
};

const tokenLogin = async (authorization) => {

    const token = authorization.replace('Bearer', '').trim();
    const decoded = jwt.verify(token, process.env.JWTSECRETKEY);
    console.log(decoded);
    const user = await User.findOne({ _id: decoded._id });
    if(user){
        return token;
    }
}

const authentification = async (user, authorization) => {
    try {
        var token;
        if(authorization) {
            token = await tokenLogin(authorization);
        } else if (user){
            token = await classicLogin(user);
        }
        if(token) return token;
        else throw Error();
    } catch (error) {
        throw new Error('401 : NotConnected - Wrong email and password');
    }
}

module.exports = authentification;