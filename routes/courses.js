const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { validateCourse } = require('../middleware/validation');
const { createLimiter } = require('../middleware/rateLimiter');

router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.post('/', auth, createLimiter, validateCourse, upload.single('image'), courseController.createCourse);
router.put('/:id', auth, validateCourse, upload.single('image'), courseController.updateCourse);
router.delete('/:id', auth, courseController.deleteCourse);
router.post('/:id/apply', createLimiter, courseController.applyForCourse);

module.exports = router;

