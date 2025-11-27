const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Çox sayda cəhd. Zəhmət olmasa 15 dəqiqə sonra yenidən cəhd edin.',
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Çox sayda sorğu. Zəhmət olmasa 15 dəqiqə sonra yenidən cəhd edin.',
  standardHeaders: true,
  legacyHeaders: false,
});

const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: 'Çox sayda yaratma cəhdi. Zəhmət olmasa 1 saat sonra yenidən cəhd edin.',
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  authLimiter,
  apiLimiter,
  createLimiter
};

