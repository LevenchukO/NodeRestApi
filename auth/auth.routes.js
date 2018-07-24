var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('./user.model');
var isAuth = require('./isAuth');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/register', function (req, res, next) {
    addToDB(req, res);
})

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return res.status(502).json(err); }
        if (!user) { return res.status(501).json(info); }
        req.logIn(user, function(err) {
            if (err) { return res.status(502).json(err); }
            return res.status(200).json({message: 'Login success'});
        });
    })(req, res, next);
});

router.get('/user', isAuth, function (req, res, next) {
    return res.status(200).json(req.user);
});

router.get('/logout', isAuth, function (req, res, next) {
    req.logout();
    return res.status(200).json({message: 'Logout Succes'});
})

async function addToDB(req, res){
    var user = new User({
        email:req.body.email,
        username: req.body.username,
        password: User.hashPassword(req.body.password),
        creation_dt:Date.now()
    });
    try {
        doc = await user.save();
        return res.status(201).json(doc);
    }
    catch (e) {
        return res.status(501).json(e);
    }
}

module.exports = router;