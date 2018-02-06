/** @module config */
const env = process.env;

/**
 * Read environment variables
 * @constant
 * @type {object}
 */
module.exports = {
  rapidproApiToken: env.RAPIDPRO_API_TOKEN
    ? env.RAPIDPRO_API_TOKEN
    : console.log('Set the RAPIDPRO_API_TOKEN env var'),
};
