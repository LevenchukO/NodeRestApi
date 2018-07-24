var model = require('./instagram.model');
var express = require('express');
var router = express.Router();

    // routes for instagram
    router.get('/instagram', function (req, res) {
        model.getInstaItems(req, res);
    })

    router.post('/instagram', function (req, res) {
        model.createInstaItem(req, res);
    })

    router.put('/instagram/:id', function (req, res) {
        model.updateInstaItem(req, res);
    })

    router.delete('/instagram/:id', function (req, res) {
        model.deleteInstaItem(req, res);
    })

    module.exports = router;