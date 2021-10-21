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
const { query } = require('express');
let router = express.Router();

router.post('/selectEvery', function(req, res, next) {
    let queryJson = req.body;

    let queryStr = "select " + queryJson.selectValue + " from " + queryJson.fromValue;
    if(queryJson.whereValue !== ""){
        queryStr = queryStr + " where " + queryJson.whereValue;
    }
    if(queryJson.sortValue !== ""){
        queryStr = queryStr + " order by " + queryJson.sortValue;
    }
    
    queryStr = queryStr + " limit " + queryJson.limitValue;

    pool.getConnection()
    .then(conn => {
        conn.query(queryStr)
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