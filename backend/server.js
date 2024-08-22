const http = require('http');
const app = require('./app');
require('dotenv').config();

const normalizePort = val => {
  const port = parseInt(val, 10);

  if(isNaN(port)) return val;
  
  if(port >= 0) return port;

  return false;
};

const errorHandler = error => {
  if(error.syncall !== 'listen') throw error;

  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + PORT;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const PORT = normalizePort(process.env.PORT || '3000');
// On dit l'app express sur quel port le server tourne
app.set('port', PORT);

// Le server lance retourne l'appli express qui gerent les requetes et reponse.
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' + address ? 'pipe ' + address : 'port: ' + PORT;
  console.log('Listening on ' + bind);
});

server.listen(PORT);