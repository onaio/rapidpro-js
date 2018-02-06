const req = require('./request.js');
const {groupsEndPoint} = require('./urls.js');

function getGroup(uuid) {
  return req('GET', `${groupsEndPoint}?uuid=${uuid}`);
}

module.exports = {getGroup};
