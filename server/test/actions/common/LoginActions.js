/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable no-global-assign */

const baseActions = require('./BaseActions');
const baseURLMapper = require('../../../../UrlMapper').UrlMapper;
const reqBody = require('../../testData/Payloads/CommonPayload');


/** This is just a Login Method of a user with a sendPOSTRequest having baseurl and a request body * */

exports.loginToUser = async function (username, password) {
  const requestBody = reqBody.getRequestBody(username, password);
  URL = baseActions.getBaseURL();
  const res = await baseActions.sendPOSTRequest(URL, baseURLMapper.LOGIN, requestBody);
  console.log(res.body);
  return res;
};
