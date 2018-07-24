var mongoose = require('mongoose');

const ph_serv_sch = new mongoose.Schema({
    heading: String,
    name_ru: String,
    name_en: String,
    description_head: String,
    description_text: String,
    cover_img_url: String,
    cover_img_alt: String,
    isShow: Boolean,
    order: Number,
})
const price_sch = new mongoose.Schema({
    name_ru: String,
    serv_id: String,
    serv_name: String,
    cost: String,
    order: Number
})
const price_desc_sch = new mongoose.Schema({
    price_id: String,
    serv_id: String,
    text: String,
    order: Number,
})
const add_info_sch = new mongoose.Schema({
    serv_id: String,
    serv_name: String,
    text: String,
    order: Number
})

var Ph_serv_m = mongoose.model('Ph_serv_m', ph_serv_sch);
var Price_m = mongoose.model('Price_m', price_sch);
var Price_desc_m = mongoose.model('Price_desc_m', price_desc_sch);
var Add_info_m = mongoose.model('Add_info_m', add_info_sch);

// ---------------- crud for serv -----------------
exports.getServices = function (req, res) {
    Ph_serv_m.find({}, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.getServiceByName = function (req, res) {
    Ph_serv_m.find({name_en: req.params.name}, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.createService = function (req, res) {
  var newServ = {
      heading: req.body.heading,
      name_ru: req.body.name_ru,
      name_en: req.body.name_en,
      description_head: req.body.description_head,
      description_text: req.body.description_text,
      cover_img_url: req.body.cover_img_url,
      cover_img_alt: req.body.cover_img_alt,
      isShow: req.body.isShow,
      order: req.body.order,
  }
    Ph_serv_m.create(newServ, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.updateService = function (req, res) {
    Ph_serv_m.findById(req.params.id, function (err, item) {
        if (err) {
            console.log(err)
        }
        item.set({
            heading: req.body.heading,
            name_ru: req.body.name_ru,
            name_en: req.body.name_en,
            description_head: req.body.description_head,
            description_text: req.body.description_text,
            cover_img_url: req.body.cover_img_url,
            cover_img_alt: req.body.cover_img_alt,
            isShow: req.body.isShow,
            order: req.body.order,
            _id: req.body._id
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
exports.deleteService = function (req, res) {
    Price_m.deleteMany({serv_id: req.params.id}, function (err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    })
    Price_desc_m.deleteMany({serv_id: req.params.id}, function (err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    })
    Add_info_m.deleteMany({serv_id: req.params.id}, function (err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    })
    Ph_serv_m.deleteOne({_id: req.params.id}, function (err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
}
// ----------------- crud for price ----------------
exports.getPriceAll = function (req, res) {
    Price_m.find({}, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.getPriceByServId = function (req, res) {
    Price_m.find({serv_id: req.params.serv_id}, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.getPriceByServName = function (req, res) {
    Price_m.find({serv_name: req.params.serv_name}, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.createPrice = function (req, res) {
   var newPrice = {
        name_ru: req.body.name_ru,
        serv_id: req.body.serv_id,
        serv_name: req.body.serv_name,
        cost: req.body.cost,
        order: req.body.order,
   }
    Price_m.create(newPrice, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.updatePrice = function (req, res) {
    Price_m.findById(req.params.id, function (err, item) {
        if (err) {
            console.log(err)
        }
        item.set({
            name_ru: req.body.name_ru,
            serv_id: req.body.serv_id,
            serv_name: req.body.serv_name,
            cost: req.body.cost,
            order: req.body.order,
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
exports.deletePrice = function (req, res) {
    Price_desc_m.deleteMany({price_id: req.params.id}, function (err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    })
    Price_m.deleteOne({_id: req.params.id}, function (err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
}
// ------------------ crud for price desc ---------------
exports.getPDescAll = function (req, res) {
    Price_desc_m.find({}, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.getPDescByPriceId = function (req, res) {
    Price_desc_m.find({price_id: req.params.price_id}, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.createPDesc = function (req, res) {
  var newPriceDesc = {
        price_id: req.body.price_id,
        serv_id: req.body.serv_id,
        text: req.body.text,
        order: req.body.order,
  }
    Price_desc_m.create(newPriceDesc, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.updatePDesc = function (req, res) {
    Price_desc_m.findById(req.params.id, function (err, item) {
        if (err) {
            console.log(err)
        }
        item.set({
            price_id: req.body.price_id,
            serv_id: req.body.serv_id,
            text: req.body.text,
            order: req.body.order,
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
exports.deletePDesc = function (req, res) {
    console.log(req.params.id);
    Price_desc_m.deleteOne({_id: req.params.id}, function (err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
}
// ----------------- crud for add info ----------------
exports.getAddInfoAll = function (req, res) {
    Add_info_m.find({}, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.getAddInfoByServId = function (req, res) {
    Add_info_m.find({serv_id: req.params.serv_id}, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.getAddInfoByServName = function (req, res) {
    Add_info_m.find({serv_name: req.params.serv_name}, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.createInfoItem = function (req, res) {
  var newInfoItem = {
      serv_id: req.body.serv_id,
      serv_name: req.body.serv_name,
      text: req.body.text,
      order: req.body.order,
  }
    Add_info_m.create(newInfoItem, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.updateInfoItem = function (req, res) {
    Add_info_m.findById(req.params.id, function (err, item) {
        if (err) {
            console.log(err)
        }
        item.set({
            serv_id: req.body.service_id,
            text: req.body.text,
            order: req.body.order,
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
exports.deleteInfoItem = function (req, res) {
    Add_info_m.deleteOne({_id: req.params.id}, function (err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
}