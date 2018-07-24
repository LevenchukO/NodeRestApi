var model = require('./ph-serv.model');
var express = require('express');
var router = express.Router();

    // ------------routes for phServices------------
    router.get('/services', function (req, res) {
        model.getServices(req, res);
    })

    router.get('/services/:name', function (req, res) {
        model.getServiceByName(req, res);
    })

    router.post('/services', function (req, res) {
        model.createService(req, res);
    })

    router.put('/services/:id', function (req, res) {
        model.updateService(req, res);
    })

    router.delete('/services/:id', function (req, res) {
        model.deleteService(req, res);
    })

    // ------------routes for prices------------
    router.get('/prices', function (req, res) {
        model.getPriceAll(req, res);
    })

    router.get('/prices/:serv_id', function (req, res) {
        model.getPriceByServId(req, res);
    })

    router.get('/prices/s_name/:serv_name', function (req, res) {
        model.getPriceByServName(req, res);
    })

    router.post('/prices', function (req, res) {
        model.createPrice(req, res);
    })

    router.put('/prices/:id', function (req, res) {
        model.updatePrice(req, res);
    })

    router.delete('/prices/:id', function (req, res) {
        model.deletePrice(req, res);
    })

    // ------------routes for price descriptions------------
    router.get('/price_desc', function (req, res) {
        model.getPDescAll(req, res);
    })

    router.get('/price_desc/:price_id', function (req, res) {
        model.getPDescByPriceId(req, res);
    })

    router.post('/price_desc', function (req, res) {
        model.createPDesc(req, res);
    })

    router.put('/price_desc/:id', function (req, res) {
        model.updatePDesc(req, res);
    })

    router.delete('/price_desc/:id', function (req, res) {
        model.deletePDesc(req, res);
    })

    // ------------routes for add info------------
    router.get('/services_add_info', function (req, res) {
        model.getAddInfoAll(req, res);
    })

    router.get('/services_add_info/:serv_id', function (req, res) {
        model.getAddInfoByServId(req, res);
    })

    router.get('/services_add_info/s_name/:serv_name', function (req, res) {
        model.getAddInfoByServName(req, res);
    })

    router.post('/services_add_info', function (req, res) {
        model.createInfoItem(req, res);
    })

    router.put('/services_add_info/:id', function (req, res) {
        model.updateInfoItem(req, res);
    })

    router.delete('/services_add_info/:id', function (req, res) {
        model.deleteInfoItem(req, res);
    })

module.exports = router;