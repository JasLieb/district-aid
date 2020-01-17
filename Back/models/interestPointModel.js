var db = require('../factories/databaseFactory');

var schema = {
    type: String,
    geometry: {
        type: {type: String},
        coordinates: [Number]
    },
    properties: {
        name: String,
        creationDate: Date,
        dueDate: Date,
        type: {type: String}
    }
};

var interestPointModel = new db.Schema(schema);

module.exports = db.mongoose.model('InterestPoint', interestPointModel, 'InterestPoints');