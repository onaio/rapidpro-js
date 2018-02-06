/** module request */
const superagent = require('superagent');

// TODO: make this an env var/settings file thing
const rapidproApiToken = '';

// TODO: Figure out why status codes >=400 are errors that have to be caught.
/**
 * General http request function that sets content typt and the auth token for RapidPro
 * @param {string} method - HTTP request e.g GET, POST, DELETE, PUT
 * @param {string} url - Full url (including query string if needed)
 * @param {object} payload - The data to send to RapidPro (optional)
 * @return {promise} - Promise holding a HTTP response object
 */
function request(method, url, payload) {
  const sa = superagent(method, url)
    .set('Authorization', `Token ${rapidproApiToken}`)
    .set('Accept', 'application/json');
  if (['POST', 'DELETE'].includes(method)) {
    return sa
      .send(JSON.stringify(payload))
      .set('Content-Type', 'application/json');
  } else {
    return sa;
  }
}

module.exports = request;
