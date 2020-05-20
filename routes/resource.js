var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();

var options = {
  root: __dirname + '/public/',
  dotfiles: 'deny',
  headers: {
    'x-timestamp': Date.now(),
    'x-sent': true
  }
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (fs.existsSync(path.join(__dirname, '../public/_data', req.baseUrl)) == true) {
    res.sendFile(path.join(__dirname, '../public/_data', req.baseUrl));
  } else {
    res.send("Not Found");
  }
  
});

module.exports = router;
