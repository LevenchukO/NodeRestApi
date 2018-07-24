var model = require('./back-msg.model');
var express = require('express');
var router = express.Router();

    // routes for instagram
    router.get('/back_msg', function (req, res) {
        model.getMessages(req, res);
    })

    router.post('/back_msg', function (req, res) {
        model.createMessage(req, res);
    })

    router.put('/back_msg/:id', function (req, res) {
        model.updateMessage(req, res);
    })

    router.delete('/back_msg/:id', function (req, res) {
        model.deleteMessage(req, res);
    })

module.exports = router;