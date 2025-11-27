const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Token yoxdur, giriş tələb olunur' });
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token formatı yanlışdır' });
  }

  const token = authHeader.replace('Bearer ', '').trim();

  if (!token) {
    return res.status(401).json({ message: 'Token yoxdur, giriş tələb olunur' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token müddəti bitib' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token etibarsızdır' });
    }
    return res.status(401).json({ message: 'Token yoxlanıla bilmədi' });
  }
};

module.exports = auth;

