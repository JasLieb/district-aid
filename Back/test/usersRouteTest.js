var assert = require('assert');
const calls = require('./utils/apiCalls');

var response;

describe('/user tests', () => {
    describe('#POST /register', () => {
        const dummyName = "Dummy Bar";
        const dummyEmail = "Dummy.Bar@asylum.io";
        const dummyPassword = "MyP4ZZVV0RDEZ";
        const dummy = {name: dummyName, password: dummyPassword, email: dummyEmail};
        before((done) => {
            calls.registerDummy(dummy)
            .then(res => {
                response = res;
                done();
            }).catch(done);
        });

        it('POST /register expect response have status 200', (done) => {
            assert.strictEqual(response.status, 200);
            done();
        });

        it('POST /register expect response have tokens', (done) => {
            assert.ok(response.body.token);
            done();
        });

        after((done) => {
            calls.cleanDummyUser(dummy).then(done).catch(done);
        });
    });

    // TODO : Find a new way to test token expiration
    // describe('#POST /login without token', () => {
    //     const dummyName = "Dummy Sha";
    //     const dummyEmail = "Dummy.Sha@asylum.io";
    //     const dummyPassword = "MyP4ZZVV0RDEZ";
    //     const dummy = {name: dummyName, password: dummyPassword, email: dummyEmail};
    //     before(
    //         (done) => {
    //             calls.registerDummy(dummy)
    //             .then(
    //                 _ => {
    //                     calls.loginDummy(dummy)
    //                     .then(res => {
    //                         response = res;
    //                         done();
    //                     }).catch(done);
    //                 }
    //             )
    //             .catch(done)
    //         }
    //     );

    //     it('POST /login without token expect response have status 200', (done) => {
    //         assert.strictEqual(response.status, 200);
    //         done();
    //     });

    //     it('POST /login without token expect response have token', (done) => {
    //         assert.ok(response.body.token);
    //         done();
    //     });

    //     after((done) => {
    //         calls.cleanDummyUser(dummy).then(done).catch(done);
    //     });
    // });

    describe('#POST /login with token', () => {
        const dummyName = "Dummy tok";
        const dummyEmail = "Dummy.to@ed.nd";
        const dummyPassword = "MyP4ZZVV0RDEZ";
        const dummy = {name: dummyName, password: dummyPassword, email: dummyEmail};
        before(
            (done) => {
                calls.registerDummy(dummy)
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
            assert.strictEqual(response.status, 200);
            done();
        });

        it('#POST /login with token expect response still have token', (done) => {
            assert.ok(response.body.token);
            done();
        });

        after((done) => {
            calls.cleanDummyUser(dummy).then(done).catch(done);
        });
    });

    // describe('#POST /login with old token with data', () => {
    //     const dummyName = "Dummy tok";
    //     const dummyEmail = "Dummy.to@ed.nd";
    //     const dummyPassword = "MyP4ZZVV0RDEZ";
    //     const dummy = {name: dummyName, password: dummyPassword, email: dummyEmail};
    //     before(
    //         (done) => {
    //             calls.registerDummy(dummy)
    //             .then(registerRes =>{
    //                 calls.loginDummyWithDataAndToken(process.env.TOKEN_OLD_TEST, dummy)
    //                 .then(
    //                     loginRes => {
    //                         response = loginRes;
    //                         done();
    //                     }
    //                 )
    //                 .catch(done);
    //             })
    //             .catch(done);
    //     });

    //     it('#POST /login with old token and data expects response have status 200', (done) => {
    //         assert.strictEqual(response.status, 200);
    //         done();
    //     });

    //     it('#POST /login with old token and data expects response still have token', (done) => {
    //         assert.ok(response.body.token);
    //         done();
    //     });

    //     after((done) => {
    //         calls.cleanDummyUser(dummy).then(done).catch(done);
    //     });
    // });

    // describe('#POST /login with old token without data', () => {
    //     var error;
    //     before(
    //         (done) => {
    //             calls.loginDummyWithToken(process.env.TOKEN_OLD_TEST)
    //             .then(
    //                 loginRes => {
    //                     response = loginRes;
    //                     done();
    //                 }
    //             )
    //             .catch(done);
    //     });

    //     it('#POST /login with old token without data expects response have status 500', (done) => {
    //         assert.strictEqual(response.status, 500);
    //         done();
    //     });

    //     it('#POST /login with old token without data expects contains message about log in again', (done) => {
    //         assert.strictEqual(response.error.text, '401 : Please sign in again');
    //         done();
    //     });
    // });

    // describe('#POST /login with unknown token with data', () => {
    //     const dummyName = "Dummy tok";
    //     const dummyEmail = "Dummy.to@ed.nd";
    //     const dummyPassword = "MyP4ZZVV0RDEZ";
    //     const dummy = {name: dummyName, password: dummyPassword, email: dummyEmail};
    //     before(
    //         (done) => {
    //             calls.loginDummyWithToken(process.env.TOKEN_UNKOWN_TEST, dummy)
    //             .then(
    //                 loginRes => {
    //                     response = loginRes;
    //                     done();
    //                 }
    //             )
    //             .catch(done);
    //     });

    //     it('#POST /login with unknown token with data expects response have status 200', (done) => {
    //         assert.strictEqual(response.status, 500);
    //         done();
    //     });

    //     it('#POST /login with unknown token and data expects contains message about log in again', (done) => {
    //         assert.strictEqual(response.error.text, '401 : Please sign in again');
    //         done();
    //     });
    // });

    describe('#POST /login with unknown token without data', () => {
        before(
            (done) => {
                calls.loginDummyWithToken(process.env.TOKEN_UNKOWN_TEST)
                .then(
                    loginRes => {
                        response = loginRes;
                        done();
                    }
                )
                .catch(done);
        });

        it('#POST /login with unknown token with data expects response have status 500', (done) => {
            assert.strictEqual(response.status, 500);
            done();
        });

        it('#POST /login with unknown token with data expects contains message about log in again', (done) => {
            assert.strictEqual(response.error.text, '401 : Please sign in again');
            done();
        });
    });
});