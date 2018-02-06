const {  getGroup} = require('../lib/groups.js');
const mock = require('./mock.js');

const groupsEndPoint = '/groups.json';
const validGroupUUID = '13x157';
const invalidGroupUUID = '1d0n73x157';

const exampleGroup = { next: null,
  previous: null,
  results:
   [ { uuid: '04a37390-4acd-4cf5-b285-da286e0705ad',
       name: 'Test Group',
       query: null,
       count: 9 } ] }
const noGroup = { next: null, previous: null, results: [] }

// Read
mock
  .get(groupsEndPoint)
  .query(({uuid}) => uuid === validGroupUUID)
  .reply(200, exampleGroup)
  .get(groupsEndPoint)
  .query(({uuid}) => uuid !== validGroupUUID)
  .reply(200, noGroup);

describe('Can get groups', () => {
  it('GETs a group given a valid group uuid', () => {
    getGroup(validGroupUUID)
      .then(res => expect(res.body).toEqual(exampleGroup));
  });
  it('Does not GET a group if the group UUID isn not valid',  () => {
    getGroup(invalidGroupUUID)
      .then()
      .catch(res => expect(res.body).toEqual(noGroup));
  });
});
