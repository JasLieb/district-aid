var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('./middlewares/logger');

var indexRouter = require('./routes/indexRoute');
var usersRouter = require('./routes/usersRoute');
var pointsRouter = require('./routes/interestPointsRoute');

var app = express();

app.use(logger.morgan);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/points', pointsRouter);

// error handler
// TODO Log system into files one for errors, for auth, login ...
app.use(function(err, req, res, next) {
  logger.log.error(err);
  if(err.message)
    res.locals.message = err.message;
  else
    res.locals.error = err;

  res.status(err.status || 500)
    .send(err.message)
    .end();
});

module.exports = app;