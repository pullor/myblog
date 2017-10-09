/**
 * Created by myimac on 17/10/9.
 */
var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/myblog'

router.get('/', function(req, res, next) {
    res.render('admin/article_list');
    mongoClient.connect(url, function (err, db) {
        if (err) {
            console.log(err)
        } else {
            console.log('success connect')
        }
        db.close(function () {
            console.log('db close')
        });
    })
});
router.get('/article_add', function(req, res, next) {
    res.render('admin/article_add');
});
module.exports = router;
