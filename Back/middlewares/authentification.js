const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const getNewToken = (id) => 'Bearer ' + jwt.sign({ _id: id.toString() }, process.env.JWTSECRETKEY, { expiresIn: "7 days" });

const hashPassword = async (password) => {
    try {
        return await new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if(err) reject(err);
                else resolve(hash);
            });
        })
    } catch (error) {
        throw error
    }
};

const classicLogin = async (user) => {
    try {
        var userFound = await User.findOne({'email': user.email});
        if(await bcrypt.compare(user.password, userFound.password))
        return userFound.id;
    } catch (error) {
        /// TODO throw errors with status attribute !!!
        throw Error('500 : Register failed');
    }
};

const tokenLogin = async (authorization) => {

    const token = authorization.replace('Bearer', '').trim();
    const decoded = jwt.verify(token, process.env.JWTSECRETKEY);
    const user = await User.findOne({ _id: decoded._id });

    if(user){
        return token;
    }
}

const login = async (user, authorization) => {
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
        /// TODO throw errors with status attribute !!!
        throw new Error('401 : NotConnected - Wrong email and password');
    }
}

module.exports = {
    login,
    getNewToken,
    hashPassword
};