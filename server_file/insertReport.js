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

// 新增一筆report進入資料庫
router.post('/insertReport', function(req, res, next) {
    
    let rp = req.body;
    let reportParams = [String(rp.PatientID), String(rp.StudyDate), String(rp.Name), Number(rp.Age), String(rp.Sex), String(rp.DOB), Number(rp.Height), 
        Number(rp.Weight), Number(rp.BMI), Number(rp.Neck), Number(rp.AHI), Number(rp.AI), Number(rp.HI), Number(rp.OI), Number(rp.CI), 
        Number(rp.MI), Number(rp.AHI_Supine),Number(rp.AHI_NSupine), Number(rp.AHI_REM), Number(rp.AHI_NREM), Number(rp.AHI_Left), 
        Number(rp.AHI_Right), Number(rp.AHI_REM_Supine), Number(rp.AHI_REM_NSupine), Number(rp.AHI_NREM_Supine), Number(rp.AHI_NREM_NSupine), 
        String(rp.StartTime), String(rp.EndTime), Number(rp.TotalRecordTime), Number(rp.TotalSleepPeriod), Number(rp.TotalSleepTime), 
        Number(rp.AwakeTime), Number(rp.Stage1), Number(rp.REM), Number(rp.Stage2), Number(rp.SleepLatency), Number(rp.Stage3), 
        Number(rp.Efficiency), Number(rp.ArousalIndex), Number(rp.OA), Number(rp.OAT), Number(rp.CA), Number(rp.CAT), Number(rp.MA), 
        Number(rp.MAT), Number(rp.HA), Number(rp.HAT), Number(rp.LA), Number(rp.LH), Number(rp.SpO2Count), Number(rp.MeanSpO2), Number(rp.MeanDesat), 
        Number(rp.MinSpO2), Number(rp.ODI), Number(rp.Snore), Number(rp.SnoreIndex), Number(rp.MS), Number(rp.MR), Number(rp.MN), 
        Number(rp.LS), Number(rp.LR), Number(rp.LN), Number(rp.HS), Number(rp.HR), Number(rp.HN), Number(rp.MeanHR), Number(rp.MinHR), 
        Number(rp.LM_R), Number(rp.LM_N), Number(rp.LM_T), Number(rp.PLM_R), Number(rp.PLM_N), Number(rp.PLM_T), Number(rp.PLMI_R), 
        Number(rp.PLMI_N), Number(rp.PLMI_T), String(rp.Baseline_path), String(rp.Hypnogram_path), String(rp.Event_path), 
        String(rp.BodyPosition_path), String(rp.HeartRate_path), String(rp.SaO2_path), String(rp.Sound_path), String(rp.PLM_path)
    ];

    
    // 檢查計算中分母為0的特殊情況
    for(let i=0; i<reportParams.length; i++){
        if(Number.isNaN(reportParams[i])){
            reportParams[i] = 0;
        }
    }
    

    pool.getConnection()
    .then(conn => {
        conn.query("insert into report(" +
            "PatientID, StudyDate, Name, Age, Sex, DOB, Height, Weight, BMI, Neck, AHI, AI, HI, OI, CI, MI, AHI_Supine, AHI_NSupine, " +
            "AHI_REM, AHI_NREM, AHI_Left, AHI_Right, AHI_REM_Supine, AHI_REM_NSupine, AHI_NREM_Supine, AHI_NREM_NSupine, " +
            "StartTime, EndTime, TotalRecordTime, TotalSleepPeriod, TotalSleepTime, AwakeTime, Stage1, REM, Stage2, " +
            "SleepLatency, Stage3, Efficiency, ArousalIndex, OA, OAT, CA, CAT, MA, MAT, HA, HAT, LA, LH, SpO2Count, MeanSpO2, " +
            "MeanDesat, MinSpO2, ODI, Snore, SnoreIndex, MS, MR, MN, LS, LR, LN, HS, HR, HN, MeanHR, MinHR, LM_R, LM_N, " +
            "LM_T, PLM_R, PLM_N, PLM_T, PLMI_R, PLMI_N, PLMI_T, Baseline_path, Hypnogram_path, Event_path, BodyPosition_path, " +
            "HeartRate_path, SaO2_path, Sound_path, PLM_path" +
            ") values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            reportParams)
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