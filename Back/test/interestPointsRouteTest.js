var assert = require('assert');
var apiCall = require('./utils/apiCalls');


describe('/points tests', () => {
    var response;
    describe('#GET / no errors', () => {
        before(done => {
            apiCall.getPoints()
            .then(res => {
                response = res;
                done();
            })
            .catch(done);
        });

        it('expect have status 200', async () => {
            assert.strictEqual(response.status, 200);
        });

        it('should return some GeoPoint json without errors', async () => {
            assert.ok(response.body.length >= 0);
        });
    });

    describe('#GET /nearMe', () => {
        before(done => {
            apiCall.getPointsNear({lat: 1, lng:1})
            .then(res => {
                response = res;
                done();
            })
            .catch(done);
        });

        it('expect have status 200', async () => {
            assert.strictEqual(response.status, 200);
        });

        it('should return some GeoPoint json without errors', async () => {
            assert.ok(response.body.length >= 0);
        });
    });
});