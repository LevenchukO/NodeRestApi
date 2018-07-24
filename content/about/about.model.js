var mongoose = require('mongoose');

const about_sch = new mongoose.Schema({
    title: String,
    text: String,
    img_alt: String,
    isShow: Boolean,
})
var About_m = mongoose.model('About_m', about_sch);

// --------------- crud for blog -----------------
exports.getAbout = function (req, res) {
    About_m.find({}, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.createAbout = function (req, res) {
    var newAbout = {
        title: req.body.title,
        text: req.body.text,
        img_alt: req.body.img_alt,
        isShow: req.body.isShow
    }
    About_m.create(newAbout, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.updateAbout = function (req, res) {
    About_m.findById(req.params.id, function (err, item) {
        if (err) {
            console.log(err)
        }
        item.set({
            title: req.body.title,
            text: req.body.text,
            img_alt: req.body.img_alt,
            isShow: req.body.isShow
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
exports.deleteAbout = function (req, res) {
    About_m.deleteOne({_id: req.params.id}, function (err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
}