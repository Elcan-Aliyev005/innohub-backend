const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.post('/', auth, upload.single('image'), eventController.createEvent);
router.put('/:id', auth, upload.single('image'), eventController.updateEvent);
router.delete('/:id', auth, eventController.deleteEvent);
router.post('/:id/register', eventController.registerForEvent);

module.exports = router;

