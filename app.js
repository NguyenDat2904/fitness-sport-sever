var createError = require('http-errors');
var express = require('express');
var app = express();
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Connect_DB = require('./config/db');
// Connect Mongo Database
Connect_DB();
const router = require('./routes/index');
const handleErrorMiddleware = require('./middleware/handleError.middleware');

// Cors
app.use(
    cors({
        origin: '*',
    }),
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// Router
router(app);

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
app.use(handleErrorMiddleware);

module.exports = app;
