/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-useless-concat */
/* eslint-disable max-len */ /* eslint-disable no-unused-vars */
import { StatusCode as statusCode } from '../../../../StatusCode';

const mocha = require('mocha');
const supertest = require('supertest');
const User = require('../../actions/User/UserApiActions');
const data = require('../../testData/LoginUserInfo.js').UserLoginData;
const product_data = require('../../testData/ProductInfo.js').ProductData;
const transactData = require('../../testData/ProductInfo.js').TransactionBody;
const purchaseData = require('../../testData/ProductInfo.js').PurchaseBody;


describe('Performing CRUD Operations on User', () => {
  let getauthToken = '';
  let getBuyerAuthToken = '';
  const emptyUserId = '';
  let productID = '';
  let productDataTem;
  const { amount } = transactData.TRANSACTION_DETAILS;
  const { username, password, role } = data.USER_DETAILS;
  const {
    productName, cost, amountAvailable, currency
  } = product_data.PRODUCT_DETAILS;

  const { products, total_amount } = purchaseData.PURCHASE_DETAILS;


  describe('POST Request: Create a User', () => {
    it('creating a User', async () => {
      const res = await User.createUser(username, password, role);
      res.status.should.equal(statusCode.CREATED);
    });
  });

  describe('POST Request: Login a User', () => {
    it('logging in', async () => {
      const res = await User.loginUser(username, password);
      getauthToken = res.body.data.token;
      res.status.should.equal(statusCode.OK);
    });
  });

  describe('GET Request: Get User', () => {
    it('Getting users list', async () => {
      const res = await User.getUserList(getauthToken);
      res.status.should.equal(statusCode.OK);
    });
  });

  describe('PUT Request: Update the User', () => {
    it('Updating a User', async () => {
      const res = await User.updateUser(`${username} ` + 'asd', `${password} ` + 'asdf', role, getauthToken);
      res.status.should.equal(statusCode.OK);
    });
  });

  describe('POST Request: Create a Product', () => {
    it('creating a User', async () => {
      const res = await User.createProduct(productName, cost, amountAvailable, currency, getauthToken);
      productID = res.body.data._id;
      console.log(`Printing productID:${productID}`);
      res.status.should.equal(statusCode.OK);
    });
  });

  describe('GET Request: Get Product', () => {
    it('Getting the Product', async () => {
      const res = await User.getProduct(productID, getauthToken);
      res.status.should.equal(statusCode.OK);
    });
  });

  describe('GET Request: Get Product', () => {
    it('Getting the Product', async () => {
      const res = await User.getProduct(productID, getauthToken);
      productDataTem = res.body.data;
      res.status.should.equal(statusCode.OK);
    });
  });

  describe('PUT Request: Update the Product', () => {
    it('Updating a Product', async () => {
      const res = await User.updateProduct(productName, cost, amountAvailable, currency, productID, getauthToken);
      res.status.should.equal(statusCode.OK);
    });
  });
  // transactData
  describe('POST Request: Login a Buyer', () => {
    it('logging in', async () => {
      const buyerUsername = 'buyer1';
      const buyerPassword = 'Hfdsjgjdsgdsjhkjjksdgk';
      const res = await User.loginUser(buyerUsername, buyerPassword);
      getBuyerAuthToken = res.body.data.token;
      res.status.should.equal(statusCode.OK);
    });
  });


  describe('POST Request: Credit The User', () => {
    it('crediting a User', async () => {
      const res = await User.creditUser(amount, getBuyerAuthToken);
      res.status.should.equal(statusCode.OK);
    });
  });

  describe('POST Request: Buy A product', () => {
    it('Buying a product', async () => {
      const res = await User.buyProduct(products, total_amount, getBuyerAuthToken);
      res.status.should.equal(statusCode.OK);
    });
  });


  describe('DELETE Request: Delete the Product', () => {
    it('Deleting a Product', async () => {
      const res = await User.deleteProduct(productID, getauthToken);
      res.status.should.equal(statusCode.OK);
    });
  });

  describe('DELETE Request: Delete the User', () => {
    it('Deleting a users', async () => {
      const res = await User.deleteUser(getauthToken);
      res.status.should.equal(statusCode.OK);
    });
  });
});
