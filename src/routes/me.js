// Home search contact
const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/courses', meController.getCourses);
router.get('/trash/courses', meController.getTrashCourses);

module.exports = router;
