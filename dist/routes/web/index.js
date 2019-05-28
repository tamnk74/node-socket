'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var router = (0, _express.Router)();

router.get('/test', function (req, res) {
  return res.send('OK');
});
router.get('/', function (req, res) {
  return res.render('pages/home', { page: 'Home', menuId: 'home' });
});

exports.default = router;