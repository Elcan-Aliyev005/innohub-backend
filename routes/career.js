const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');
const auth = require('../middleware/auth');

router.get('/applications/all', auth, careerController.getAllCareerApplications);
router.post('/apply', careerController.apply);

module.exports = router;

