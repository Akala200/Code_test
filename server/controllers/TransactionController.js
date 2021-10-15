/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable radix */
/* eslint-disable no-empty */
/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable require-jsdoc */
import User from '../models/Users';
import Product from '../models/Product';
import tracelogger from '../logger/tracelogger';
import responses from '../utils/responses';


/**
 * @description Defines the actions to for the Transaction endpoints
 * @class TransactionController
 */
class TransactionController {
  /**
   *@description The Transaction class
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and created or updated record
   *@memberof TransactionController
   */


  /**
   *@description Deposit into user account
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and updated user details
   *@memberof TransactionController
   */
  static async deposit(req, res) {
    const {
      amount
    } = req.body;
    const id = req.userId;
    let updateAmount;

    if (amount === 5 || amount === 10 || amount === 20 || amount === 50 || amount === 100) {
      try {
        const getuser = await User.findOne({ _id: id });

        if (!getuser || getuser.role !== 'Buyer') {
          return res
            .status(400)
            .json(responses.error(400, 'Sorry, Buyer/Customer does not exist'));
        }
        updateAmount = getuser.deposit + amount;

        const creditObject = {
          deposit: updateAmount,
        };

        const updatedTransaction = await User.findOneAndUpdate({ _id: id }, creditObject, { new: true, runValidators: true, });

        if (updatedTransaction) {
          return res
            .status(200)
            .json(responses.success(200, 'Account successfully credited', updatedTransaction));
        }
      } catch (error) {
        tracelogger(error);
        return res
          .status(500)
          .json(responses.error(500, 'Server error', error));
      }
    } else {
      return res
        .status(400)
        .json(responses.error(400, 'Kindly enter an amount that is equivalent to 5, 10, 20, 50 or 100'));
    }
  }


  /**
   *@description Reset user deposit
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and updated user details
   *@memberof TransactionController
   */
  static async resetDeposit(req, res) {
    const {
      amount
    } = req.body;
    const id = req.userId;

    try {
      const getuser = await User.findOne({ _id: id });

      if (!getuser) {
        return res
          .status(400)
          .json(responses.error(400, 'Sorry, Buyer/Customer does not exist'));
      }
      const updateAmount = 0;

      const creditObject = {
        deposit: updateAmount,
      };

      const updatedTransaction = await User.findOneAndUpdate({ _id: id }, creditObject, { new: true, runValidators: true, });

      if (updatedTransaction) {
        return res
          .status(200)
          .json(responses.success(200, 'Account debit has been successfully cleared', updatedTransaction));
      }
    } catch (error) {
      tracelogger(error);
      return res
        .status(500)
        .json(responses.error(500, 'Server error', error));
    }
  }


  /**
   *@description Deposit into user account
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and updated user details
   *@memberof TransactionController
   */
  static async buy(req, res) {
    const {
      products,
      total_amount
    } = req.body;
    const id = req.userId;
    const purchasedProducts = [];
    let updateAmount;


    try {
      const getuser = await User.findOne({ _id: id });
      if (getuser.deposit < total_amount) {
        return res
          .status(400)
          .json(responses.error(400, 'Insuficeint funds'));
      }

      if (!getuser || getuser.role !== 'Buyer') {
        return res
          .status(400)
          .json(responses.error(400, 'Sorry, Buyer/Customer does not exist'));
      }


      for (let i = 0; i < products.length; i++) {
        console.log(products[i]);
        const getProduct = await Product.findOne({ _id: products[i].productId });
        if (!getProduct) {
          return res
            .status(400)
            .json(responses.error(400, `Sorry, we are out of stock for the product with the  ID - ${products[i].productId}`));
        } else {
          const getseller = await User.findOne({ _id: getProduct.sellerId });
          if (!getseller) {
            return res
              .status(400)
              .json(responses.error(400, `Sorry, the product has no registered seller - ${products[i].productId}`));
          }
          const updateAmountSeller = getseller.deposit + getProduct.cost * products[i].numberOfItem;
          const amountAvailable = getProduct.amountAvailable - products[i].numberOfItem;
          const creditObjectSeller = {
            deposit: updateAmountSeller,
          };
          const updateProductObject = {
            amountAvailable
          };
          await User.findOneAndUpdate({ _id: getProduct.sellerId }, creditObjectSeller, { new: true, runValidators: true, });
          // Update product
          const updatedProduct = await Product.findOneAndUpdate({ _id: getProduct._id }, updateProductObject, { new: true, runValidators: true, });

          purchasedProducts.push(updatedProduct);
        }
      }

      updateAmount = getuser.deposit - total_amount;

      const creditObject = {
        deposit: updateAmount,
      };

      const responseObject = {
        total_spent: total_amount,
        balance: updateAmount,
        products: purchasedProducts
      };

      const updatedTransaction = await User.findOneAndUpdate({ _id: id }, creditObject, { new: true, runValidators: true, });

      if (updatedTransaction) {
        return res
          .status(200)
          .json(responses.success(200, 'Goods successfully Purchased', responseObject));
      }
    } catch (error) {
      tracelogger(error);
      return res
        .status(500)
        .json(responses.error(500, 'Server error', error));
    }
  }
}

export default TransactionController;
