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

// 查詢report中所有日期
router.get('/selectDate', function(req, res, next) {

    pool.getConnection()
    .then(conn => {
        conn.query("select RID, Name, PatientID, StudyDate, Since, Technician, TechnicianDate, Physician, PhysicianDate from report order by Since desc")
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