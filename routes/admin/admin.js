var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/index');
});
router.get('/logout', function(req, res, next) {
  req.session.isLogin = null
  res.render('admin/login');
});

module.exports = router;
