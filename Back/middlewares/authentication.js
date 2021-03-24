const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const getNewToken = (id) => 'Bearer ' + jwt.sign({ _id: id }, process.env.JWTSECRETKEY, { expiresIn: "1 days" });

const hashPassword = async (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if(err) reject(err);
            else resolve(hash);
        });
    })
};

const classicLogin = async (user) => {
    var userFound = await User.findOne({
        email: user.email
    })
    console.log(userFound);
    if(await bcrypt.compare(user.password, userFound.password)) {
        return getNewToken(userFound._id);
    }
};

const tokenLogin = async (user) => {
    let userFound;
    try {
        const token = user.token.replace('Bearer', '').trim();
        const decoded = jwt.verify(token, process.env.JWTSECRETKEY);
        userFound = User.findOne({
            _id: decoded._id
        });

        if(userFound){
            return token;
        } else {
            throw new Error('401 : No user found with token');
        }
    } catch (error) {
        if (user.password && user.email) {
            return classicLogin(user);
        } else {
            throw Error('401 : Please sign in again')
        }
    }
}

const match = async (user) => {
    try {
        var token;
        if(user.token) {
            token = await tokenLogin(user);
        } else if (user){
            token = await classicLogin(user);
        }
        if(token) return token;
        else throw Error();
    } catch (error) {
        /// TODO throw errors with status attribute !!!
        throw error;
    }
}

module.exports = {
    match,
    getNewToken,
    hashPassword
};
