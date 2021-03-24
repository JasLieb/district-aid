var assert = require('assert');
var apiCall = require('./utils/apiCalls');
var GeoJSON = require('geojson');

const dummyPoint = {
    localization: GeoJSON.parse(
        {
            lat: 1,
            lng: 1
        }, 
        { Point: ['lng', 'lat'] }
    ).geometry,
    name: 'a testing point',
    type: 'Giver'
};

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

    describe('#POST /', () => {
        before(done => {
            apiCall.createPoint(dummyPoint)
            .then(res => {
                response = res;
                done();
            })
            .catch(done);
        });

        it('expect have status 200', async () => {
            assert.strictEqual(response.status, 200);
        });

        it('should return Interest Point created with an id', async () => {
            assert.ok(response.body.properties.name.length > 0);
            assert.ok(response.body.properties.type === 'Giver');
            assert.ok(response.body.localization);
            assert.ok(response.body._id);
        });

        after((done) => {
            apiCall.cleanDummyPoint(dummyPoint).then(done).catch(done);
        });
    });

    describe('#DELETE /', () => {
        before(done => {
            apiCall.createPoint(dummyPoint)
            .then(resCreate =>{
                apiCall.deletePoint({
                    id: resCreate.body.id
                })
                .then(res => {
                    response = res;
                    done();
                })
                .catch(done)}
            )
            .catch(done);
        });

        it('expect have status 200', async () => {
            assert.strictEqual(response.status, 200);
        });

        after((done) => {
            apiCall.cleanDummyPoint(dummyPoint).then(done).catch(done);
        });
    });

    describe('#GET /nearMe', () => {
        before(done => {
            apiCall.getPointsNear(
                {lat: 43.5610932, lng:1.4531450000000001},
                5000
            )
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