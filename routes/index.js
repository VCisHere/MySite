var express = require('express');
var fs = require('fs');
var showdown = require('showdown');
var router = express.Router();
var dirfather = 'public/_data';
var dirData = '';
var mdFileDataList = [];
var pageData = { totalPage: 0, articleNum: 0, nowPage: 0 };
var limit = 6;

converter = new showdown.Converter();

init();

async function init() {
  dirData = fs.readdirSync(dirfather);
  var mdFileData = await getMDData();
  var dataUnit = [];
  var indexInt = 0;
  for (index in mdFileData) {
    indexInt = parseInt(index);
    dataUnit.push(mdFileData[indexInt]);
    if ((indexInt + 1) % limit == 0) {
      mdFileDataList.push(dataUnit);
      dataUnit = [];
    }
  }
  if (dataUnit.length != 0) {
    mdFileDataList.push(dataUnit);
  }
}

function read(url) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf-8', function (err, data) {
      if (err) return reject(err);
      resolve(data)
    })
  })
}

async function getMDData() {
  var info = '';
  var data = [];
  pageData.articleNum = dirData.length;
  pageData.totalPage = parseInt((dirData.length + limit - 1) / limit);

  for (dirName of dirData) {
    //content = await read(dirfather + '/' + dirName + '/index.md');
    info = await read(dirfather + '/' + dirName + '/info.json');
    info = JSON.parse(info);
    var timeStamp = getTimeStamp(info.date);
    var bigDate = getDate(info.date);

    var item = {
      dir: dirName, year: bigDate.getFullYear(), month: bigDate.getMonth() + 1, date: bigDate.getDate(),
      day: bigDate.getDay(), timeStamp: timeStamp, title: info.title, abstract: info.abstract
    };

    data.push(item);
  }

  data = data.sort((a, b) => { return (a.timeStamp < b.timeStamp) ? 1 : -1 });
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

/* GET home page. */
router.get('/', function (req, res, next) {

  if (req.query.page == undefined) {
    req.query.page = 1;
  }

  if (req.query.page < 1 || req.query.page > pageData.totalPage) {
    res.render('error');
  } else {
    pageData.nowPage = req.query.page;
    res.render('index', { data: mdFileDataList[req.query.page - 1], pageInfo: pageData }, function (err, html) {
      res.send(html);
    })
  }

});

module.exports = router;
