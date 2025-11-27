const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const { authLimiter, createLimiter } = require('../middleware/rateLimiter');
const { validateAdminLogin, validateAdminCreate } = require('../middleware/validation');
const checkSecretKey = require('../middleware/checkSecretKey');

router.post('/login', authLimiter, validateAdminLogin, adminController.login);
router.post('/create', createLimiter, checkSecretKey, validateAdminCreate, adminController.createAdmin);

module.exports = router;

