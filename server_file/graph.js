var express = require('express');
var router = express.Router();
var fs = require('fs');
let path = require("path");
const bodyParser = require('body-parser');

router.post('/graph', function(req, res, next) {
    let graphJson = req.body;
    //console.log(graphJson);
    let timeElapsed = Date.now();
    let today = new Date(timeElapsed);
    let timestamp = today.toISOString();
    let yearMonth = timestamp.slice(0, 7);
    console.log(yearMonth);

    // 同步創建資料夾
    if(!fs.existsSync(path.resolve(__dirname, "./graphs/" + yearMonth))){
        fs.mkdirSync(path.resolve(__dirname, "./graphs/" + yearMonth));
    }

    // 非同步完成所有圖片儲存後返回 timestamp，失敗返回graph bad
    function promise(number){
        return new Promise((resolve, reject) => {
            let base64DataList = [graphJson.Baseline, graphJson.Hypnogram, graphJson.Event, graphJson.BodyPosition, graphJson.HeartRate, graphJson.SaO2, graphJson.Sound, graphJson.PLM];
            let fileNameList = ["Baseline", "Hypnogram", "Event", "BodyPosition", "HeartRate", "SaO2", "Sound", "PLM"];
            let base64Data = base64DataList[number].replace(/^data:image\/png;base64,/, "");
            let filename = fileNameList[number];

            fs.writeFile(path.resolve(__dirname, "./graphs/" + yearMonth + "/" + filename + timestamp + ".png"), base64Data, 'base64', function(err) {
                if(err) reject(filename + timestamp + '.png寫入失敗');
                else resolve(filename + timestamp + '.png寫入成功');
            });
        });
    }

    promise(0)
    .then((msg) => {
        console.log(msg);
        return promise(1);
    })
    .then((msg) => {
        console.log(msg);
        return promise(2);
    })
    .then((msg) => {
        console.log(msg);
        return promise(3);
    })
    .then((msg) => {
        console.log(msg);
        return promise(4);
    })
    .then((msg) => {
        console.log(msg);
        return promise(5);
    })
    .then((msg) => {
        console.log(msg);
        return promise(6);
    })
    .then((msg) => {
        console.log(msg);
        return promise(7);
    })
    .then((msg) => {
        console.log(msg);
        res.send(timestamp);
    })
    .catch((err) => {
        console.log(err);
        res.send("graph bad");
    });
    
});

module.exports = router;
