var mongoose = require('mongoose');

const adv_sch = new mongoose.Schema({
    title: String,
    text: String,
    order: Number,
    isShow: Boolean,
    iconUrl: String,
    iconAlt: String,
})
var Adv_m = mongoose.model('Adv_m', adv_sch);

// --------------- crud for advantage -----------------
exports.getAdvItems = function (req, res) {
    Adv_m.find({}, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.createAdvItem = function (req, res) {
    var newAdvItem = {
        title: req.body.title,
        text: req.body.text,
        order: req.body.order,
        isShow: req.body.isShow,
        iconUrl: req.body.iconUrl,
        iconAlt: req.body.iconAlt,
    }
    Adv_m.create(newAdvItem, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.updateAdvItem = function (req, res) {
    Adv_m.findById(req.params.id, function (err, item) {
        if (err) {
            console.log(err)
        }
        item.set({
            title: req.body.title,
            text: req.body.text,
            order: req.body.order,
            isShow: req.body.isShow,
            iconUrl: req.body.iconUrl,
            iconAlt: req.body.iconAlt,
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
exports.deleteAdvItem = function (req, res) {
    Adv_m.deleteOne({_id: req.params.id}, function (err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
}