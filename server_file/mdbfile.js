let express = require('express');
let router = express.Router();
//let mdb = require('mdb');
let mdb = require('mdb-reader');
let fs = require('fs');
let path = require("path");
let formidable = require('formidable');

// 記得在routes下創一個uploads資料夾
router.post('/mdb', function(req, res, next) {

  let timestamp = req.query.timestamp;
  let yearMonth = timestamp.slice(0, 7);

  let tmpFileName = "";
  let form = new formidable.IncomingForm();
  form.maxFieldsSize = 50 * 1024 * 1024;
  form.parse(req);

  form.on("fileBegin", function(name, file){
    // 同步創建資料夾
    if(!fs.existsSync(path.resolve(__dirname, "./uploads/" + yearMonth))){
      fs.mkdirSync(path.resolve(__dirname, "./uploads/" + yearMonth));
    }
    tmpFileName = 'events' + timestamp + '.MDB';
    console.log('# save as ' + tmpFileName);
    file.path = __dirname + "/uploads/" + yearMonth + "/" + tmpFileName;
  });

  form.on("file", function(name, file){
    console.log("# uploaded file" + file.name);
  });

  form.once('end', () => {
    
    // 檔案完成上載後開啟
    let buffer = fs.readFileSync(path.resolve(__dirname, "./uploads/" + yearMonth + "/" + tmpFileName));
    let events = new mdb(buffer);
    let mytable = events.getTableNames()[0];
    //console.log(mytable); // ScoredEvents
    let table = events.getTable(mytable);

    // 讀取事件資料
    res.send(table.getData());
  });
});

module.exports = router;
