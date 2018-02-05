const {getContact} = require('../lib/contacts.js');
const mock = require('./mock.js');

const contactsEndPoint = '/contacts.json';
const invalidContactUUID = '1d0n73x157';
const validContactUUID = '13x157';
const validTelURN = encodeURIComponent('tel:+254722435412');
const invalidTelURN = encodeURIComponent('tel:+254722009911');

const exampleContact = {
  next: null,
  previous: null,
  results: [
    {
      uuid: '90017824-8615-435a-aa9c-811105873fd6',
      name: 'Test User',
      language: null,
      urns: [[]],
      groups: [],
      fields: [{}],
      blocked: false,
      stopped: false,
      created_on: '2018-02-05T06:51:20.233444Z',
      modified_on: '2018-02-05T06:55:55.204355Z',
    },
  ],
};

const exampleNoContact = {next: null, previous: null, results: []};

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
