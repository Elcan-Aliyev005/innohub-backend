const checkSecretKey = (req, res, next) => {
  const providedKey = req.headers['x-admin-secret-key'] || req.body.secretKey;
  const validKey = process.env.ADMIN_SECRET_KEY;

  if (!validKey) {
    return res.status(500).json({ 
      message: 'Server konfiqurasiyası xətası. Admin secret key təyin edilməyib.' 
    });
  }

  if (!providedKey) {
    return res.status(401).json({ 
      message: 'Admin yaratmaq üçün secret key tələb olunur' 
    });
  }

  if (providedKey !== validKey) {
    return res.status(403).json({ 
      message: 'Etibarsız secret key' 
    });
  }

  next();
};

module.exports = checkSecretKey;

