const fileTools = require('./utils/fileTools');
var assert = require('assert');
var request = require('supertest');
var User = require('../models/userModel');
var app = require('../app');
var agent = request.agent(app);

var response;
const dummyName = "Dummy Foo";
const dummyEmail = "Dummy.Foo@asylum.io";
const dummyPassword = "MyP4ZZVV0RDEZ";
const dummy = {name: dummyName, password: dummyPassword, email: dummyEmail};
const dummyWithToken = {token: process.env.TOKEN_TEST};
const dummyWithoutPassword = {name: dummyName, email: dummyEmail};

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
const regiterDummy = (data) => {
    return new Promise((resolve, error) => {
        agent.post('/users/register')
        .send(data)
        .end((err, res) => {
            if(err) error(err);
            else resolve();
        });
    });
}

const loginDummy = (data) => {
    return new Promise((resolve, error) => {
        agent.post('/users/login')
        .send(data)
        .end((err, res) => {
            response = res;
            if(err) error(err);
            else resolve();
        });
    });
}

const loginDummyWithToken = (token) => {
    return new Promise((resolve, error) => {
        agent.post('/users/login')
        .set('Authorization', token)
        .end((err, res) => {
            if(err) { done(err);}
            else {
                response = res;
                resolve();
            }
        });
    });
}

const deleteDummy = (data) =>
    new Promise((resolve, error) => {
        User.deleteOne({name: data.name, email: data.email}, (err) => {
            if(err) error(err);
            else resolve();
        });
    });

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
            before((done) => {
                regiterDummy(dummyWithoutPassword)
                .then(res => {
                    done();
                })
                .catch(err => {
                    done();
                })
            });

            it('Logger expects to write last register error', (done) => {
                fileTools
                    .getLastLine('logs/all-logs.log', 64)
                    .then((lastLine) => {
                        assert.ok(lastLine.includes('POST'));
                        assert.ok(lastLine.includes('/users/register'));
                        assert.ok(lastLine.includes('user-agent'));
                        assert.ok(lastLine.includes('content-type'));
                        done();
                    })
                    .catch(done);
            });

            after(
                (done) => {
                    deleteDummy(dummy).then(done).catch(done);
                }
            );
        });
    });

    describe('Log #POST login request ', () => {
        describe('Log #POST login request with password', () => {
            before(
                (done) => {
                    regiterDummy(dummy)
                    .then(
                        _ => {
                            loginDummy(dummy).then(done).catch(done);
                        }
                    )
                    .catch(done)
                }
            );

            it('Logger expects to avoid write password', (done) => {
                fileTools
                    .getLastLine('logs/all-logs.log', 64)
                    .then((lastLine) => {
                        assert.ok(lastLine.includes('content-type'));
                        assert.ok(lastLine.includes(JSON.stringify(dummyWithoutPassword)));
                        assert.ok(!lastLine.includes(JSON.stringify(dummy)));
                        done();
                    })
                    .catch(done);
            });

            after(
                (done) => {
                    deleteDummy(dummy).then(done).catch(done);
                }
            );
        });

        describe('Log #POST login request with token', () => {
            before(
                (done) => {
                    regiterDummy(dummy)
                    .then(
                        _ => {
                            loginDummyWithToken(dummyWithToken).then(done).catch(done);
                        }
                    )
                    .catch(done)
                }
            );

            it('Logger expects to avoid write token', (done) => {
                fileTools
                    .getLastLine('logs/all-logs.log', 64)
                    .then((lastLine) => {
                        assert.ok(!lastLine.includes('authorization'));
                        assert.ok(!lastLine.includes(process.env.TOKEN_TEST));
                        done();
                    })
                    .catch(done);
            });

            after(
                (done) => {
                    deleteDummy(dummy).then(done).catch(done);
                }
            );
        });
    });

});