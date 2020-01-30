var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pointsRouter = require('./routes/interestPoints');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/points', pointsRouter);

// error handler
// TODO Log system into files one for errors, for auth, login ...
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

  // render the error page
  console.log(err);
  res.status(err.status || 500);
  res.send(err);
  res.end();
});

if(process.env.NODE_ENV != 'development'){
  app.listen(process.env.PORT);
}

module.exports = app;