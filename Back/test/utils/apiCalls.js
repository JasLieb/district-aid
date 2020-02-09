var app = require('../../app');
var request = require('supertest');
var agent = request.agent(app);
var db = require('../../factories/databaseMariaFactory');

const getPoints = () => {
    return new Promise((resolve, error) => {
        agent.get('/api/points/')
        .end((err, res) => {
            if(err) error(err);
            else resolve(res);
        });
    });
}

const getPointsNear = (position) => {
    return new Promise((resolve, error) => {
        agent.get('/api/points/nearMe')
        .send({position})
        .end((err, res) => {
            if(err) error(err);
            else resolve(res);
        });
    });
}

const regiterDummy = (data) => {
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

const deleteDummy = (data) =>
    new Promise((resolve, error) => {
        db.query(`delete from users where name='${data.name}' and email='${data.email}'`) 
        .then(res => { resolve(); })
        .catch(err => { error(err); });
    });

module.exports = {
    getPoints,
    getPointsNear,
    regiterDummy,
    loginDummy,
    loginDummyWithToken,
    loginDummyWithDataAndToken,
    deleteDummy
}