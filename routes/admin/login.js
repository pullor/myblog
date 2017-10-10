var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://47.95.3.214:27017/myblog'
const ObjectId = require('mongodb').ObjectId;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/login');
});


router.post('/', function(req, res, next) {
  let username = req.body.username
  let pwd = req.body.pwd
  console.log(username, pwd)
  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.send(err)
    } else {
      let articles = db.collection('users')
      articles.find({username:username,pwd:pwd}).toArray(function (err, result) {
        if (err){
          res.send(err)
        } else {
          if (result.length) {
            console.log(result.length)
            req.session.isLogin = true
            res.redirect('/admin')
          } else {
            res.redirect('/login')
            console.log(result.length)
          }
        }
      })
    }
  })
});

module.exports = router;
