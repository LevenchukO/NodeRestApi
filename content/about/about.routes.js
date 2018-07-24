var express = require('express');
var router = express.Router();
var model = require('./about.model');

    // routes for about
    router.get('/about', function (req, res) {
        model.getAbout(req, res);
    })

    router.post('/about', function (req, res) {
        model.createAbout(req, res);
    })

    router.put('/about/:id', function (req, res) {
        model.updateAbout(req, res);
    })

    router.delete('/about/:id', function (req, res) {
        model.deleteAbout(req, res);
    })

module.exports = router;