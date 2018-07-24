var model = require('./img.model');
var express = require('express');
var router = express.Router();


// routes for folder

router.get('/img-folder', function (req, res) {
    model.getFolders(req, res);
})

router.post('/img-folder', function (req, res) {
    model.addFolder(req, res);
})

router.put('/img-folder', function (req, res) {
    model.editFolder(req, res);
})

router.delete('/img-folder/:id/:name', function (req, res) {
    model.deleteFolder(req, res);
})


// routes for img
router.get('/img/:folder/:name', function (req, res) {
    model.getImageByName(req, res);
});

router.get('/img/:folder', function (req, res) {
    model.getImgsByFolderFromDB(req, res);
});

router.post('/img/:folder', function (req, res) {
    model.uploadImg(req, res);
});

router.delete('/img/:folder/:name', function (req, res) {
    model.deleteImg(req, res);
})


module.exports = router;