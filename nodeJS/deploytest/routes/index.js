var express = require('express');
var router = express.Router();
var db = require('../db/db_conn');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DB연동은 억덕계하징' });
});

module.exports = router;
