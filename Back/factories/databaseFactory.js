var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

var openConnection = async () => {
    await mongoose.connect(process.env.MONGO_KEY, options);
}

openConnection();

module.exports = {
    mongoose: mongoose,
    Schema: Schema
}
