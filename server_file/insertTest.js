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

router.get('/insertTest', function(req, res, next) {
    
    let p1 = 9789;

    pool.getConnection()
    .then(conn => {
      conn.query("insert into `test`(var1) values(?)", [p1])
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