const express = require('express');
const router = express.Router();
const vacancyController = require('../controllers/vacancyController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { createLimiter } = require('../middleware/rateLimiter');

router.get('/', vacancyController.getAllVacancies);
router.get('/:id', vacancyController.getVacancyById);
router.post('/', auth, createLimiter, upload.single('image'), vacancyController.createVacancy);
router.put('/:id', auth, upload.single('image'), vacancyController.updateVacancy);
router.delete('/:id', auth, vacancyController.deleteVacancy);

module.exports = router;
