var express = require('express');
var fs = require('fs');
var showdown = require('showdown');
var showdownKatex = require('showdown-katex');
var router = express.Router();
var dirfather = 'public/_data';


converter = new showdown.Converter({
  extensions: [
    showdownKatex({
      // maybe you want katex to throwOnError
      throwOnError: true,
      // disable displayMode
      displayMode: false,
      // change errorColor to blue
      errorColor: '#1500ff',
      delimiters: [
        { left: "$", right: "$", display: false, latex: true }
      ]
    }),
  ],
});
converter.setFlavor("github");

function read(url) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf-8', function (err, data) {
      if (err) return reject(err);
      resolve(data)
    })
  })
}

async function getMDDetailData() {
  var content = '';
  var info = '';

  content = await read(dirfather + '/' + dirName + '/index.md');
  info = await read(dirfather + '/' + dirName + '/info.json');
  info = JSON.parse(info);

  var bigDate = getDate(info.date);

  var data = {
    dir: dirName, year: bigDate.getFullYear(), month: bigDate.getMonth() + 1, date: bigDate.getDate(),
    day: bigDate.getDay(), title: info.title, abstract: info.abstract,
    mdHtml: converter.makeHtml(content)
    
  };

  return data;
};

function getTimeStamp(dateStr) {
  var dateTimeStamp = Date.parse(dateStr, "Y-m-d");
  return dateTimeStamp;
}

function getDate(dateStr) {
  var dateTimeStamp = getTimeStamp(dateStr);
  var date = new Date(dateTimeStamp);
  return date;
}

/* GET users listing. */
router.get('/', async function (req, res, next) {

  dirName = req.baseUrl.substr(1, req.baseUrl.length - 1);
  var mdDetailData = await getMDDetailData();

  res.render('content', { data: mdDetailData }, function (err, html) {

    res.send(html);
  })
});

module.exports = router;
