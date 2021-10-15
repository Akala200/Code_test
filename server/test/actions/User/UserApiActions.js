/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable no-global-assign */
/* eslint-disable no-unused-vars */


const supertest = require('supertest');
const should = require('should');
const baseActions = require('../common/BaseActions');
const baseURLMapper = require('../../../../UrlMapper').UrlMapper;
const reqBody = require('../../testData/Payloads/CommonPayload');


/** This createUser will help us to create a user with user-id and user name as a request body
        this request body can be changed as per your project api * */


exports.createUser = async function (username, password, role) {
  const requestBody = reqBody.userBody(username, password, role);
  URL = baseActions.getBaseURL();
  console.log(URL + baseURLMapper.CREATE, requestBody);
  const res = await baseActions.sendPOSTRequest(URL, baseURLMapper.CREATE, requestBody);
  return res;
};
exports.loginUser = async function (username, password) {
  const requestBody = reqBody.userBody(username, password);
  URL = baseActions.getBaseURL();
  console.log(URL + baseURLMapper.LOGIN, requestBody);
  const res = await baseActions.sendPOSTRequest(URL, baseURLMapper.LOGIN, requestBody);
  return res;
};

/** This getUserList will help us in getting all the users that are present in the database * */

exports.getUserList = async function (token) {
  URL = baseActions.getBaseURL();
  const res = await baseActions.sendGETRequest(URL, baseURLMapper.GETUSER, token);
  console.log(res.body);

  return res;
};

/** This updateUser will help us in updating the user using the user-id * */

exports.updateUser = async function (username, password, role, token) {
  const requestBody = reqBody.userBody(username, password, role);
  URL = baseActions.getBaseURL();
  const res = await baseActions.sendPUTRequest(URL, baseURLMapper.EDITUSER, requestBody, token);
  console.log(res.body);
  return res;
};


exports.createProduct = async function (productName, cost, amountAvailable, currency, token) {
  const requestBody = reqBody.productBody(productName, cost, amountAvailable, currency);
  URL = baseActions.getBaseURL();
  const res = await baseActions.sendPOSTRequest1(URL, baseURLMapper.CREATEPRODUCT, requestBody, token);
  console.log(res.body);
  return res;
};

exports.getProduct = async function (id, token) {
  URL = baseActions.getBaseURL();
  const res = await baseActions.sendGETRequest(URL, `${baseURLMapper.GETPRODUCT}?id=${id}`, token);
  console.log(res.body);

  return res;
};

exports.updateProduct = async function (productName, cost, amountAvailable, currency, productId, token) {
  const requestBody = reqBody.productBody(productName, cost, amountAvailable, currency);
  URL = baseActions.getBaseURL();
  console.log(`${URL}${baseURLMapper.EDITPRODUCT}?id=${productId}`, requestBody);

  const res = await baseActions.sendPUTRequest(URL, `${baseURLMapper.EDITPRODUCT}?productId=${productId}`, requestBody, token);
  console.log(res.body);
  return res;
};

exports.creditUser = async function (amount, token) {
  const requestBody = reqBody.transactionBody(amount);
  URL = baseActions.getBaseURL();
  console.log(requestBody);
  const res = await baseActions.sendPOSTRequest1(URL, baseURLMapper.CREDITUSER, requestBody, token);
  console.log(res.body);
  return res;
};

exports.buyProduct = async function (products, total_amount, token) {
  const requestBody = {
    products, total_amount
  };
  URL = baseActions.getBaseURL();
  console.log(requestBody);
  const res = await baseActions.sendPOSTRequest1(URL, baseURLMapper.BUYPRODUCT, requestBody, token);
  console.log(res.body);
  return res;
};


exports.deleteProduct = async function (id, token) {
  URL = baseActions.getBaseURL();
  const res = await baseActions.sendDELETERequest(URL, `${baseURLMapper.DELETEPRODUCT}?id=${id}`, token);
  return res;
};

/** This deleteUser will help us in deleting the user using the user-id  DELETEPRODUCT * */

exports.deleteUser = async function (token) {
  URL = baseActions.getBaseURL();
  const res = await baseActions.sendDELETERequest(URL, baseURLMapper.DELETEUSER, token);
  return res;
};
