const db = require('./databaseMariaFactory');
const InterestPoint = require('../models/interestPointsModel');
// InterestPoint.newPoint(localisation.name, {lng: 1, lat:1}, "Giver");

const getInterestPoints = async () => {
    try {
        const query = 'SELECT * FROM interest_points';
        return await db.query(query);
    } catch (err) {
        throw err;
    }
}

const createInterestPoint = async (data) => {
    try {
        const dueDate = data.dueDate ? data.dueDate : 'NULL';
        const query = `INSERT INTO interest_points (location, name, creation_date, due_date, type) VALUES (POINT(${data.localization.lng}, ${data.localization.lat}), '${data.name}', NOW(), ${dueDate}, '${data.type}')`;
        await db.query(query);
        const queryInsertedPoint = `SELECT * FROM interest_points WHERE name='${data.name}' AND type='${data.type}' AND location=POINT(${data.localization.lng}, ${data.localization.lat})`
        return await db.queryOne(queryInsertedPoint);
    } catch (err) {
        throw err;
    }
}

const deleteInterestPoint = async (data) => {
    try {
        const query = `DELETE FROM interest_points WHERE id=${data}`;
        await db.query(query);
    } catch (err) {
        throw err;
    }
}

const getInterestPointsFollowPosition = async (localization, maxDistance) => {
    try {
        const query = `SELECT * FROM interest_points WHERE ST_DISTANCE(POINT(${localization.lng}, ${localization.lat}), location) < ${maxDistance}`;
        return await db.query(query);
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
