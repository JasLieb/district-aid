const validator = require('validator');
// TODO use validator 

const newUser = (data, autorization) => {
    var user = {
        name: data.name,
        email: data.email,
        password: data.password,
        creationDate: Date.now(),
        is_connected: false
    };
    if(autorization) user.token = autorization;
    return user;
};

module.exports = {
    newUser
};
