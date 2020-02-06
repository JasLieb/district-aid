var express = require('express');
var router = express.Router();
var InterestPointFactory = require('../factories/interestPointsFactory');
var GeoJSON = require('geojson');

router.get('/', async function (req, res, next) {
    try {
        var InterestPoints = await InterestPointFactory.getInterestPoints();
        res.status(200).json(InterestPoints);
    } catch (err) {
        res.status(500).json(err);
    }
    res.end();
});

router.get('/nearMe', async function (req, res, next) {
    try {
        var position = {lng: 1, lat: 1}; // Will be given by front
        var distanceMax = 1000; // in meters, will be given by front
        var geoPoint = GeoJSON.parse(position, { Point: ['lng', 'lat'] });

        var InterestPoints = await InterestPointFactory.getInterestPointsFollowPosition(geoPoint, distanceMax);
        res.status(200).json(InterestPoints);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    res.end();
});

module.exports = router;