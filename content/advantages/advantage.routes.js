var model = require('./advantage.model');
var express = require('express');
var router = express.Router();

    // routes for advantage
    router.get('/advantage', function (req, res) {
        model.getAdvItems(req, res);
    })

    router.post('/advantage', function (req, res) {
        model.createAdvItem(req, res);
    })

    router.put('/advantage/:id', function (req, res) {
        model.updateAdvItem(req, res);
    })

    router.delete('/advantage/:id', function (req, res) {
        model.deleteAdvItem(req, res);
    })

module.exports = router;