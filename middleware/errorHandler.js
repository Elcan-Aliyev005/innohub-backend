const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      message: 'Validasiya xətası',
      errors
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'Yanlış ID formatı'
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: 'Etibarsız token'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      message: 'Token müddəti bitib'
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      message: `${field} artıq mövcuddur`
    });
  }

  if (err.message && err.message.includes('MulterError')) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'Fayl ölçüsü çox böyükdür. Maksimum 10MB'
      });
    }
    return res.status(400).json({
      message: 'Fayl yükləmə xətası'
    });
  }

  console.error('Error:', err);

  res.status(err.status || 500).json({
    message: err.message || 'Daxili server xətası',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;

