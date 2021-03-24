var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const config = require('../config')

var options = {
    dbName: 'district-aid',
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}

var openConnection = async () => {
    await mongoose.connect(config.mongoKey, options);
}

openConnection();

module.exports = {
    mongoose: mongoose,
    Schema: Schema,
    openConnection: openConnection
}
