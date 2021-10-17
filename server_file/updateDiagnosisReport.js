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

// 更新input資料進入report
router.post('/updateDiagnosisReport', function(req, res, next) {
    
    let rp = req.body;
    let reportParams = [
        rp.FriedmanStage,
        rp.TonsilSize,
        rp.FriedmanTonguePosition,
        rp.Technician,
        rp.TechnicianDate,
        rp.Physician,
        rp.PhysicianDate,
        rp.Comment,
        rp.ExtraTreatment,
        rp.DiseaseList,
        rp.RID
    ];

    pool.getConnection()
    .then(conn => {
        conn.query("update report set FriedmanStage=?, TonsilSize=?, FriedmanTonguePosition=?, Technician=?, TechnicianDate=?, Physician=?, PhysicianDate=?, Comment=?, ExtraTreatment=?, DiseaseList=? " +
                   "where RID=?"
        , reportParams)
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
        console.log(err);
        res.send('connect db fail');
    });
});

module.exports = router;