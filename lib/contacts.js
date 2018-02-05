const req = require('./request.js');
const {contactsEndPoint} = require('./urls.js');

function createContact(name, language, urns, groups, fields) {
  return req('POST',
             contactsEndPoint,
             {name, language, urns, groups, fields});
}

function getContact({uuid, urn}) {
  const queryParam = uuid ? `uuid=${uuid}` : `urn=${urn}`;
  return req('GET', `${contactsEndPoint}?${queryParam}`);
}

function updateContact({uuid, urn}, payload) {
  const queryParam = uuid ? `uuid=${uuid}` : `urn=${urn}`;
  return req('POST', `${contactsEndPoint}?${queryParam}`, payload);
}

function deleteContact({uuid, urn}) {
  const queryParam = uuid ? `uuid=${uuid}` : `urn=${urn}`;
  return req('DELETE', `${contactsEndPoint}?${queryParam}`);
}

module.exports = {
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
