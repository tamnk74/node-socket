'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 4000;

var app = (0, _express2.default)();

// Allow cors
app.use((0, _cors2.default)());

// Parse incoming requests data
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _compression2.default)());

app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
app.set('views', _path2.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/', _routes.WebRouter);

app.listen(PORT, function () {
  return console.log('Listening on ' + PORT);
});