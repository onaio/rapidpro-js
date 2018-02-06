/** module groups
 * [RapidPro groups documentation]{@link https://rapidpro.io/api/v2/groups}
 */
const req = require('./request.js');
const {groupsEndPoint} = require('./urls.js');

/**
 * Get a specific group based on its UUID in RapidPro
 * @param {string} uuid - uuid identifying the RapidPro group
 * @return {promise} - Promise holding a http response object that should have a RapidPro a group in the body
 */
function getGroup(uuid) {
  return req('GET', `${groupsEndPoint}?uuid=${uuid}`);
}

module.exports = {getGroup};
