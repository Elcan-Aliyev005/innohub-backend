const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { validateContact } = require('../middleware/validation');
const { createLimiter } = require('../middleware/rateLimiter');

router.post('/', createLimiter, validateContact, contactController.submitContact);

module.exports = router;

