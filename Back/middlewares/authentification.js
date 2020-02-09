const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authentification = async (authorization) => {
    if(authorization) {
        try {
            const token = authorization.replace('Bearer', '').trim();
            const decoded = jwt.verify(token, process.env.JWTSECRETKEY);
            const user = await User.findOne({ _id: decoded._id });
            if(user){
                return token;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = authentification;