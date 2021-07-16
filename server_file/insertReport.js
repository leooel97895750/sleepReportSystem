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
    let reportParams = [rp.CaseID, rp.Name, rp.Age, rp.Sex, rp.DOB, rp.Height, rp.Weight, rp.BMI, rp.Neck, rp.Waist, rp.Hip,
        rp.HADS_A, rp.HADS_D, rp.ESS, rp.PSQI, rp.SOS, rp.THI, rp.GERD_Q, rp.WHO_Phy, rp.WHO_Psy, rp.BP_S_D,
        rp.BP_S_S, rp.BP_W_D, rp.BP_W_S, rp.SleepQuality, rp.AHI, rp.AI, rp.HI, rp.OI, rp.CI, rp.MI, rp.AHI_Supine,
        rp.AHI_NSupine, rp.AHI_REM, rp.AHI_NREM, rp.AHI_Left, rp.AHI_Right, rp.AHI_REM_Supine,
        rp.AHI_REM_NSupine, rp.AHI_NREM_Supine, rp.AHI_NREM_NSupine, rp.StartTime, rp.EndTime,
        rp.TotalRecordTime, rp.TotalSleepPeriod, rp.TotalSleepTime, rp.AwakeTime, rp.Stage1,
        rp.REM, rp.Stage2, rp.SleepLatency, rp.Stage3, rp.Efficiency, rp.ArousalIndex, rp.OA, rp.OAT, rp.CA,
        rp.CAT, rp.MA, rp.MAT, rp.HA, rp.HAT, rp.LA, rp.LH, rp.MeanSpO2, rp.MeanDesat, rp.MinSpO2, rp.ODI, rp.Snore,
        rp.SnoreIndex, rp.MS, rp.MR, rp.MN, rp.LS, rp.LR, rp.LN, rp.HS, rp.HR, rp.HN, rp.MeanHR, rp.MinHR, rp.LM_R,
        rp.LM_N, rp.LM_T, rp.PLM_R, rp.PLM_N, rp.PLM_T, rp.PLMI_R, rp.PLMI_N, rp.PLMI_T, rp.Baseline_path,
        rp.Hypnogram_path, rp.Event_path, rp.BodyPosition_path, rp.HeartRate_path, rp.SaO2_path,
        rp.Sound_path, rp.PLM_path, rp.FriedmanStage, rp.TonsilSize, rp.FriedmanTonguePosition,
        rp.Technician, rp.TechnicianDate, rp.Physician, rp.PhysicianData, rp.Comment, rp.Disease, rp.Treatment];

    pool.getConnection()
    .then(conn => {
        conn.query("insert into report(" +

            "CaseID, Name, Age, Sex, DOB, Height, Weight, BMI, Neck, Waist, Hip, " +
            "HADS_A, HADS_D, ESS, PSQI, SOS, THI, GERD_Q, WHO_Phy, WHO_Psy, BP_S_D, " +
            "BP_S_S, BP_W_D, BP_W_S, SleepQuality, AHI, AI, HI, OI, CI, MI, AHI_Supine, " +
            "AHI_NSupine, AHI_REM, AHI_NREM, AHI_Left, AHI_Right, AHI_REM_Supine, " +
            "AHI_REM_NSupine, AHI_NREM_Supine, AHI_NREM_NSupine, StartTime, EndTime, " +
            "TotalRecordTime, TotalSleepPeriod, TotalSleepTime, AwakeTime, Stage1, " +
            "REM, Stage2, SleepLatency, Stage3, Efficiency, ArousalIndex, OA, OAT, CA, " +
            "CAT, MA, MAT, HA, HAT, LA, LH, MeanSpO2, MeanDesat, MinSpO2, ODI, Snore, " +
            "SnoreIndex, MS, MR, MN, LS, LR, LN, HS, HR, HN, MeanHR, MinHR, LM_R, " +
            "LM_N, LM_T, PLM_R, PLM_N, PLM_T, PLMI_R, PLMI_N, PLMI_T, Baseline_path, " +
            "Hypnogram_path, Event_path, BodyPosition_path, HeartRate_path, SaO2_path, " +
            "Sound_path, PLM_path, FriedmanStage, TonsilSize, FriedmanTonguePosition, " +
            "Technician, TechnicianDate, Physician, PhysicianData, Comment, Disease, " +
            "Treatment" + 

            ") values(" +
            "?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?" +
            ")", reportParams)
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