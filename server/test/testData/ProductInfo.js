const randchar = Math.random().toString(36).substr(2, 5);

/** This module is user for creating the User Data * */

exports.ProductData = {
  PRODUCT_DETAILS: {
    productName: `${randchar}`, cost: 30, amountAvailable: 60, currency: 'Coin'
  }

};

exports.TransactionBody = {
  TRANSACTION_DETAILS: {
    amount: 100
  }
};

exports.PurchaseBody = {
  PURCHASE_DETAILS: {
    products: [
      {
        productId: '6169c8ca4281ef2f68e85170',
        numberOfItem: 2
      }
    ],
    total_amount: 400
  }
};
