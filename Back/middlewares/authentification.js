const db = require('../factories/databaseMariaFactory');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const getNewToken = (user) => 'Bearer ' + jwt.sign({ _id: user.id }, process.env.JWTSECRETKEY, { expiresIn: "7 days" });

const hashPassword = async (password) => {
    try {
        return new Promise((resolve, reject) => {
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
        console.log("classic log");
        var query =  `SELECT * FROM users WHERE email='${user.email}' `;
        console.log(user);
        var userFound =  await db.queryOne(query);
        console.log(userFound);
        if(await bcrypt.compare(user.password, userFound.password))
            return getNewToken(userFound);
        throw new Error('401 : NotConnected - Wrong email and password');
    } catch (error) {
        /// TODO throw errors with status attribute !!!
        throw error;
    }
};

const tokenLogin = async (user) => {
    let userFound;
    try {
        const token = user.token.replace('Bearer', '').trim();
        const decoded = jwt.verify(token, process.env.JWTSECRETKEY);
        var query = `SELECT * FROM users where id=${decoded._id}`;
        userFound = await db.queryOne(query);
        if(userFound){
            return token;
        } else throw Error("401 : No token Matching");
    } catch (error) {
        if (error.name.includes('TokenExpiredError')) {
            return classicLogin(user);
        } else {
            throw error;
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
        throw Error();
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