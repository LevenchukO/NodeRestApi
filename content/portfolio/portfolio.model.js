var mongoose = require('mongoose');

const portServ_sch = new mongoose.Schema({
    name_ru: String,
    name_en: String,
    isShow: Boolean,
    order: Number,
});
const portAlbum_sch = new mongoose.Schema({
    name_ru: String,
    name_en: String,
    pre_text: String,
    cover_img_url: String,
    order: Number,
    isShow: Boolean,
    alt: String,
    serv_id: String
})
const portPhoto_sch = new mongoose.Schema({
    alt: String,
    url: String,
    album_name: String,
    serv_id: String,
    order: Number,
    isShow: Boolean,
})
var Portfolio_m = mongoose.model('Portfolio_m', portServ_sch);
var Photo_m = mongoose.model('Photo_m', portPhoto_sch);
var Album_m = mongoose.model('Album_m', portAlbum_sch);

// -------------------crud for portServ-------------------
exports.getPortServAll = function (req, res) {
    Portfolio_m.find({}, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.getPortServById = function (req, res) {
    Portfolio_m.findById(req.params.id, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        // res.send(doc);
        res.send(doc);
    })
}
exports.getPortServByName = function (req, res) {
    Portfolio_m.find({name_en: req.params.name_en}, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        // res.send(doc);
        res.send(doc);
    })
}
exports.create = function (req, res) {
    var newPortServ = {
        name_ru: req.body.name_ru,
        name_en: req.body.name_en,
        isShow: req.body.isShow,
        order: req.body.order,
        album_id: req.params.album_id,
        serv_id: req.params.serv_id,
    }
    Portfolio_m.create(newPortServ, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.update = function (req, res) {
    Portfolio_m.findById(req.params.id, function (err, item) {
        if (err) {
            console.log(err)
        }
        item.set({
            name_ru: req.body.name_ru,
            name_en: req.body.name_en,
            isShow: req.body.isShow,
            order: req.body.order
        });
        item.save(function (err, updatedItem) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.send(updatedItem)
        })
    })
}
exports.delete = function (req, res) {
    Album_m.deleteMany({serv_id: req.params.id}, function (err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    })
    Photo_m.deleteMany({serv_id: req.params.id}, function (err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    })
    Portfolio_m.deleteOne({_id: req.params.id}, function (err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
}

// ------------------- crud for portAlbum -------------------
exports.getAlbums = function (req, res) {
    Album_m.find({}, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.getAlbumsByServId = function (req, res) {
    Album_m.find({serv_id: req.params.serv_id}, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.getAlbumByName = function (req, res) {
    Album_m.find({name_en: req.params.name_en}, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        // res.send(doc);
        res.send(doc);
    })
}
exports.createAlbum = function (req, res) {
    var newAlbum = {
        name_ru: req.body.name_ru,
        name_en: req.body.name_en,
        pre_text: req.body.pre_text,
        cover_img_url: req.body.cover_img_url,
        order: req.body.order,
        isShow: req.body.isShow,
        serv_id: req.body.serv_id,
        alt: req.body.alt,
    }
    Album_m.create(newAlbum, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.updateAlbum = function (req, res) {
    Album_m.findById(req.params.id, function (err, item) {
        if (err) {
            console.log(err)
        }
        item.set({
            name_ru: req.body.name_ru,
            name_en: req.body.name_en,
            pre_text: req.body.pre_text,
            cover_img_url: req.body.cover_img_url,
            order: req.body.order,
            isShow: req.body.isShow,
            serv_id: req.body.serv_id,
            alt: req.body.alt,
        });
        item.save(function (err, updatedItem) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.send(updatedItem)
        })
    })
}
exports.deleteAlbum = function (req, res) {
    Photo_m.deleteMany({album_name: req.params.name}, function (err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    })
    Album_m.deleteOne({_id: req.params.id}, function (err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
}

// ------------------- crud for albumPhoto -------------------
exports.getPhotosAll = function (req, res) {
    Photo_m.find({}, function (err, photos) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(photos);
    })
}
exports.getPhotosByAlbumName = function (req, res) {
    Photo_m.find({album_name: req.params.album_name}, function (err, photos) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(photos);
    })
}
exports.createPhoto = function (req, res) {
    var newPhoto = {
        alt: req.body.alt,
        url: req.body.url,
        serv_id: req.body.serv_id,
        album_name: req.body.album_name,
        order: req.body.order,
        isShow: req.body.isShow,
    }
    Photo_m.create(newPhoto, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.updatePhoto = function (req, res) {
    Photo_m.findById(req.params.id, function (err, item) {
        if (err) {
            console.log(err)
        }
        item.set({
            alt: req.body.alt,
            url: req.body.url,
            serv_id: req.body.serv_id,
            album_name: req.body.album_name,
            order: req.body.order,
            isShow: req.body.isShow,
            imgName: req.body.imgName,
        });
        item.save(function (err, updatedItem) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.send(updatedItem)
        })
    })
}
exports.deletePhoto = function (req, res) {
    Photo_m.deleteOne({_id: req.params.id}, function (err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
}