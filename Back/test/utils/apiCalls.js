var request = require('supertest');
var User = require('../../models/userModel');
var app = require('../../app');
var agent = request.agent(app);

const getPoints = () => {
    return new Promise((resolve, error) => {
        agent.get('/points/')
        .end((err, res) => {
            if(err) error(err);
            else resolve(res);
        });
    });
}

const regiterDummy = (data) => {
    return new Promise((resolve, error) => {
        agent.post('/users/register')
        .send(data)
        .end((err, res) => {
            if(err) error(err);
            else resolve(res);
        });
    });
}

const loginDummy = (data) => {
    return new Promise((resolve, error) => {
        agent.post('/users/login')
        .send(data)
        .end((err, res) => {
            if(err) error(err);
            else resolve(res);
        });
    });
}

const loginDummyWithToken = (token) => {
    return new Promise((resolve, error) => {
        agent.post('/users/login')
        .set('Authorization', token)
        .end((err, res) => {
            if(err) error(err);
            else resolve(res);
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

module.exports = {
    getPoints,
    regiterDummy,
    loginDummy,
    loginDummyWithToken,
    deleteDummy
}