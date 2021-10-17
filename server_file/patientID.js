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

// 查詢此patientID，若不存在則插入一筆，若存在則回傳RID
router.get('/patientID', function(req, res, next) {
    
    let p1 = req.query.patientID;

    pool.getConnection()
    .then(conn => {
        conn.query("select RID from report where patientID=?", [p1])
        .then(result => {
            res.send(result);
            conn.release();
        })
        .catch(err => {
            res.send('sql error');
            conn.release();
        })
        
    }).catch(err => {
        res.send('connect db fail');
    });
});

module.exports = router;