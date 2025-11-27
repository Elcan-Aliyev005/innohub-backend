const express = require('express');
const router = express.Router();
const scholarshipController = require('../controllers/scholarshipController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', scholarshipController.getAllScholarships);
router.post('/', auth, upload.single('image'), scholarshipController.createScholarship);
router.put('/:id', auth, upload.single('image'), scholarshipController.updateScholarship);
router.delete('/:id', auth, scholarshipController.deleteScholarship);

module.exports = router;

