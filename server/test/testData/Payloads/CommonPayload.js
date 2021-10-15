/* eslint-disable camelcase */
/** This module is user for creating the Body Structure
       this needs to be modified according to the api body structure * */

exports.getRequestBody = (username, password) => ({
  user: {
    username,
    password
  }
});

exports.userBody = (username, password, role) => ({
  username,
  password,
  role
});

exports.productBody = (productName, cost, amountAvailable, currency) => ({
  productName,
  cost,
  amountAvailable,
  currency
});


exports.transactionBody = amount => ({
  amount
});


exports.purchaseBody = (products, total_amount) => ({
  products,
  total_amount
});
