var assert = require('assert');
const calls = require('./utils/apiCalls');

var response;
const dummyName = "Dummy Foo";
const dummyEmail = "Dummy.Foo@asylum.io";
const dummyPassword = "MyP4ZZVV0RDEZ";
const dummy = {name: dummyName, password: dummyPassword, email: dummyEmail};

describe('/user tests', () => {
    describe('#POST /register no errors', () => {
        const dummyName = "Dummy Bar";
        const dummyEmail = "Dummy.Bar@asylum.io";
        const dummyPassword = "MyP4ZZVV0RDEZ";
        const dummy = {name: dummyName, password: dummyPassword, email: dummyEmail};
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
        const dummyName = "Dummy Sha";
        const dummyEmail = "Dummy.Sha@asylum.io";
        const dummyPassword = "MyP4ZZVV0RDEZ";
        const dummy = {name: dummyName, password: dummyPassword, email: dummyEmail};
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
        const dummyName = "Dummy tok";
        const dummyEmail = "Dummy.to@ed.nd";
        const dummyPassword = "MyP4ZZVV0RDEZ";
        const dummy = {name: dummyName, password: dummyPassword, email: dummyEmail};
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