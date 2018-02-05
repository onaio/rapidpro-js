const superagent = require('superagent');

const rapidProBaseURL = 'https://rapidpro.ona.io/api/v2/';
const contactsEndPoint = `${rapidProBaseURL}contacts.json`;
const groupsEndPoint = `${rapidProBaseURL}groups.json`;

// TODO: make this an env var/settings file thing
const rapidproApiToken = '';

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
