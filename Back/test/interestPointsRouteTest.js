var assert = require('assert');
var apiCall = require('./utils/apiCalls');

const dummyPoint = {
    localization: {
        lat: 1,
        lng: 1
    },
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
            assert.ok(response.body.name.length > 0);
            assert.ok(response.body.type === 'Giver');
            assert.ok(response.body.location);
            assert.ok(response.body.id);
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