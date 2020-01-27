var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// 登录鉴权 返回token
router.post('/login',function(req,res,next){
  res.send()
})

//

module.exports = router;
