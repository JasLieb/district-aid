var express = require('express');
var router = express.Router();
var InterestPointFactory = require('../factories/interestPointsFactory');

router.get('/', async function (req, res, next) {
    try {
        var InterestPoints = await InterestPointFactory.getInterestPoints();
        res.status(200).json(InterestPoints).end();
    } catch (err) {
        next(err);
    }
});

router.get('/nearMe', async function (req, res, next) {
    try {
        var position = {lng: 1, lat: 1}; // Will be given by front or req object
        var distanceMax = 1000; // in meters, will be given by front or req object

        var InterestPoints = await InterestPointFactory.getInterestPointsFollowPosition(position, distanceMax);
        res.status(200).json(InterestPoints).end();
    } catch (err) {
        next(err);
    }
});

module.exports = router;