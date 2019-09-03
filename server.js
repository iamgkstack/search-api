const dotenv = require('dotenv');

/**
 * load the config file from .env file at very
 * begining of the app
 */

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = require('./app');

app.start();
