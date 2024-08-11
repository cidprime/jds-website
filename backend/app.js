const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Connexion à MongoDB


// Autorise les requetes venant d'autres port.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

  next();
})

// Routes simples pour tester le serveur
app.get('/', (req, res) => {
    res.send('API de e-learning');
});


module.exports = app;