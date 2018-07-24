var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

var url = 'mongodb://localhost:27017';
const dbName = 'test-bd';

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(cors({
    origin: ['http://localhost:4000', 'http://localhost:4200'],
    credentials: true
}));

// connect to mongodb
mongoose.connect(`${url}/${dbName}`, {promiseLibrary: require('bluebird'), useNewUrlParser: true});
var goose = mongoose.connection;
goose.on('error', console.error.bind(console, 'connection error:'));
goose.once('open', function () {
    // we're connected!
    console.log('mongose is conected')
});

// passport
require('./auth/passport')(app);

// get routes
require('./routes/routes.barrel')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
