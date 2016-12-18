var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var index = require('./routes/index');
var users = require('./routes/users');
const routes = require('./routes/index');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler




const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy,
    User = require("./Models/Task").User;

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function (username, password, done) {
        User.findOne({email: username}, function (err, user) {
            "use strict";
            if (err) {
                console.error(err);
                return done(null, false, {message: 'Incorrect username.'});
            }
            else if(user) {
                console.log(user);
                if (user.password !== password) return done(null, false, {message: 'Incorrect password.'});
            }
            else{
                return done(null, false, {message: 'user not found'});
            }
            return done(null, user);
        })
    }
));
app.use(passport.initialize());
app.use(passport.session());
//app.use(app.router);
app.post('/login', (req, res, next) => {
    console.log(req.body);
    passport.authenticate('local', (err, user) => {
        if (!err) {
            req.session.user = user;
            res.redirect('/index1');
        }
    })(req, res, next)
});
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    User.findOne({email: user.email}, function (err, user) {
        done(err, user);
    });
});
app.all('\/login|\/registerme', (req, res, next) => {
    console.log("middleware work");
    req.checkBody('username', 'Invalid postparam').notEmpty().isEmail();
    req.checkBody('password', 'Длина пароля должна быть 4-12 символов').isLength({min: 4, max: 12});
    next();
});
app.use('/', routes);
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error.pug');
});
module.exports = app;