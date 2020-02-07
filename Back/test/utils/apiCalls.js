var request = require('supertest');
var db = require('../../factories/databaseMariaFactory');
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
        db.query(`delete from users where name='${data.name}' and email='${data.email}'`) 
        .then(res => { resolve(); })
        .catch(err => { error(err); });
    });

module.exports = {
    getPoints,
    regiterDummy,
    loginDummy,
    loginDummyWithToken,
    deleteDummy
}