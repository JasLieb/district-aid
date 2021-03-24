var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = {
    type: String,
    localization: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point',
        },
        coordinates: {
          type: [Number],
          default: [0, 0],
        }
      },
    properties: {
        name: String,
        creationDate: Date,
        dueDate: Date,
        type: {type: String}
    }
};

var interestPointModel = new Schema(schema);
interestPointModel.index({ localization: "2dsphere"});

module.exports = mongoose.model('InterestPoint', interestPointModel, 'InterestPoints');