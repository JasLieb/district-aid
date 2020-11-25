const db = require('./databaseMariaFactory');
const UserModel = require('../models/userModel');
const authentication = require('../middlewares/authentication');

const createNewUser = async (userData) => {
    try {
        var user = UserModel.newUser(userData);
        user.password = await authentication.hashPassword(user.password);
        var query = `INSERT INTO users (name, email, password, creation_date) values ('${user.name}', '${user.email}', '${user.password}', CURRENT_TIMESTAMP())`;
        await db.query(query);
        
        // TODO DB function to return id generated
        query = `select * from users where email='${user.email}'`;
        var res = await db.queryOne(query);

        return authentication.getNewToken(res.id);
    } catch (e) {
        console.log(e);
        if(e.code == 'ER_DUP_ENTRY')
            throw new Error(`500 : ${user.email} is already register`);
        throw new Error('500 : Fails to create new user');
    }
}

const login = async (userData, authorization) => {
    try {
        var user = UserModel.newUser(userData, authorization);
        return await authentication.match(user);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createNewUser,
    login
};
