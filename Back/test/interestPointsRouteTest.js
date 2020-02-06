require('dotenv').config();
var assert = require('assert');
var InterestPointFactory = require('../factories/interestPointsFactory');

// TODO TEST ROUTE

describe('InterestPoints factory', () => {
    describe('#getInterestPoints()', () => {
        it('should return some GeoPoint json without errors', async () => {
            var points = await InterestPointFactory.getInterestPoints();
            assert.ok(points.length > 0);
        });
    });
});