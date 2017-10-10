/**
 * Created by myimac on 17/10/9.
 */
var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://47.95.3.214:27017/myblog'
const ObjectId = require('mongodb').ObjectId;

router.get('/', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log(err)
        } else {
            let articles = db.collection('articles')
            articles.find().toArray(function (err, result) {
                if (err) {
                    res.send(err)
                } else {
                    res.render('admin/article_list',{data:result})
                }
            })
            console.log('success connect')
        }
    })
});
router.get('/article_add', function(req, res, next) {
    res.render('admin/article_add');
});
router.get('/article_edit', function(req, res, next) {
    res.render('admin/article_edit');
});

router.post('/',function(req, res, next) {
    var title = req.body.subject
    var abstract = req.body.summary
    var content = req.body.content
    var status = req.body.submit
    var category_id = req.body.category_id
    var time = new Date()
    // var data = {
    //     title: title,
    //     abstract: abstract,
    //     content: content,
    //     status: status,
    //     category_id: category_id
    // }
    console.log(title,abstract,content,status,category_id)
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log(err)
        } else {
            let articles = db.collection('articles')
            articles.insert({title:title,abstract:abstract,content:content,status:status,solt:category_id,time: time},function (err, result) {
                if (err) {
                    res.send(err)
                } else {
                    res.send("添加文章成功!<a href='/articleList'>查看列表")
                }
            })
        }
        db.close(function () {
            console.log('db close')
        });
    })
});
router.get('/delete',function (req, res) {
    let id = req.query.id
    MongoClient.connect(url,function (err, db) {
        if (err) {
            res.send(err)
        } else {
            let solts = db.collection("articles")
            solts.remove({_id:ObjectId(id)}, function (err,result) {
                if (err) {
                    res.send(err)
                } else {
                    res.redirect("/articleList")
                }
            })
        }
    })
})
module.exports = router;
