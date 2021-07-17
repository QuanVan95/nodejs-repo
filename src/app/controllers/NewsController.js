class NewsController {
    index(req, res) {
        res.render('news');
    }

    //news:slug
    show(req, res) {
        res.send('new-detail!');
    }
}

module.exports = new NewsController();
