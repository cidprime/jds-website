const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const courseRoutes = require('./routes/course');

const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb+srv://sidiki:rpl36lBhisyqRsSg@cluster0.oihvz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log(`${error}`));

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

module.exports = app;