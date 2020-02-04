require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('./middlewares/logger');

var indexRouter = require('./routes/indexRoute');
var usersRouter = require('./routes/usersRoute');
var pointsRouter = require('./routes/interestPoints');

var app = express();

app.use(logger);
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