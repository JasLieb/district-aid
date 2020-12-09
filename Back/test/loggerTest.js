const fileTools = require('./utils/fileTools');
const calls = require('./utils/apiCalls');
var assert = require('assert');

describe('Logger tests', () => {
    describe('Log #GET request without body', () => {
        before((done) => {
            calls.getPoints()
            .then(_ => done()) // Ignore response parameter 
            .catch(done); // Will call done with error 
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
            const dummyName = "Dummy missPS";
            const dummyEmail = "Dummy.miss@pass.word";
            const dummy = {name: dummyName, email: dummyEmail};
            before((done) => {
                calls.registerDummy(dummy)
                .then(_ => done()) // Ignore response parameter
                .catch(_ => done()); // Avoid error handling and tests fails
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

            after((done) => {
                calls.cleanDummyUser(dummy).then(done).catch(done);
            });
        });
    });

    describe('Log #POST login request ', () => {
        describe('Log #POST login request with password', () => {
            const dummyName = "Dummy pass";
            const dummyEmail = "Dummy.with@pass.word";
            const dummyPassword = "MyP4ZZVV0RDEZ";
            const dummy = {name: dummyName, password: dummyPassword, email: dummyEmail};
            const dummyWithoutPassword = {name: dummyName, email: dummyEmail};
            before(
                (done) => {
                    calls.registerDummy(dummy)
                    .then(
                        _ => 
                            calls.loginDummy(dummy)
                            .then(_ => done())
                            .catch(done)
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

            after((done) => {
                calls.cleanDummyUser(dummy).then(done).catch(done);
            });
        });

        describe('Log #POST login request with token', () => {
            const dummyName = "Dummy Foo";
            const dummyEmail = "Dummy.Foo@asylum.io";
            const dummyPassword = "MyP4ZZVV0RDEZ";
            const dummy = {name: dummyName, password: dummyPassword, email: dummyEmail};
            before(
                (done) => {
                    calls.registerDummy(dummy)
                    .then(
                        _ => 
                            calls.loginDummyWithToken(process.env.TOKEN_OLD_TEST)
                            .then(_ => done())
                            .catch(done)
                    )
                    .catch(done)
                }
            );

            it('Logger expects to avoid write token', (done) => {
                fileTools
                    .getLastLine('logs/all-logs.log', 64)
                    .then((lastLine) => {
                        assert.ok(!lastLine.includes('authorization'));
                        assert.ok(!lastLine.includes(process.env.TOKEN_OLD_TEST));
                        done();
                    })
                    .catch(done);
            });

            after((done) => {
                calls.cleanDummyUser(dummy).then(done).catch(done);
            });
        });
    });

});