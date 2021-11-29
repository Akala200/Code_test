/* eslint-disable no-empty */
/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable require-jsdoc */
import bcrypt from 'bcrypt';
import { signToken } from '../utils/storeToken';
import tracelogger from '../logger/tracelogger';
import responses from '../utils/responses';

const request = require('request');
const xml2js = require('xml2js');

const soapRequest = require('easy-soap-request');

/**
 * @description Defines the actions to for the Datas endpoints
 * @class DatasController
 */
class DataController {
  /**
   *@description The Data class
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and data
   *@memberof DatasController
   */

  /**
   *@description Send Data to number
   *@static
   *@param  {Object} req - request
   *@param  {object} res - response
   *@returns {object} - status code, message and created Data
   *@memberof DatasController
   */
  static async purchaseData(req, res) {
    const {
      data_amount, phone,
    } = req.body;

    // example data
    const url = 'http://41.203.65.10:8913/glongtopupservice/service?wsdl';
    const sampleHeaders = {
      'Data-agent': 'sampleTest',
      'Content-Type': 'text/xml;charset=UTF-8',
    };
    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ext="http://external.interfaces.ers.seamless.com/">
    <soapenv:Header/>
    <soapenv:Body>
       <ext:requestTopup>
          <!--Optional:-->
          <context>
             <!--Optional:-->
             <channel>WSClient</channel>
             <!--Optional:-->
             <clientComment>WEB9050000924</clientComment>
             <!--Optional:-->
             <clientId>ERS</clientId>
             <!--Optional:-->
             <prepareOnly>false</prepareOnly>
             <!--Optional:-->
             <clientReference>REFRENCE ID</clientReference>
             <clientRequestTimeout>500</clientRequestTimeout>
             <!--Optional:-->
             <initiatorPrincipalId>
                <!--Optional:-->
                <id>WEB9050000924</id>
                <!--Optional:-->
                <type>RESELLERData</type>
                <!--Optional:-->
                <DataId>9900</DataId>
             </initiatorPrincipalId>
             <!--Optional:-->
             <password>A2ibakat19fm</password>
             <!--Optional:-->
             <transactionProperties>
                <!--Zero or more repetitions:-->
                <entry>
                   <!--Optional:-->
                   <key>TRANSACTION_TYPE</key>
                   <!--Optional:-->
                   <value>PRODUCT_RECHARGE</value>
                </entry>
             </transactionProperties>
          </context>
          <!--Optional:-->
          <senderPrincipalId>
             <!--Optional:-->
             <id>WEB9050000924</id>
             <!--Optional:-->
             <type>RESELLERData</type>
             <!--Optional:-->
             <DataId>9900</DataId>
          </senderPrincipalId>
          <!--Optional:-->
          <topupPrincipalId>
             <!--Optional:-->
             <id>${phone}</id>
             <!--Optional:-->
             <type>SUBSCRIBERMSISDN</type>
             <!--Optional:-->
             <DataId></DataId>
          </topupPrincipalId>
          <!--Optional:-->
          <senderAccountSpecifier>
             <!--Optional:-->
             <accountId>WEB9050000924</accountId>
             <!--Optional:-->
             <accountTypeId>RESELLER</accountTypeId>
          </senderAccountSpecifier>
          <!--Optional:-->
          <topupAccountSpecifier>
             <!--Optional:-->
             <accountId>${phone}</accountId>
             <!--Optional:-->
             <accountTypeId>DATA_BUNDLE</accountTypeId>
          </topupAccountSpecifier>
          <!--Optional:-->
          <productId>DATA-32</productId>
          <!--Optional:-->
          <amount>
             <!--Optional:-->
             <currency>NGN</currency>
             <!--Optional:-->
             <value>${data_amount}</value>
          </amount>
       </ext:requestTopup>
    </soapenv:Body>
   </soapenv:Envelope>`;

    const options = {
      url: 'http://41.203.65.10/glongtopupservice/service?wsdl',
      method: 'POST',
      body: xml,
      headers: {
        'Content-Type': 'text/xml;charset=utf-8',
        'Accept-Encoding': 'gzip,deflate',
        'Content-Length': xml.length,
      }
    };
    const callback = (error, response, body) => {
      console.log(error);
      if (error) {
        return res
          .status(500)
          .json(responses.success(500, 'Could not connect to the IP'));
      }
      console.log(response);
      console.log(body);
      if (!error && response.statusCode === 200) {
        console.log('Raw result', body);
        const parser = new xml2js.Parser({ explicitArray: false, trim: true });
        parser.parseString(body, (err, result) => {
          console.log('JSON result', result);
        });
      }
      console.log('E', response.statusCode, response.statusMessage);
      return res
        .status(200)
        .json(responses.success(200, response.statusMessage, body));
    };
    request(options, callback);
  }
}

export default DataController;
