var express = require('express');
var router = express.Router();
var dao=require('../dao/conn')

// 主页ejs渲染
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 测试html渲染
router.get('/html',function(req,res,nex){
  res.render('html.html');
})

// 数据库测试
router.get('/mysqltest', function(req, res, next) {
  dao.queryArgs('select * from test where test like ?',['%t'],function(err,rows){
    res.send([err,rows])
  })
});

module.exports = router;
