const fs = require('fs');

const env = process.env.NODE_ENV || 'development';

const config = {};

/**
 * base configuration
 */

fs.readdirSync(__dirname)
  .filter(f => !f.includes('index.js') && !f.includes('env'))
  .forEach(filename => {
    // eslint-disable-next-line
    Object.assign(config, require(`./${filename}`));
  });

/**
 * Environment Configuration
 * Override
 */
const envDir = `${__dirname}/env`;
const isEnvExisting = fs.existsSync(envDir);

if (isEnvExisting) {
  fs.readdirSync(envDir).forEach(filename => {
    const basename = filename.split('.')[0];
    if (env === basename) {
      // eslint-disable-next-line
      Object.assign(config, require(`./env/${filename}`));
    }
  });
}

module.exports = config;
