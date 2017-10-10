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
            res.send(err)
        } else {
            let solts = db.collection('solts')
            solts.find().toArray(function (err, docs) {
                if (err) {
                    res.send(err)
                } else {
                    res.render('admin/category_list',{data: docs})
                    console.log(docs)
                }
            })
        }
    })
    // res.render('admin/category_list');
});
router.get('/category_add', function(req, res, next) {
    res.render('admin/category_add');
});
router.get('/category_edit', function(req, res, next) {
    let id = req.query.id;
    console.log(id);
    MongoClient.connect(url,function (err, db) {
        if (err) {
            res.send(err);
        } else {
            let solt = db.collection('solts')
            solt.find({_id:ObjectId(id)}).toArray(function (err, docs) {
                if (err) {
                    res.send(err)
                } else {
                    res.render('admin/category_edit', {data:docs[0]})
                }
            })
        }
    })
});

router.post('/category_add', function(req, res, next) {
    let title = req.body.title
    let solt = req.body.solt
    MongoClient.connect(url,function (err, db) {
        if (err) {
            res.send(err)
        } else {
            let solts = db.collection('solts');
            solts.insert({title:title,solt:solt},function (err, result) {
                if (err) {
                    res.send(err)
                } else {
                    res.send("添加分类成功!<a href='/categoryList'>查看列表")
                }
            })
        }
    })
});
router.post('/category_edit', function(req, res, next) {
    let title = req.body.title
    let solt = req.body.solt
    let id = req.body.id
    MongoClient.connect(url,function (err, db) {
        if (err) {
            res.send(err)
        } else {
            let solts = db.collection('solts');
            solts.update({_id:ObjectId(id)},{$set: {"title":title,"sort":solt}},function (err, result) {
                if (err) {
                    res.send(err)
                } else {
                    res.send("更新成功!<a href='/categoryList'>返回列表")
                }
            })
        }
    })
});
router.get('/delete',function (req, res) {
    let id = req.query.id
    MongoClient.connect(url,function (err, db) {
        if (err) {
            res.send(err)
        } else {
            let solts = db.collection("solts")
            solts.remove({_id:ObjectId(id)}, function (err,result) {
                if (err) {
                    res.send(err)
                } else {
                    res.redirect("/categoryList")
                }
            })
        }
    })
})
module.exports = router;
