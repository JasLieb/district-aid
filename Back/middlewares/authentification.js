const db = require('../factories/databaseMariaFactory');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const getNewToken = (user) => 'Bearer ' + jwt.sign({ _id: user.id }, process.env.JWTSECRETKEY, { expiresIn: "7 days" });

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
        var query =  `SELECT * FROM users WHERE email='${user.email}' `;
        var userFound =  await db.queryOne(query);
        if(await bcrypt.compare(user.password, userFound.password))
            return getNewToken(userFound);
        throw new Error('401 : NotConnected - Wrong email and password');
    } catch (error) {
        /// TODO throw errors with status attribute !!!
        throw error;
    }
};

const tokenLogin = async (user) => {
    try {
        const token = user.token.replace('Bearer', '').trim();
        const decoded = jwt.verify(token, process.env.JWTSECRETKEY);
        var query = `SELECT * FROM users where id=${decoded._id}`;
    
        if(await db.queryOne(query)){
            return token;
        }
    } catch (error) {
        if (error.name.includes('TokenExpiredError')) {
            console.log(user);
            return classicLogin(user);
        } else {
            throw error;
        }
    }
}

const login = async (user) => {
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
    login,
    getNewToken,
    hashPassword
};