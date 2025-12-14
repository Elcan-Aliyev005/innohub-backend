const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validasiya xətası',
      errors: errors.array()
    });
  }
  next();
};

const validateAdminCreate = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('İstifadəçi adı 3-30 simvol arasında olmalıdır')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('İstifadəçi adı yalnız hərf, rəqəm və _ ehtiva edə bilər'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Şifrə minimum 8 simvol olmalıdır')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Şifrə ən azı bir kiçik hərf, bir böyük hərf, bir rəqəm və bir xüsusi simvol ehtiva etməlidir'),
  handleValidationErrors
];

const validateAdminLogin = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('İstifadəçi adı tələb olunur'),
  body('password')
    .notEmpty()
    .withMessage('Şifrə tələb olunur'),
  handleValidationErrors
];

const validateCourse = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Başlıq tələb olunur')
    .isLength({ max: 200 })
    .withMessage('Başlıq maksimum 200 simvol ola bilər'),
  body('category')
    .isIn(['IT', 'Design', 'AI'])
    .withMessage('Kateqoriya IT, Design və ya AI olmalıdır'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Təsvir tələb olunur'),
  body('duration')
    .trim()
    .notEmpty()
    .withMessage('Müddət tələb olunur'),
  body('schedule')
    .trim()
    .notEmpty()
    .withMessage('Cədvəl tələb olunur'),
  body('trainer')
    .trim()
    .notEmpty()
    .withMessage('Təlimçi adı tələb olunur'),
  handleValidationErrors
];

const validateContact = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Ad tələb olunur')
    .isLength({ max: 100 })
    .withMessage('Ad maksimum 100 simvol ola bilər'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Düzgün email ünvanı daxil edin')
    .normalizeEmail(),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Telefon nömrəsi tələb olunur')
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/)
    .withMessage('Düzgün telefon nömrəsi daxil edin'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Mesaj tələb olunur')
    .isLength({ max: 2000 })
    .withMessage('Mesaj maksimum 2000 simvol ola bilər'),
  handleValidationErrors
];

const validateCarousel = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Başlıq tələb olunur')
    .isLength({ max: 200 })
    .withMessage('Başlıq maksimum 200 simvol ola bilər'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Təsvir maksimum 500 simvol ola bilər'),
  body('link')
    .optional()
    .trim()
    .isURL()
    .withMessage('Düzgün URL formatı daxil edin'),
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Sıra nömrəsi müsbət tam ədəd olmalıdır'),
  handleValidationErrors
];

module.exports = {
  validateAdminCreate,
  validateAdminLogin,
  validateCourse,
  validateContact,
  validateCarousel,
  handleValidationErrors
};

