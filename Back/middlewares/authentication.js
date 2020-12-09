const db = require('../factories/databaseMariaFactory');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const getNewToken = (id) => 'Bearer ' + jwt.sign({ _id: id }, process.env.JWTSECRETKEY, { expiresIn: "1 days" });

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
        var query =  `SELECT * FROM users WHERE email='${user.email}' `;
        var userFound =  await db.queryOne(query);
        if(await bcrypt.compare(user.password, userFound.password)) {
            return getNewToken(userFound.id);
        }
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
