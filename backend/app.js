const express = require('express');
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

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Connexion à MongoDB
connectDB();

// Autorise les requetes venant d'autres port.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

  next();
})

// Les Routes
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/chapters', chapterRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/progress', progressRoutes);

module.exports = app;