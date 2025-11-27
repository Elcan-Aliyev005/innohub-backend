const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', teacherController.getAllTeachers);
router.post('/', auth, upload.single('image'), teacherController.createTeacher);
router.put('/:id', auth, upload.single('image'), teacherController.updateTeacher);
router.delete('/:id', auth, teacherController.deleteTeacher);

module.exports = router;

