var nock = require('nock');
const {rapidProBaseURL} = require('../lib/urls.js');

const mock = nock(rapidProBaseURL, {
  reqheaders: {
    // TODO: Correctly check auth header. This one always passes.
    'Authorization': /Token \w+/i,
    'Accept': 'application/json'
  }})
      .persist();



module.exports = mock;
