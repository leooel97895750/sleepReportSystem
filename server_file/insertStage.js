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

router.post('/insertStage', function(req, res, next) {
    
    let stageJson = req.body;
    let RID = stageJson.RID;
    let data = stageJson.stage;

    let values = [];

    for(let i=0; i<data.length; i++){
        if(data[i] === 10) values.push([Number(RID), Number(i+1), Number(0)]);
        else if(data[i] === 1) values.push([Number(RID), Number(i+1), Number(1)]);
        else if(data[i] === 2) values.push([Number(RID), Number(i+1), Number(2)]);
        else if(data[i] === 3) values.push([Number(RID), Number(i+1), Number(3)]);
        else if(data[i] === 5) values.push([Number(RID), Number(i+1), Number(5)]);
    }

    pool.getConnection()
    .then(conn => {
        conn.batch("insert into `stage`(RID, Epoch, Stage) values(?,?,?)", values)
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