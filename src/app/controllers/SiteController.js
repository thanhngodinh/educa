const Course = require('../models/Course');

class SiteController {
    // [GET] /
    index(req, res) {
        res.render('home');

        Course.find({}, function (err, course) {
            if (!err) {
                res.json(course);
                return;
            }
            res.status(400).json({ error: 'ERROR!' });
        });
    }
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
