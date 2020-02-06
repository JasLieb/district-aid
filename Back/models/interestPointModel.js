var db = require('../factories/databaseFactory');

var schema = {
    type: {type: String},
    geometry: {
        type: {type: String},
        coordinates: [Number]
    },
    properties: {
        name: {
            type: String,
            require: true
        },
        creationDate: {
            type: Date,
            require: true,
            default: Date.now()
        },
        dueDate: {
            type: Date
        },
        type: {
            type: String,
            enum: ['Giver', 'Reciever', 'Assos'],
            require: true
        }
    }
};

var interestPointModel = new db.Schema(schema);

module.exports = db.mongoose.model('InterestPoint', interestPointModel, 'InterestPoints');