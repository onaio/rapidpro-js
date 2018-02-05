const req = require('../lib/request.js');
const mock = require('./mock.js');

mock
  .get('/')
  .reply(200, {text: 'Hello'})
  .post('/', {f: {g: 'a'}})
  .reply(201, {name: 'John Doe', fields: {age: 23}});

test('Can make a GET request', () => {
  return req('GET', 'https://rapidpro.ona.io/api/v2/').then((data) => {
    expect(data.body).toEqual({text: 'Hello'});
  });
});

test('Can make a POST request', () => {
  return req('POST', 'https://rapidpro.ona.io/api/v2/', {f: {g: 'a'}}).then((data) => {
    expect(data.body).toEqual({name: 'John Doe', fields: {age: 23}});
  });
});
