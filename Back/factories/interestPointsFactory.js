const InterestPoint = require('../models/interestPointsModel');
var GeoJSON = require('geojson');


const getInterestPoints = async () => {
    try {
        return await InterestPoint.find({});
    } catch (err) {
        throw err;
    }
}

const createInterestPoint = async (data) => {
    try {
        console.log(data);
        const dueDate = data.dueDate ? data.dueDate : '';
        
        var geoPoint = GeoJSON.parse(data.localization, { Point: ['lng', 'lat'] });
        console.log(geoPoint);
        const point = new InterestPoint({
            type: data.type,
            geometry: geoPoint.geometry,
            properties: {
                name: data.name,
                creationDate: new Date(),
                dueDate: dueDate,
                type: data.type
            }
        });

        await point.save();
        return point;
    } catch (err) {
        throw err;
    }
}

const deleteInterestPoint = async (data) => {
    try {
        await InterestPoint.deleteOne({
            _id: data
        })
    } catch (err) {
        throw err;
    }
}

const getInterestPointsFollowPosition = async (geoPoint, maxDistance) => {
    try {
        return await InterestPoint.find({
            "localization": {
                $near: {
                    $geometry: geoPoint,
                    $maxDistance: `${maxDistance}`
                },
            }
        });
    } catch (err) {
        throw err;
    }
}


module.exports = {
    getInterestPoints,
    createInterestPoint,
    deleteInterestPoint,
    getInterestPointsFollowPosition
}
