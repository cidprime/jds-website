const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course');
const sectionRoutes = require('./routes/section');
const chapterRoutes = require('./routes/chapter');
const quizRoutes = require('./routes/quiz');
const enrollmentRoutes = require('./routes/enrollment');

const app = express();

// Middleware pour parser les requêtes JSON et les cookies
app.use(express.json());
app.use(cookieParser());

// Connexion à MongoDB
connectDB();

// Définir les origines autorisées
const allowedOrigins = [
  'http://localhost:5173', // Frontend local
  'https://jds-frontend.onrender.com', // Frontend en production
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  }
}));

// Les Routes
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/chapters', chapterRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/enrollments', enrollmentRoutes);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});


module.exports = app;