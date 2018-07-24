var model = require('./portfolio.model');
var express = require('express');
var router = express.Router();

    // routes for photos
    // ------------------
    router.get('/portfolio_photos', function (req, res) {
        model.getPhotosAll(req, res);
    })

    router.get('/portfolio_photos/name/:album_name', function (req, res) {
        model.getPhotosByAlbumName(req, res);
    })

    router.post('/portfolio_photos', function (req, res) {
        model.createPhoto(req, res);
    })

    router.put('/portfolio_photos/:id', function (req, res) {
        model.updatePhoto(req, res);
    })

    router.delete('/portfolio_photos/:id', function (req, res) {
        model.deletePhoto(req, res);
    })

    //routes for albums
    // ------------------
    router.get('/portfolio_albums', function (req, res) {
        model.getAlbums(req, res);
    })

    router.get('/portfolio_albums/:serv_id', function (req, res) {
        model.getAlbumsByServId(req, res);
    })

    router.get('/portfolio_albums/name/:name_en', function (req, res) {
        model.getAlbumByName(req, res);
    })

    router.post('/portfolio_albums/', function (req, res) {
        model.createAlbum(req, res);
    })

    router.put('/portfolio_albums/:id', function (req, res) {
        model.updateAlbum(req, res);
    })

    router.delete('/portfolio_albums/album_name/:name/:id', function (req, res) {
        model.deleteAlbum(req, res);
    })

    // routes for services
    //-------------------
    router.get('/portfolio', function (req, res) {
        model.getPortServAll(req, res);
    })

    router.get('/portfolio/name/:name_en', function (req, res) {
        model.getPortServByName(req, res);
    })

    router.get('/portfolio/:id', function (req, res) {
        model.getPortServById(req, res);
    })

    router.post('/portfolio', function (req, res) {
        model.create(req, res);
    })

    router.put('/portfolio/:id', function (req, res) {
        model.update(req, res);
    })

    router.delete('/portfolio/:id', function (req, res) {
        model.delete(req, res);
    })


module.exports = router;