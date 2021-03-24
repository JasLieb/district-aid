// const validator = require('validator');
// // TODO use validator 

// const newUser = (data, authorization) => {
//     var user = {
//         name: data.name,
//         email: data.email,
//         password: data.password,
//         creationDate: Date.now(),
//         is_connected: false
//     };
//     if(authorization) user.token = authorization;
//     return user;
// };



// module.exports = {
//     newUser
// };

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = {
    name: String,
    email: {
        type: String,
        index: true,
        unique: true
    },
    password: String,
    creation_date: Date,
    token: String
};

var userModel = new Schema(schema);

module.exports = mongoose.model('Users', userModel, 'Users');