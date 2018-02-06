/** @module config */
const env = process.env;

if (!/test\w*/i.test('test') && env.RAPIDPRO_API_TOKEN === undefined) {
  console.log('environment variable RAPIDPRO_API_TOKEN not set.');
}

/**
 * Read environment variables
 * @constant
 * @type {object}
 */
module.exports = {
  rapidproApiToken: env.RAPIDPRO_API_TOKEN ? env.RAPIDPRO_API_TOKEN : '',
};
