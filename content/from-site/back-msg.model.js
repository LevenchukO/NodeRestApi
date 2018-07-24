var mongoose = require('mongoose');

const msg_sch = new mongoose.Schema({
    name: String,
    from: String,
    date: String,
    contact_number: String,
    isShow: Boolean,
    photoService: String,
    email: String,
    massage: String,
})
var Msg_m = mongoose.model('Msg_m', msg_sch);

// --------------- crud for Message -----------------
exports.getMessages = function (req, res) {
    Msg_m.find({}, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.createMessage = function (req, res) {
    var newMsg = {
        name: req.body.name,
        from: req.body.from,
        date: req.body.date,
        contact_number: req.body.contact_number,
        isShow: req.body.isShow,
        photoService: req.body.photoService,
        email: req.body.email,
        massage: req.body.massage,
    }
    console.log(req.body);
    Msg_m.create(newMsg, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.updateMessage = function (req, res) {
    Msg_m.findById(req.params.id, function (err, item) {
        if (err) {
            console.log(err)
        }
        item.set({
            name: req.body.name,
            from: req.body.from,
            date: req.body.date,
            contact_number: req.body.contact_number,
            isShow: req.body.isShow,
            photoService: req.body.photoService,
            email: req.body.email,
            massage: req.body.massage,
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
exports.deleteMessage = function (req, res) {
    Msg_m.deleteOne({_id: req.params.id}, function (err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
}