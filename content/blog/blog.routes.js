var model = require('./blog.model');
var express = require('express');
var router = express.Router();

    // routes for blog
    router.get('/blog', function (req, res) {
        model.getBlogs(req, res);
    })

    router.get('/blog/:id', function (req, res) {
        model.getBlogById(req, res);
    })

    router.post('/blog', function (req, res) {
        model.createBlog(req, res);
    })

    router.put('/blog/:id', function (req, res) {
        model.updateBlog(req, res);
    })

    router.delete('/blog/:id', function (req, res) {
        model.deleteBlog(req, res);
    })

module.exports = router;