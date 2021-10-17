let mdb = require('mdb-reader');
let fs = require('fs');
let path = require("path");
let mariadb = require('mariadb');
require('dotenv').config();

let pool = mariadb.createPool({
    host : process.env.host,
    port : process.env.port,
    user : process.env.user,
    password : process.env.password,
    database : process.env.database,
    connectionLimit: 10
});

let express = require('express');
let router = express.Router();
let cors = require('cors');

router.get('/insertEvent', function(req, res, next) {
    
    /* 
        '1':'Central Apnea',
        '2':'Obstructive Apnea',
        '3':'Mixed Apnea',
        '4':'SpO2 Desat',
        '5':'??',
        '6':'SpO2 Artifact',
        '7':'Arousal 1 ARO RES',
        '8':'Arousal 2 ARO Limb',
        '9':'Arousal 3 ARO SPONT',
        '10':'Arousal 4 ARO PLM',
        '11':'??',
        '12':'Limb movement(Left)(PLM)',
        '13':'Limb movement(Right)(PLM)',
        '29':'Obstructive Hypopnea',
        '30':'?Central Hypopnea?',
        '31':'?Mixed Hypopnea?',
        '32':'RERA',
        '33':'Snore'
    */

    let timestamp = req.query.timestamp;
    let yearMonth = timestamp.slice(0, 7);
    let RID = req.query.rid;

    // 檔案完成上載後開啟
    let tmpFileName = 'events' + timestamp + '.MDB';
    let buffer = fs.readFileSync(path.resolve(__dirname, "./uploads/" + yearMonth + "/" + tmpFileName));
    let events = new mdb(buffer);
    let mytable = events.getTableNames()[0];
    let table = events.getTable(mytable);
    let data = table.getData();
    

    let values = [];

    for(let i=0; i<data.length; i++){
        let epoch = Math.ceil(data[i].EVT_TIME / 30);
        values.push([Number(RID), Number(data[i].EVT_TYPE), Number(data[i].EVT_TIME), Number(epoch), Number(data[i].EVT_LENGTH), Number(data[i].PARAM1), Number(data[i].PARAM2), Number(data[i].PARAM3), Number(data[i].MAN_SCORED)]);
    }
    //console.log(values);

    pool.getConnection()
    .then(conn => {
        conn.batch("insert into `event`(RID, Etype, Etime, Epoch, Elength, Param1, Param2, Param3, ManScored) values(?,?,?,?,?,?,?,?,?)", values)
        .then(result => {
            res.send(result);
            conn.release();
        })
        .catch(err => {
            console.log(err);
            res.send('sql error');
            conn.release();
        })
        
    }).catch(err => {
        res.send('connect db fail');
    });
});

module.exports = router;