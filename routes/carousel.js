const express = require('express');
const router = express.Router();
const carouselController = require('../controllers/carouselController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { createLimiter } = require('../middleware/rateLimiter');
const { validateCarousel } = require('../middleware/validation');

router.get('/', carouselController.getAllCarousels);
router.get('/:id', carouselController.getCarouselById);
router.post('/', auth, createLimiter, upload.single('image'), validateCarousel, carouselController.createCarousel);
router.put('/:id', auth, upload.single('image'), validateCarousel, carouselController.updateCarousel);
router.delete('/:id', auth, carouselController.deleteCarousel);
router.put('/order/update', auth, carouselController.updateCarouselOrder);

module.exports = router;

