const mongoose = require('mongoose');
const config = require('../config');

let dbURI;

if (process.env.DATABASE_URL) {
  dbURI = process.env.DATABASE_URL;
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
  });
} else {
  const { host, port, database } = config.mongodb;

  dbURI = `mongodb://${host}:${port}/${database}`;
  mongoose.connect(dbURI, {
    useNewUrlParser: true
  });
}

mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection open to ${dbURI}`);
});

// If the connection throws an error
mongoose.connection.on('error', err => {
  console.log(`Mongoose default connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

// When the connection is open
mongoose.connection.on('open', () => {
  console.log('Mongoose default connection is open');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(function() {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
