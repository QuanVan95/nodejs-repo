const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    getCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('me/courses', {
                    deletedCount,
                    courses: multipleMongooseToObject(courses),
                })
            )
            .catch(next);
    }

    getTrashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: multipleMongooseToObject(courses),
                })
            )
            .catch(next);
    }
}

module.exports = new MeController();
