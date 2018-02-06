/** @module config */
const env = process.env;

/**
 * Read environment variables
 * @constant
 * @type {object}
 */
module.exports = {
  environment: env.NODE_ENV || 'development', // dev, prod, test
  rapidproApiToken: env.RAPIDPRO_API_TOKEN ? env.RAPIDPRO_API_TOKEN : console.log('Set the RAPIDPRO_API_TOKEN'),
};
