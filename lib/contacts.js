const req = require('./request.js');
const {contactsEndPoint} = require('./urls.js');


function getContact({uuid, urn}) {
  const queryParam = uuid ? `uuid=${uuid}` : `urn=${urn}`;
  return req('GET', `${contactsEndPoint}?${queryParam}`);
}

function createContact () {}

function updateContact() {}

function deleteContact() {}

module.exports = {
  getContact,
  updateContact,
  deleteContact
}
