var assert = require('assert');
var request = require('supertest');
var User = require('../models/userModel');
var app = require('../app');
var agent = request.agent(app);

var response;
const dummyName = "Dummy Foo";
const dummyEmail = "Dummy.Foo@asylum.io";
const dummyPassword = "MyP4ZZVV0RDEZ";
const dummy = {name: dummyName, password: dummyPassword, email: dummyEmail}

/// Test Helpers
const regiterDummy = (dummy) => {
    return new Promise((resolve, error) => {
        agent.post('/users/register')
        .send(dummy)
        .end((err, res) => {
            response = res;
            if(err) error(err);
            else resolve();
        });
    });
}

const loginDummy = () => {
    return new Promise((resolve, error) => {
        agent.post('/users/login')
        .send(dummy)
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

const deleteDummy = (dummy) =>
    new Promise((resolve, error) => {
        User.deleteOne({name: dummy.name, email: dummy.email}, (err) => {
            if(err) error(err);
            else resolve();
        });
    });

/// TESTS
describe('/user tests', () => {
    describe('#POST /register no errors', () => {
        before((done) => {
            regiterDummy(dummy)
            .then(done).catch(done);
        });

        it('POST /register expect response have status 200', (done) => {
            assert.ok(response.status == 200);
            done();
        });

        it('POST /register expect response have tokens', (done) => {
            assert.ok(response.body.token);
            done();
        });

        after((done) => {
            deleteDummy(dummy).then(done).catch(done);
        });
    });

    describe('#POST /login without token', () => {
        before(
            (done) => {
                regiterDummy(dummy)
                .then(
                    _ => {
                        loginDummy(dummy).then(done).catch();
                    }
                )
                .catch(done)
            }
        );

        it('POST /login without token expect response have status 200', (done) => {
            assert.ok(response.status == 200);
            done();
        });

        it('POST /login without token expect response have token', (done) => {
            assert.ok(response.body.token);
            done();
        });

        after(
            (done) => {
                deleteDummy(dummy).then(done).catch(done);
            }
        );
    });

    describe('#POST /login with token', () => {
        before(
            (done) => {
                regiterDummy(dummy).then(_ =>{
                    loginDummyWithToken(response.body.token)
                    .then(done)
                    .catch();
                })
                .catch(done);
        });

        it('#POST /login with token expect response have status 200', (done) => {
            assert.ok(response.status == 200);
            done();
        });

        it('#POST /login with token expect response still have token', (done) => {
            assert.ok(response.body.token);
            done();
        });

        after((done) => {
            deleteDummy(dummy).then(done).catch(done);
        });
    });
});