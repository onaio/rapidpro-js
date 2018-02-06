const {
  getContact,
  createContact,
  deleteContact,
  updateContact,
} = require('./lib/contacts.js');
const {getGroup} = require('./lib/groups.js');

module.exports = {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getGroup,
};
