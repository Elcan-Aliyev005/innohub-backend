const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');
const auth = require('../middleware/auth');
const { createLimiter } = require('../middleware/rateLimiter');

router.get('/', faqController.getAllFAQs);
router.get('/:id', faqController.getFAQById);
router.post('/', auth, createLimiter, faqController.createFAQ);
router.put('/:id', auth, faqController.updateFAQ);
router.delete('/:id', auth, faqController.deleteFAQ);

module.exports = router;

