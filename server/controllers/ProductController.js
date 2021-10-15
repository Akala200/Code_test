/* eslint-disable no-empty */
/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable require-jsdoc */
import Product from '../models/Product';
import User from '../models/Users';
import tracelogger from '../logger/tracelogger';
import responses from '../utils/responses';


/**
 * @description Defines the actions to for the product endpoints
 * @class ProductController
 */
class ProductController {
  /**
   *@description The product class
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and created wallet
   *@memberof ProductController
   */


  /**
   *@description Creates a new Product
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and created Product
   *@memberof ProductController
   */
  static async newProduct(req, res) {
    const {
      productName, cost, amountAvailable, currency
    } = req.body;
    const id = req.userId;


    console.log(productName, id, cost, amountAvailable, currency);
    if (!productName || !cost || !amountAvailable || !currency) {
      return res
        .status(400)
        .json(responses.error(400, 'Kindly fill all required information'));
    }

    try {
      const getuser = await User.findOne({ _id: id });

      if (!getuser || getuser.role !== 'Seller') {
        return res
          .status(400)
          .json(responses.error(400, 'Sorry, Seller/merchant does not exist'));
      }

      const ProductObject = {
        productName,
        sellerId: id,
        cost,
        amountAvailable,
        currency
      };

      const createdProduct = await Product.create(ProductObject);
      if (createdProduct) {
        return res
          .status(200)
          .json(responses.success(200, 'Product successfully created', createdProduct));
      }
    } catch (error) {
      tracelogger(error);
      return res
        .status(500)
        .json(responses.error(500, 'Server error', error));
    }
  }


  /**
   *@description Update Product Details
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and created Product
   *@memberof ProductController
   */
  static async editProduct(req, res) {
    const {
      productId,
    } = req.query;

    const {
      productName, cost, amountAvailable, currency
    } = req.body;
    const id = req.userId;
    console.log(productId);


    try {
      const getProduct = await Product.findOne({ _id: productId });
      console.log(getProduct);

      if (!getProduct) {
        return res
          .status(400)
          .json(responses.error(400, 'Sorry, this Product does not exist'));
      }

      if (String(getProduct.sellerId) !== String(id)) {
        return res
          .status(400)
          .json(responses.error(400, 'You are not authorized to edit this product'));
      }

      const productObject = {
        productName, cost, amountAvailable, currency
      };

      const updatedProduct = await Product.findOneAndUpdate({ _id: productId }, productObject, { new: true, runValidators: true, });

      if (updatedProduct) {
        return res
          .status(200)
          .json(responses.success(200, 'Product successfully updated', updatedProduct));
      }
    } catch (error) {
      tracelogger(error);
      return res
        .status(500)
        .json(responses.error(500, 'Server error', error));
    }
  }


  /**
   *@description Delete A Product
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and created Product
   *@memberof ProductController
   */
  static async deleteProduct(req, res) {
    const {
      id
    } = req.query;


    try {
      const getProduct = await Product.findOne({ _id: id });

      if (!getProduct) {
        return res
          .status(400)
          .json(responses.error(400, 'Sorry, this Product does not exist'));
      }
      const deletedProduct = await Product.findByIdAndRemove({ _id: id });

      if (deletedProduct) {
        return res
          .status(200)
          .json(responses.success(200, 'Product successfully deleted', deletedProduct));
      }
    } catch (error) {
      tracelogger(error);
      return res
        .status(500)
        .json(responses.error(500, 'Server error', error));
    }
  }


  /**
   *@description Get A Product
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and created Product
   *@memberof ProductController
   */
  static async getProduct(req, res) {
    const {
      id
    } = req.query;


    try {
      const getProduct = await Product.findOne({ _id: id });

      if (!Product) {
        return res
          .status(400)
          .json(responses.error(400, 'Sorry, this Product does not exist'));
      }
      return res
        .status(200)
        .json(responses.success(200, 'Product successfully retrieved', getProduct));
    } catch (error) {
      tracelogger(error);
      return res
        .status(500)
        .json(responses.error(500, 'Server error', error));
    }
  }
}

export default ProductController;
