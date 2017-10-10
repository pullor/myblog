var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var articles = require('./routes/articles');
var admin = require('./routes/admin/admin');
var login = require('./routes/admin/login');
var categoryList = require('./routes/admin/categoryList');
var articleList = require('./routes/admin/articleList')

var app = express();

var session = require('express-session');
app.use(session({
  secret: 'myblog',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html',require('ejs').__express);
app.set('view engine','html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/articles',articles);

app.use('/admin',checkLogin);
app.use('/admin',admin);

app.use('/categoryList',checkLogin);
app.use('/login',login);

app.use('/categoryList',checkLogin);
app.use('/categoryList',categoryList);

app.use('/articleList',checkLogin);
app.use('/articleList',articleList);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function checkLogin(req, res,next) {
  if(!req.session.isLogin){
    res.redirect('/login')
    console.log(111)
  }
  next();
}
module.exports = app;
