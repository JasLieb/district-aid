const validator = require('validator');
// TODO use validator 

const newUser = (data, authorization) => {
    var user = {
        name: data.name,
        email: data.email,
        password: data.password,
        creationDate: Date.now(),
        is_connected: false
    };
    if(authorization) user.token = authorization;
    return user;
};

module.exports = {
    newUser
};
