const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const userRoutes = require('./routes/user');
const courseRoutes = require('./routes/course');

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

app.use('/api/auth', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/images', express.static(path.join(__dirname, 'public/images')));

module.exports = app;