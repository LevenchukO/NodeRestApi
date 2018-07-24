module.exports = function (app) {
    app.use('/', require('../auth/auth.routes'));
    app.use('/', require('../content/about/about.routes'));
    app.use('/', require('../content/advantages/advantage.routes'));
    app.use('/', require('../content/blog/blog.routes'));
    app.use('/', require('../content/from-site/back-msg.routes'));
    app.use('/', require('../content/instagram/instagram.routes'));
    app.use('/', require('../content/PhServises/ph-serv.routes'));
    app.use('/', require('../content/portfolio/portfolio.routes'));
    app.use('/', require('../imgUploader/img.routes'));
}