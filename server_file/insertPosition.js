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

router.post('/insertPosition', function(req, res, next) {
    
    let positionJson = req.body;
    let RID = positionJson.RID;
    let data = positionJson.position;

    let values = [];

    for(let i=0; i<data.length; i++){
        values.push([RID, i+1, data[i]]);
    }

    pool.getConnection()
    .then(conn => {
        conn.batch("insert into `position`(RID, Epoch, Position) values(?,?,?)", values)
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