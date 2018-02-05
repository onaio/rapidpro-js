const {
  getContact,
  createContact,
  deleteContact,
  updateContact,
} = require('../lib/contacts.js');
const mock = require('./mock.js');
const _ = require('lodash');

const contactsEndPoint = '/contacts.json';
const invalidContactUUID = '1d0n73x157';
const validContactUUID = '13x157';
const validTelURN = encodeURIComponent('tel:+254722435412');
const invalidTelURN = encodeURIComponent('tel:+254722009911');

const newContact = {name: 'Jane Doe', fields: {}, groups: []};

const uuid = 'd57d4498-a958-4462-a266-6eda773f2242',
  name = 'Test User',
  language = 'eng',
  urns = [],
  groups = [],
  fields = {};

const contact = {
  uuid,
  name,
  language,
  urns,
  groups,
  fields,
  blocked: false,
  stopped: false,
  created_on: '2018-02-05T15:15:19.638640Z',
  modified_on: '2018-02-05T15:15:19.638758Z',
};

const updatedContact = _.cloneDeep(contact);
updatedContact.fields.gender = 'Male';

const exampleContact = {
  next: null,
  previous: null,
  results: [contact],
};

const exampleNoContact = {next: null, previous: null, results: []};

// Create
mock
  .post(contactsEndPoint, {name, language, urns, groups, fields})
  .reply(201, contact);

// Read
mock
  .get(contactsEndPoint)
  .query(({uuid, urn}) => {
    return (
      encodeURIComponent(uuid) === validContactUUID ||
      encodeURIComponent(urn) === validTelURN
    );
  })
  .reply(200, exampleContact)
  .get(contactsEndPoint)
  .query(({uuid, urn}) => {
    return (
      encodeURIComponent(uuid) !== validContactUUID ||
      encodeURIComponent(urn) !== validTelURN
    );
  })
  .reply(200, exampleNoContact);


// Update
mock
  .post(contactsEndPoint, {fields: {gender: 'Male'}})
  .query(({uuid, urn}) => {
    return (
      encodeURIComponent(uuid) === validContactUUID ||
      encodeURIComponent(urn) === validTelURN
    );
  })
  .reply(200, updatedContact)
  .post(contactsEndPoint, newContact)
  .query(({uuid, urn}) => {
    return (
      encodeURIComponent(uuid) !== validContactUUID ||
      encodeURIComponent(urn) !== validTelURN
    );
  })
  .reply(201, newContact);

// Delete
mock
  .delete(contactsEndPoint)
  .query(({uuid, urn}) => {
    return (
      encodeURIComponent(uuid) === validContactUUID ||
      encodeURIComponent(urn) === validTelURN
    );
  })
  .reply(204, {})
  .delete(contactsEndPoint)
  .query(({uuid, urn}) => {
    return (
      encodeURIComponent(uuid) !== validContactUUID ||
      encodeURIComponent(urn) !== validTelURN
    );
  })
  .reply(404);

describe('Read Contacts', () => {
  describe('using UUIDs', () => {
    it('Successfully GETs an existing contact', () => {
      getContact({uuid: validContactUUID}).then((res) =>
        expect(res.body).toEqual(exampleContact)
      );
    });

    it('Fails to GET a non existent contact', () => {
      getContact({uuid: invalidContactUUID}).then((res) =>
        expect(res.body).toEqual(exampleNoContact)
      );
    });
  });

  describe('Using URNs', () => {
    it('Successfully GETs an existing contact', () => {
      getContact({urn: validTelURN}).then((res) =>
        expect(res.body).toEqual(exampleContact)
      );
    });

    it('Fails to GET a non existent contact', () => {
      getContact({urn: invalidTelURN}).then((res) =>
        expect(res.body).toEqual(exampleNoContact)
      );
    });
  });
});

describe('Create Contacts', () => {
  it('Successfully creates a contact', () => {
    createContact(name, language, urns, groups, fields).then((res) =>
      expect(res.body).toEqual(contact)
    );
  });

  // TODO: test for required fields
  it('Does not create a contact lacking ...');
});

describe('Delete Contacts', () => {
  describe('URN query string', () => {
    it('Successfully deletes an existing contact', () => {
      deleteContact({urn: validTelURN}).then(
        (res) => expect(res.status).toEqual(204) && expect(res.body).toEqual({})
      );
    });
    it('Does not claim to delete a an non existing contact', () => {
      deleteContact({urn: invalidTelURN})
        .then()
        .catch(
          (err) =>
            expect(err.status).toBe(404) && expect(err.body).toBe(undefined)
        );
    });
  });

  describe('UUID query string', () => {
    it('Successfully deletes an existing contact', () => {
      deleteContact({uuid: validContactUUID}).then(
        (res) => expect(res.status).toEqual(204) && expect(res.body).toEqual({})
      );
    });
    it('Does not claim to delete a an non existing contact', () => {
      deleteContact({uuid: invalidContactUUID})
        .then()
        .catch(
          (err) =>
            expect(err.status).toBe(404) && expect(err.body).toBe(undefined)
        );
    });
  });
});

// fails from here
describe('Update Contacts', () => {
  describe('UUID query string', () => {
    it('Updates an existing contact', () => {
      updateContact({uuid: validContactUUID}, {fields: {gender: 'Male'}}).then(
        (res) => expect(res.body).toEqual(updatedContact)
      );
    });
  });
  describe('URN query string', () => {
    it('Updates a contact based on the URN', () => {
      updateContact({urn: validTelURN}, {fields: {gender: 'Male'}})
        .then(res => expect(res.body).toEqual(updatedContact));
    });
    // in reality the contact would have more fields but this is
    // good enough fr testing
    it('creates a new contact if there is no contact with that URN', () => {
      updateContact({urn: invalidTelURN}, newContact)
        .then(res => expect(res.body).toEqual(newContact));
    });
  });
});
