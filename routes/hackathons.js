const express = require('express');
const router = express.Router();
const hackathonController = require('../controllers/hackathonController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/past', hackathonController.getPastHackathons);
router.get('/future', hackathonController.getFutureHackathons);
router.get('/registrations/all', auth, hackathonController.getAllHackathonRegistrations);
router.post('/', auth, upload.single('image'), hackathonController.createHackathon);
router.put('/:id', auth, upload.single('image'), hackathonController.updateHackathon);
router.delete('/:id', auth, hackathonController.deleteHackathon);
router.post('/:id/register', hackathonController.registerForHackathon);

module.exports = router;

