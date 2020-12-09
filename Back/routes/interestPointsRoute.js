var express = require('express');
var router = express.Router();
var InterestPointFactory = require('../factories/interestPointsFactory');

router.get('/', async function (req, res, next) {
    try {
        var interestPoints = await InterestPointFactory.getInterestPoints();
        res.status(200).json(interestPoints).end();
    } catch (err) {
        next(err);
    }
});

router.post('/', async function (req, res, next) {
    try {
        var interestPoint = await InterestPointFactory.createInterestPoint(req.body);
        res.status(200).json(interestPoint).end();
    } catch (err) {
        next(err);
    }
});

router.delete('/', async function (req, res, next) {
    try {
        await InterestPointFactory.deleteInterestPoint(req.body.id);
        res.status(200).end();
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