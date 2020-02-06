var assert = require('assert');
const calls = require('./utils/apiCalls');

var response;
const dummyName = "Dummy Foo";
const dummyEmail = "Dummy.Foo@asylum.io";
const dummyPassword = "MyP4ZZVV0RDEZ";
const dummy = {name: dummyName, password: dummyPassword, email: dummyEmail};

describe('/user tests', () => {
    describe('#POST /register no errors', () => {
        before((done) => {
            calls.regiterDummy(dummy)
            .then(res => {
                response = res;
                done();
            }).catch(done);
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
            calls.deleteDummy(dummy).then(done).catch(done);
        });
    });

    describe('#POST /login without token', () => {
        before(
            (done) => {
                calls.regiterDummy(dummy)
                .then(
                    _ => {
                        calls.loginDummy(dummy)
                        .then(res => {
                            response = res;
                            done();
                        }).catch(done);
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

        after((done) => {
            calls.deleteDummy(dummy).then(done).catch(done);
        });
    });

    describe('#POST /login with token', () => {
        before(
            (done) => {
                calls.regiterDummy(dummy)
                .then(
                    registerRes => {
                        calls.loginDummyWithToken(registerRes.body.token)
                        .then(
                            loginRes => {
                                response = loginRes;
                                done();
                            }
                        )
                        .catch(done);
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
            calls.deleteDummy(dummy).then(done).catch(done);
        });
    });
});