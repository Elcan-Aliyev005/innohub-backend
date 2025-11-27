const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'İstifadəçi adı və şifrə tələb olunur' });
    }

    const admin = await Admin.findOne({ username: username.trim() });
    if (!admin) {
      return res.status(401).json({ message: 'İstifadəçi adı və ya şifrə yanlışdır' });
    }

    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'İstifadəçi adı və ya şifrə yanlışdır' });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ 
      token, 
      admin: { id: admin._id, username: admin.username },
      expiresIn: '24h'
    });
  } catch (error) {
    res.status(500).json({ message: 'Daxili server xətası' });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const adminCount = await Admin.countDocuments();
    
    if (adminCount > 0) {
      if (!req.admin) {
        return res.status(401).json({ message: 'Giriş tələb olunur' });
      }
    }

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Bu istifadəçi adı artıq mövcuddur' });
    }

    if (!username || !password) {
      return res.status(400).json({ message: 'İstifadəçi adı və şifrə tələb olunur' });
    }

    if (username.length < 3 || username.length > 30) {
      return res.status(400).json({ message: 'İstifadəçi adı 3-30 simvol arasında olmalıdır' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Şifrə minimum 8 simvol olmalıdır' });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ 
        message: 'Şifrə ən azı bir kiçik hərf, bir böyük hərf, bir rəqəm və bir xüsusi simvol ehtiva etməlidir' 
      });
    }

    const admin = new Admin({
      username: username.trim(),
      password_hash: password
    });

    await admin.save();
    res.status(201).json({ 
      message: 'Admin yaradıldı', 
      admin: { id: admin._id, username: admin.username } 
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Bu istifadəçi adı artıq mövcuddur' });
    }
    res.status(400).json({ message: error.message });
  }
};

