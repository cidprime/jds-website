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
const progressRoutes = require('./routes/progress');

const app = express();

// Middleware pour parser les requêtes JSON et les cookies
app.use(express.json());
app.use(cookieParser());

// Connexion à MongoDB
connectDB();

// Autorise les requetes venant d'autres port.
app.use(cors());

// Les Routes
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/chapters', chapterRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/progress', progressRoutes);


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