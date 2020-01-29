const express = require('express');
const router = express.Router();
const authentification = require('../middlewares/authentification');
const {ObjectID}  = require('mongodb')
var usersFactory = require('../factories/usersFactory');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.end();
});

router.post('/register', function (req, res, next) {
  usersFactory.createNewUser(req.body);
  res.end();
});

router.post('/login', authentification, function (req, res, next) {
  //usersFactory.make
  res.end();
});

module.exports = router;
