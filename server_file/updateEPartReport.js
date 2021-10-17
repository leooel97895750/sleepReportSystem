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
router.post('/updateEPartReport', function(req, res, next) {
    
    let rp = req.body;
    let reportParams = [
        rp.CaseID,
        rp.Waist,
        rp.Hip,
        rp.HADS_A,
        rp.HADS_D,
        rp.ESS,
        rp.PSQI,
        rp.SOS,
        rp.THI,
        rp.GERD_Q,
        rp.WHO_Phy,
        rp.WHO_Psy,
        rp.BP_S_D,
        rp.BP_S_S,
        rp.BP_W_D,
        rp.BP_W_S,
        rp.SleepQuality,
        rp.RID
    ];

    pool.getConnection()
    .then(conn => {
        conn.query("update report set CaseID=?, Waist=?, Hip=?, HADS_A=?, HADS_D=?, ESS=?, PSQI=?, SOS=?, THI=?, GERD_Q=?, " +
                   "WHO_Phy=?, WHO_Psy=?, BP_S_D=?, BP_S_S=?, BP_W_D=?, BP_W_S=?, SleepQuality=? " +
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