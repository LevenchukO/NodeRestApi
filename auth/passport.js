var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var User = require('./user.model');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');

module.exports = function (app) {

    app.use(session({
        name: 'myname.sid',
        resave: false,
        saveUninitialized: false,
        secret: 'secret',
        cookie: {
            maxAge: 36000000,
            httpOnly: false,
            secure: false
        },
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    }));

    passport.use('local', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(username, password, done) {
            User.findOne({ email: username }, function(err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.isValid(password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    app.use(passport.initialize());
    app.use(passport.session());

}