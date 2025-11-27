const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partnerController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', partnerController.getAllPartners);
router.post('/', auth, upload.single('logo'), partnerController.createPartner);
router.delete('/:id', auth, partnerController.deletePartner);

module.exports = router;

