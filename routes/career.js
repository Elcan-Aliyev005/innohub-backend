const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');

router.post('/apply', careerController.apply);

module.exports = router;

