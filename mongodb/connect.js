/**
 * Created by myimac on 17/10/9.
 */
const mongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/myblog';

mongoClient.connect(url, function (err, db) {
    if (err) {
        console.log(err)
    } else {
        console.log('success connect')
        var solts = db.collection("solts");
        solts.find().toArray(function (err, res) {
            if (err) {
                console.log(err)
            } else {
                console.log(res)
            }
        })
    }
    db.close(function () {
        console.log('db close')
    });
})