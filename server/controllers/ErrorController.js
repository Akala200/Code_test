/* eslint-disable no-empty */
/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable require-jsdoc */
import Error from '../models/Error';
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
  static async writeError(req, res) {
    const {
      error_type, error_message
    } = req.body;


    if (!error_type || !error_message) {
      return res
        .status(400)
        .json(responses.error(400, 'Kindly fill all required information'));
    }

    try {
      const ProductObject = {
        error_type,
        error_message,
      };

      const created = await Error.create(ProductObject);
      if (created) {
        return res
          .status(200)
          .json(responses.success(200, 'Error successfully created', created));
      }
    } catch (error) {
      tracelogger(error);
      return res
        .status(500)
        .json(responses.error(500, 'Server error', error));
    }
  }
}

export default ProductController;
