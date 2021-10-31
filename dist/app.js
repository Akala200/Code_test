'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _errorhandlers = require('./server/middlewares/errorhandlers');

var _tracelogger = require('./server/logger/tracelogger');

var _tracelogger2 = _interopRequireDefault(_tracelogger);

var _routes = require('./server/routes');

var _routes2 = _interopRequireDefault(_routes);

var _index = require('./server/config/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import config from './server/config/index';


// initialize express
var app = (0, _express2.default)();

// for request
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cors2.default)());
app.use((0, _morgan2.default)('dev'));

// connect to mongodb
// eslint-disable-next-line max-len
var mongoURL = _index2.default.DB_TEST;
_mongoose2.default.connect(mongoURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}, function () {
  process.stdout.write('connected to mongodb');
});

app.get('/', function (req, res) {
  res.json({ massage: 'Welcome to Test Api' });
});

// Routes
app.use('/api', _routes2.default);

app.use('*', _errorhandlers.notFound);
app.use(_errorhandlers.errorHandler);

process.on('unhandledRejection', function (reason) {
  (0, _tracelogger2.default)(reason);
});

process.on('uncaughtException', function (reason) {
  (0, _tracelogger2.default)(reason);
});

var PORT = process.env.PORT || 5678;
app.listen(PORT, function () {
  process.stdout.write('app is listening on port ' + PORT);
});

exports.default = app;