const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    mongoKey: process.env.MONGO_KEY
};