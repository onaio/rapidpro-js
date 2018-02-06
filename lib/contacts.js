/** module contacts
 * [RapidPro contacts documentation]{@link https://rapidpro.io/api/v2/contacts}
 */
const req = require('./request.js');
const {contactsEndPoint} = require('./urls.js');

/**
 * Create a RapidPro contact
 * @param {string} name - Name of RapidPro contact
 * @param {string} language - An ISO6392 language code string
 * @param {array} urns - Array of URNs you want associated with the contact
 * e.g ["tel:+250788123123", "twitter:ben", "facebook:123456789098"]
 * @param {array} groups - Array of rapidpro contact groups to add a user to
 * @param {object} fields - other fields to add to the rapidpro contact
 * @return {Promise} - Promise holding a http response object that should have the newly created contact in its body
 */
function createContact(name, language, urns, groups, fields) {
  return req('POST', contactsEndPoint, {name, language, urns, groups, fields});
}

/**
 * GET a rapidpro contact.
 * when a urn is used the response object has the following structure {... results: [contactObject]}
 * when a uuid is used the result is just the contact object
 * @param {object} user - {urn, uuid} a urn or uuid used to GET the user, uuid takes precendence
 * @return {promise} - Promise holding a http response object that should have a created contact in its body
 */
function getContact({uuid, urn}) {
  const queryParam = uuid ? `uuid=${uuid}` : `urn=${urn}`;
  return req('GET', `${contactsEndPoint}?${queryParam}`);
}

/**
 * Update a rapidpro contact.
 * When passing a urn RapidPro will create a new contact if there is no contact with that URN.
 * @param {object} user - {urn, uuid} object holding either a urn or uuid used to identify the user, uuid takes precendence.
 * @param {object} payload - contact data to update.
 * @return {Promise} - Promise holding a http response object that should have the newly updated contact in its body
 */
function updateContact({uuid, urn}, payload) {
  const queryParam = uuid ? `uuid=${uuid}` : `urn=${urn}`;
  return req('POST', `${contactsEndPoint}?${queryParam}`, payload);
}

/**
 * Implement soft user deletion by removing them from the current group
 * and moving them to another group.
 * @param {Integer} messengerId - Messenger PSID
 * @param {Array} groups - array of UUIDs of group(s) to move the contact to
 * @param {string} url - set the RapiPro URL. Mainly for testing
 * @return {Promise} - Promise holding a http response object that should be of status code 204
 */
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
