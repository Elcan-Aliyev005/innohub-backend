const express = require('express');
const router = express.Router();
const graduateController = require('../controllers/graduateController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', graduateController.getAllGraduates);
router.post('/', auth, upload.single('image'), graduateController.createGraduate);
router.delete('/:id', auth, graduateController.deleteGraduate);

module.exports = router;

