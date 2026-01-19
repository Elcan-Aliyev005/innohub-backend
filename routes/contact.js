const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const auth = require('../middleware/auth');
const { validateContact } = require('../middleware/validation');
const { createLimiter } = require('../middleware/rateLimiter');

router.get('/', auth, contactController.getAllContacts);
router.post('/', createLimiter, validateContact, contactController.submitContact);

module.exports = router;

