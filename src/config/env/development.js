/**
 * Development Environment settings
 */

module.exports = {
  port: 5200,
  prefix: '/api',
  mongodb: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.PORT || 27017,
    database: process.env.GEEN_HOUSE_DB || 'green-house-db',
    username: process.env.DB_USERNAME || 'mongo',
    password: process.env.DB_PASSWORD || 'mongo'
  }
};
