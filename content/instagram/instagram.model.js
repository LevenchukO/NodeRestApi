var mongoose = require('mongoose');

const insta_sch = new mongoose.Schema({
    imgUrl: String,
    instagramUrl: String,
    isShow: Boolean,
    order: Number,
    alt: String,
})
var Insta_m = mongoose.model('Insta_m', insta_sch);

// --------------- crud for blog -----------------
exports.getInstaItems = function (req, res) {
    Insta_m.find({}, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.createInstaItem = function (req, res) {
    var newInstaItem = {
        imgUrl: req.body.imgUrl,
        instagramUrl: req.body.instagramUrl,
        isShow: req.body.isShow,
        order: req.body.order,
        alt: req.body.alt
    }
    Insta_m.create(newInstaItem, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.updateInstaItem = function (req, res) {
    Insta_m.findById(req.params.id, function (err, item) {
        if (err) {
            console.log(err)
        }
        item.set({
            imgUrl: req.body.imgUrl,
            instagramUrl: req.body.instagramUrl,
            isShow: req.body.isShow,
            order: req.body.order,
            alt: req.body.alt
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
exports.deleteInstaItem = function (req, res) {
    Insta_m.deleteOne({_id: req.params.id}, function (err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
}