var nock = require('nock');

const rapidProBaseURL = 'https://rapidpro.ona.io/api/v2/';

const rapidpro = nock(rapidProBaseURL, {
  reqheaders: {
    // TODO: Correctly check auth header. This one always passes.
    'Authorization': /Token \w+/i,
    'Accept': 'application/json'
  }
});

module.exports = rapidpro;
