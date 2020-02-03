var assert = require('assert');
var request = require('supertest');
var User = require('../models/userModel');
var app = require('../app');
var agent = request.agent(app);

const dummyName = "Dummy Foo";
const dummyEmail = "Dummy.Foo@asylum.io";
const dummyPassword = "MyP4ZZVV0RDEZ";
const totoEmail = "totoCfollegue@toto.fr";
const totoPassword = "totoestlemotdepasse";


describe('/user tests', () => {
    describe('#POST /register no errors', () => {
        var response;
        before((done) => {
            agent.post('/users/register')
                .send({
                    "name": dummyName,
                    "password": dummyPassword,
                    "email": dummyEmail
                })
                .end((err, res) => {
                    if(err) done(err);
                    else {
                        response = res;
                        done();
                    }
                });
        });

        it('Expect response have status 200', (done) => {
            assert.ok(response.status == 200);
            done();
        });

        it('Expect response have tokens', (done) => {
            assert.ok(response.body.token);
            done();
        });

        after((done) => {
            User.deleteOne({name: dummyName, email: dummyEmail}, (err) => {
                done(err);
            });
        });
    });
    
    describe('#POST /login without token', () => {
        var response;
        before((done) => {
            agent.post('/users/register')
                .send({
                    "name": dummyName,
                    "password": totoPassword,
                    "email": totoEmail
                })
                .end((err, res) => {
                    if(err) done(err);
                    else {
                        response = res;
                        done();
                        
                        agent.post('/users/login')
                            .send({
                                "email": totoEmail,
                                "password": totoPassword
                            })
                            .end((err, res) => {
                                if(err) { done(err);}
                                else {
                                    response = res;
                                    done();
                                }
                            });
                    }
                });

        });

        it('Expect response have status 200', (done) => {
            assert.ok(response.status == 200);
            done();
        });

        it('Expect response have token', (done) => {
            assert.ok(response.body.token);
            done();
        });

        after((done) => {
            User.deleteOne({name: dummyName, email: dummyEmail}, (err) => {
                done(err);
            });
        });
    });

    describe('#POST /login with token', () => {
        var response;
        before((done) => {
            agent.post('/users/register')
                .send({
                    "name": dummyName,
                    "password": totoPassword,
                    "email": totoPassword
                })
                .end((err, res) => {
                    if(err) done(err);
                    else {
                        response = res;
                        done();

                        agent.post('/users/login')
                            .set('Token', response.body.token)
                            .send({
                                'email': totoEmail,
                                'password': totoPassword
                            })
                            .end((err, res) => {
                                if(err) { done(err);}
                                else {
                                    response = res;
                                    done();
                                }
                            });
                    }
                });

        });

        it('Expect response have status 200', (done) => {
            assert.ok(response.status == 200);
            done();
        });

        it('Expect response still have token', (done) => {
            assert.ok(response.body.token);
            done();
        });
    });
});
