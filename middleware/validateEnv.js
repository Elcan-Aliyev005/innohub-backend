const validateEnv = () => {
  const required = [
    'MONGODB_URI',
    'JWT_SECRET',
    'ADMIN_SECRET_KEY'
  ];

  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error('XƏTA: Aşağıdakı environment dəyişənləri tələb olunur:');
    missing.forEach(key => console.error(`  - ${key}`));
    process.exit(1);
  }

  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    console.error('XƏTA: JWT_SECRET minimum 32 simvol olmalıdır');
    process.exit(1);
  }

  if (process.env.ADMIN_SECRET_KEY && process.env.ADMIN_SECRET_KEY.length < 32) {
    console.error('XƏTA: ADMIN_SECRET_KEY minimum 32 simvol olmalıdır');
    process.exit(1);
  }

  console.log('Environment dəyişənləri yoxlanıldı ✓');
};

module.exports = validateEnv;

