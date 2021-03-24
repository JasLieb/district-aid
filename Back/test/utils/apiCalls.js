var app = require('../../app');
var request = require('supertest');
var agent = request.agent(app);
var InterestPoint = require('../../models/interestPointsModel');
var User = require('../../models/userModel');

const getPoints = () => {
    return new Promise((resolve, error) => {
        agent.get('/api/points/')
        .end((err, res) => {
            if(err) error(err);
            else resolve(res);
        });
    });
}

const createPoint = (data) => {
    return new Promise((resolve, error) => {
        agent.post('/api/points/')
        .send(data)
        .end((err, res) => {
            if(err) error(err);
            else resolve(res);
        });
    });
}

const deletePoint = (data) => {
    return new Promise((resolve, error) => {
        agent.delete('/api/points/')
        .send(data)
        .end((err, res) => {
            if(err) error(err);
            else resolve(res);
        });
    });
}

const cleanDummyPoint = (data) =>
    new Promise((resolve, error) => {
        InterestPoint.deleteMany({
            name: data.name
        })
        .then(res => { resolve(); })
        .catch(err => { error(err); });
    });

const getPointsNear = (position, maxDistance) => {
    return new Promise((resolve, error) => {
        agent.get(`/api/points/nearMe?lat=${position.lat}&lng=${position.lng}&maxDistance=${maxDistance}`)
        .end((err, res) => {
            if(err) error(err);
            else resolve(res);
        });
    });
}

const registerDummy = (data) => {
    return new Promise((resolve, error) => {
        agent.post('/api/users/register')
        .send(data)
        .end((err, res) => {
            if(err) error(err);
            else resolve(res);
        });
    });
}

const loginDummy = (data) => {
    return new Promise((resolve, error) => {
        agent.post('/api/users/login')
        .send(data)
        .end((err, res) => {
            if(err) error(err);
            else resolve(res);
        });
    });
}

const loginDummyWithToken = (token) => {
    return new Promise((resolve, error) => {
        agent.post('/api/users/login')
        .set('Authorization', token)
        .end((err, res) => {
            if(err) error(err);
            else resolve(res);
        });
    });
}

const loginDummyWithDataAndToken = (token, data) => {
    return new Promise((resolve, error) => {
        agent.post('/api/users/login')
        .set('Authorization', token)
        .send(data)
        .end((err, res) => {
            if(err) error(err);
            else resolve(res);
        });
    });
}

const cleanDummyUser = (data) =>
    new Promise((resolve, error) => {
        User.deleteOne({
            name: data.name
        })
        .then(res => { resolve(); })
        .catch(err => { error(err); });
    });

module.exports = {
    getPoints,
    createPoint,
    deletePoint,
    cleanDummyPoint,
    getPointsNear,
    registerDummy,
    loginDummy,
    loginDummyWithToken,
    loginDummyWithDataAndToken,
    cleanDummyUser
}