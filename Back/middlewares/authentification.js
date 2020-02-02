const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authentification = async (req,res,next) => {
    var authorization = req.header('Authorization');
    if(authorization) {
        try {
            const token = authorization.replace('Bearer', '').trim();
            const decoded = jwt.verify(token, process.env.JWTSECRETKEY);
            const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

            if(!user){
                throw new Error();
            }

            res.send({token}).end();
        } catch (error) {
            console.log(error);
            res.status(401).send({ error: 'Please authenticate!' });
        }
    }
    next();
}

module.exports = authentification;