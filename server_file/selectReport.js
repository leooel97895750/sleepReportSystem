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

// 查詢report所有資料
router.get('/selectReport', function(req, res, next) {
    
    let p1 = req.query.rid;

    pool.getConnection()
    .then(conn => {
        conn.query("select * from report where RID=?", [p1])
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