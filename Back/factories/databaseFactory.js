var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var options = {
    dbName: process.env.NODE_ENV === 'test' ? 'NoWasteTest' : 'NoWaste',
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}

var openConnection = async () => {
    await mongoose.connect(process.env.MONGO_KEY, options);
}

openConnection();

module.exports = {
    mongoose: mongoose,
    Schema: Schema
}
