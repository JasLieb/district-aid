var InterestPoint = require('../models/interestPointModel');

var getInterestPoints = async () => {
    try {
        return await InterestPoint.find({}).exec();
    } catch (err) {
        console.log(err);
        throw err;
    }
}

var getInterestPointsFollowPosition = async (geoPoint, maxDistance) => {
    try {
        return await InterestPoint.findOne({
            "geometry": {
                $near: {
                    $geometry: geoPoint.geometry,
                    $maxDistance: maxDistance
                },
            }
        }).exec();
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getInterestPoints,
    getInterestPointsFollowPosition
}
