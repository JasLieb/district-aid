const db = require('./databaseMariaFactory');
const InterestPoint = require('../models/interestPointsModel');
// InterestPoint.newPoint(localisation.name, {lng: 1, lat:1}, "Giver");

const getInterestPoints = async () => {
    try {
        const query = 'SELECT * FROM interest_points';
        return await db.query(query);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const getInterestPointsFollowPosition = async (localisation, maxDistance) => {
    try {
        const query = `SELECT * FROM interest_points WHERE ST_DISTANCE(POINT(${localisation.lng}, ${localisation.lat}), location) < ${maxDistance}`;
        return await db.query(query);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getInterestPoints,
    getInterestPointsFollowPosition
}
