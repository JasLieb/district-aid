var express = require('express');
var router = express.Router();
var InterestPointFactory = require('../factories/interestPointsFactory');
var GeoJSON = require('geojson');

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
        var distanceMax = req.query.maxDistance;
        var lat = req.query.lat;
        var lng = req.query.lng;
        console.log({lat, lng});
        var geoPoint = GeoJSON.parse({lat, lng}, { Point: ['lng', 'lat'] });
        var InterestPoints = await InterestPointFactory.getInterestPointsFollowPosition(geoPoint.geometry, distanceMax);
        res.status(200).json(InterestPoints ?? []).end();
    } catch (err) {
        next(err);
    }
});

module.exports = router;