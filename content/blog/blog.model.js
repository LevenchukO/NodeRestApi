var mongoose = require('mongoose');

const blog_sch = new mongoose.Schema({
    heading_ru: String,
    text: String,
    heading_en: String,
    date: String,
    cover_img_url: String,
    cover_img_alt: String,
    isShow: Boolean,
    order: Number,
    pre_text: String,
})
var Blog_m = mongoose.model('Blog_m', blog_sch);

// --------------- crud for blog -----------------
exports.getBlogs = function (req, res) {
    Blog_m.find({}, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.getBlogById = function (req, res) {
    Blog_m.find({_id: req.params.id}, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}
exports.createBlog = function (req, res) {
  var newBlog = {
      heading_ru: req.body.heading_ru,
      text: req.body.text,
      heading_en: req.body.heading_en,
      date: req.body.date,
      cover_img_url: req.body.cover_img_url,
      cover_img_alt: req.body.cover_img_alt,
      isShow: req.body.isShow,
      order: req.body.order,
      pre_text: req.body.pre_text,
  }
  Blog_m.create(newBlog, function (err, doc) {
      if (err) {
          console.log(err);
          return res.sendStatus(500);
      }
      res.send(doc);
  })
}
exports.updateBlog = function (req, res) {
    Blog_m.findById(req.params.id, function (err, item) {
        if (err) {
            console.log(err)
        }
        item.set({
            heading_ru: req.body.heading_ru,
            text: req.body.text,
            heading_en: req.body.heading_en,
            date: req.body.date,
            cover_img_url: req.body.cover_img_url,
            cover_img_alt: req.body.cover_img_alt,
            isShow: req.body.isShow,
            order: req.body.order,
            pre_text: req.body.pre_text,
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
exports.deleteBlog = function (req, res) {
  Blog_m.deleteOne({_id: req.params.id}, function (err) {
      if (err) {
          console.log(err);
          return res.sendStatus(500);
      }
      res.sendStatus(200);
  })
}