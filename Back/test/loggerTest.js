const fileTools = require('./utils/fileTools');
var assert = require('assert');
var request = require('supertest');
var app = require('../app');
var agent = request.agent(app);

/// Test Helpers
const getPoints = () => {
    return new Promise((resolve, error) => {
        agent.get('/points/')
        .end((err, res) => {
            if(err) error(err);
            else resolve();
        });
    });
}

/// Test Helpers
const regiterDummy = (dummy) => {
    return new Promise((resolve, error) => {
        agent.post('/users/register')
        .send(dummy)
        .end((err, res) => {
            if(err) error(err);
            else resolve();
        });
    });
}

/// TESTS
describe('Logger tests', () => {
    describe('Log #GET request without body', () => {
        before((done) => {
            getPoints().then(done).catch(done);
        });

        it('Logger expects to write into logs files', (done) => {
            assert.ok(fileTools.exists('logs/'));
            assert.ok(fileTools.exists('logs/all-logs.log'));
            assert.ok(fileTools.exists('logs/http-logs.log'));
            done();
        });
        
        it('Logger expects to write last http request in all-logs with some attributes', (done) => {
            fileTools
                .getLastLine('logs/all-logs.log', 64)
                .then((lastLine) => {
                    /// Is GET method
                    assert.ok(lastLine.includes('GET'));
                    /// Is points/ route
                    assert.ok(lastLine.includes('/points/'));
                    /// Have some headers
                    assert.ok(lastLine.includes('user-agent'));
                    /// Haven't some headers
                    assert.ok(!lastLine.includes('content-type'));
                    /// Haven't any req.body'
                    assert.ok(lastLine.includes('Nobody content'));
                    done();
                })
                .catch(done);
        });

        it('Logger expects to write last http request in http-logs with some attributes', (done) => {
            fileTools
                .getLastLine('logs/http-logs.log', 64)
                .then((lastLine) => {
                    assert.ok(lastLine.includes('GET'));
                    assert.ok(lastLine.includes('/points/'));
                    assert.ok(lastLine.includes('user-agent'));
                    assert.ok(!lastLine.includes('content-type'));
                    assert.ok(lastLine.includes('Nobody content'));
                    done();
                })
                .catch(done);
        });
    });

    describe('Log #POST request with not well formed body', () => {
        describe('Log #POST register request without password', () => {
            var response;
            var error;
            var dummy = {
                email: 'dummy@nopass.word',
                name: 'badDummy'
            };

            before((done) => {
                regiterDummy(dummy)
                .then(res => {
                    response = res;
                    done();
                })
                .catch(err => {
                    error = err;
                    done();
                })
            });

            it('Logger expects to write last register error', (done) => {
                console.log({response, error});
                fileTools
                    .getLastLine('logs/all-logs.log', 64)
                    .then((lastLine) => {
                        assert.ok(lastLine.includes('POST'));
                        assert.ok(lastLine.includes('/users/register'));
                        assert.ok(lastLine.includes('user-agent'));
                        assert.ok(lastLine.includes('content-type'));
                        assert.ok(lastLine.includes(JSON.stringify(dummy)));
                        done();
                    })
                    .catch(done);
            });
        });
    });

});