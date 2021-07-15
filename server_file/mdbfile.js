var express = require('express');
var router = express.Router();
//var mdb = require('mdb');
var mdb = require('mdb-reader');
var fs = require('fs');
let path = require("path");
var formidable = require('formidable');

// 記得在routes下創一個uploads資料夾
router.post('/mdb', function(req, res, next) {

  let tmpFileName = "";
  let form = new formidable.IncomingForm();
  form.maxFieldsSize = 50 * 1024 * 1024;
  form.parse(req);

  form.on("fileBegin", function(name, file){
    let timeElapsed = Date.now();
    let today = new Date(timeElapsed);
    let timestamp = today.toISOString();
    tmpFileName = 'events' + timestamp + '.MDB';
    console.log('# save as ' + tmpFileName);
    file.path = __dirname + '/uploads/' + tmpFileName;
  });

  form.on("file", function(name, file){
    console.log("# uploaded file" + file.name);
  });

  form.once('end', () => {
    
    // 檔案完成上載後開啟
    let buffer = fs.readFileSync(path.resolve(__dirname, "./uploads/" + tmpFileName));
    let events = new mdb(buffer);
    let mytable = events.getTableNames()[0];
    console.log(mytable); // ScoredEvents
    let table = events.getTable(mytable);

    // 刪除上傳的檔案
    fs.unlinkSync(path.resolve(__dirname, "./uploads/" + tmpFileName));
    // 讀取事件資料
    res.send(table.getData());

  });
});

module.exports = router;
