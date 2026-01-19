require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const validateEnv = require('./middleware/validateEnv');
const securityMiddleware = require('./middleware/security');
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');

validateEnv();

const app = express();

connectDB();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(securityMiddleware);

app.use('/uploads', express.static('uploads'));

app.use('/api', apiLimiter);

app.use('/api/courses', require('./routes/courses'));
app.use('/api/career', require('./routes/career'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/blog', require('./routes/blog'));
app.use('/api/events', require('./routes/events'));
app.use('/api/hackathons', require('./routes/hackathons'));
app.use('/api/scholarships', require('./routes/scholarships'));
app.use('/api/teachers', require('./routes/teachers'));
app.use('/api/graduates', require('./routes/graduates'));
app.use('/api/partners', require('./routes/partners'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/search', require('./routes/search'));
app.use('/api/carousel', require('./routes/carousel'));
app.use('/api/faq', require('./routes/faq'));
app.use('/api/vacancy', require('./routes/vacancy'));
app.use('/api/admin', require('./routes/admin'));

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint tapılmadı' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server işə salındı: ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

