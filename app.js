const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');

const config = require('./src/config');
const models = require('./src/models');
const routes = require('./src/routes');

const app = express();

app.enable('trust proxy');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(config.cors));

/* Get the port from environment */
const port = parseInt(process.env.PORT || config.port, 10);

mongoose.set('useCreateIndex', true);

/* global */
global.config = config;
global.mongoose = mongoose;
global.models = models;

/* configure port to app */
app.set('port', port);

/* configure routes */
routes(app);

/**
 * Catch 404 and forward the
 * error handler
 */

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((error, req, res) => {
  console.log(error);
  res.status(error.status || 500);
  res.json({
    message: "Ops! coudn't perform this action at this time!",
    error
  });
});

/* create server */

const server = http.createServer(app);

const isTest = process.env.NODE_ENV || 'test';
const isProduction = process.env.NODE_ENV || 'production';

/**
 * Bind onError and onListining
 * Handler
 */

server.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  /**
   * Handle specific listen error
   * with friendly message
   */

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated previleges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      break;
    default:
      throw error;
  }
});

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listining on ${bind}`);
});

function start(done) {
  console.log('port=>', port);
  server.listen(port, done);
}

function lower(done) {
  server.close(done);
}

module.exports = {
  lower,
  start,
  mongoose,
  default: app
};
