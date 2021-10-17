var express = require('express');
var router = express.Router();
var fs = require('fs');
let path = require("path");
var PizZip = require('pizzip');
var Docxtemplater = require('docxtemplater');
var ImageModule = require('docxtemplater-image-module');

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

// 將使用者沒輸入的值傳換成空字串，避免word中出現undefined
function n2s(value){
    return value === null ? "" : value;
}

// 奇怪的bug 單號如果是空字串word就打不開???
function n2w(value){
    return value === null ? "缺" : value;
}

// 判斷treatment程度
function ageAHIcondition(age, AHI){
    if(age <= 12){
        if(AHI <= 1) return "c0";
        else if(AHI <= 5) return "c1";
        else if(AHI <= 10) return "c2";
        else return "c3";
    }
    else{
        if(AHI <= 5) return "a0";
        else if(AHI <= 15) return "a1";
        else if(AHI <= 30) return "a2";
        else return "a3";
    }
}

// 簡化插入treatment的程式長度
function tword(TreatmentsDocx, isT, isN, isE, isR, text){
    TreatmentsDocx.push({
        hasTitle: isT === 1 ? true : false, 
        hasNumber: isN === 1 ? true : false, 
        hasEnglish: isE === 1 ? true : false, 
        hasRoman: isR === 1 ? true : false,
        Treatment: text
    });
}

router.get('/word', function(req, res, next) {

    let rid = req.query.rid;
    let wordName = req.query.filename;

    pool.getConnection()
    .then(conn => {
        conn.query("select * from report where RID=?", [rid])
        .then(result => {

            // reportData = rd
            let rd = result[0];
            conn.release();

            // 圖片部分
            var opts = {}
            opts.centered = true;
            opts.fileType = "docx";

            // 讀取本地檔案
            opts.getImage = function(tagValue, tagName) {
                return fs.readFileSync(path.resolve(__dirname, tagValue));
            }

            // 根據不同圖片回傳[width, height]
            opts.getSize = function(img, tagValue, tagName) {
                if(tagName === "g1") return [480, 60];
                else if(tagName === "g2") return [480, 60];
                else if(tagName === "g3") return [480, 200];
                else if(tagName === "g4") return [480, 50];
                else if(tagName === "g5") return [480, 50];
                else if(tagName === "g6") return [480, 50];
                else if(tagName === "g7") return [480, 30];
                else if(tagName === "g8") return [480, 30];

                return [480, 50];
            }
            var imageModule = new ImageModule(opts);

            // 文件部分
            var content = fs.readFileSync(path.resolve(__dirname, './templates/sleepTemplate.docx'), 'binary');
            var zip = new PizZip(content);
            var doc = new Docxtemplater(zip, { paragraphLoop: false, linebreaks: true });

            doc.attachModule(imageModule);

            // rd內容修改
            rd.CaseID = rd.CaseID.split(":")[0];
            
            // Diseases and treatment 根據資料庫中疾病列表去產生縮排迴圈內容
            let DiseasesDocx = [];
            let TreatmentsDocx = [];
            let diseaseList = rd.DiseaseList.split(',');
            for(let i=0; i<diseaseList.length; i++){
                let d = diseaseList[i];
                if(d === '1'){
                    DiseasesDocx.push({Disease: "Sleep-disordered breathing (G47.8)."});
                    tword(TreatmentsDocx, 1, 0, 0, 0, "Sleep-disordered breathing (G47.8):");
                    tword(TreatmentsDocx, 0, 1, 0, 0, "Obstructive sleep apnea is not likely.");
                }
                else if(d === '2'){
                    DiseasesDocx.push({Disease: "Snoring (R06.83)."});
                    tword(TreatmentsDocx, 1, 0, 0, 0, "Snoring (R06.83):");
                    tword(TreatmentsDocx, 0, 1, 0, 0, "Obstructive sleep apnea hypopnea is not likely.");
                    tword(TreatmentsDocx, 0, 1, 0, 0, "Body weight control.");
                    tword(TreatmentsDocx, 0, 1, 0, 0, "Further treatment with mandibular advancement device or surgery may be considered, if the patient is concerned about snoring.");
                    
                }
                else if(d === '3'){
                    let condition = ageAHIcondition(rd.Age, rd.AHI);
                    if(condition === "c1" || condition === "a1"){
                        DiseasesDocx.push({Disease: "Obstructive sleep hypopnea (Mild) (G47.33)."});
                        tword(TreatmentsDocx, 1, 0, 0, 0, "Obstructive sleep hypopnea (Mild) (G47.33):");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "Body weight control.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "Further treatment of mandibular advancement device or myofunctional therapy or surgery may be considered.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.");
                    }
                    else if(condition === "c2" || condition === "a2"){
                        DiseasesDocx.push({Disease: "Obstructive sleep hypopnea (Moderate) (G47.33)."});
                        tword(TreatmentsDocx, 1, 0, 0, 0, "Obstructive sleep hypopnea (Moderate) (G47.33):");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "Body weight control.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "Further treatment of CPAP or mandibular advancement device or myofunctional therapy or surgery may be considered.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.");
                    }
                    else if(condition === "c3" || condition === "a3"){
                        DiseasesDocx.push({Disease: "Obstructive sleep hypopnea (Severe) (G47.33)."});
                        tword(TreatmentsDocx, 1, 0, 0, 0, "Obstructive sleep hypopnea (Severe) (G47.33):");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "Body weight control.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "Further treatment of CPAP or surgery may be considered.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "AHI > 60, AHI (REM / Non-REM) < 2, limited surgical improvement can be predicted.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "AHI (Supine / Non-supine) < 2, limited body position therapy can be predicted.");
                    }
                }
                else if(d === '4'){
                    let condition = ageAHIcondition(rd.Age, rd.AHI);
                    if(condition === "c1" || condition === "a1"){
                        DiseasesDocx.push({Disease: "Obstructive sleep apnea hypopnea (Mild) (G47.33)."});
                        tword(TreatmentsDocx, 1, 0, 0, 0, "Obstructive sleep apnea hypopnea (Mild) (G47.33):");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "Body weight control.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "Further treatment of mandibular advancement device or myofunctional therapy or surgery may be considered.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.");
                    }
                    else if(condition === "c2" || condition === "a2"){
                        DiseasesDocx.push({Disease: "Obstructive sleep apnea hypopnea (Moderate) (G47.33)."});
                        tword(TreatmentsDocx, 1, 0, 0, 0, "Obstructive sleep apnea hypopnea (Moderate) (G47.33):");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "Body weight control.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "Further treatment of CPAP or mandibular advancement device or myofunctional therapy or surgery may be considered.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.");
                    }
                    else if(condition === "c3" || condition === "a3"){
                        DiseasesDocx.push({Disease: "Obstructive sleep apnea hypopnea (Severe) (G47.33)."});
                        tword(TreatmentsDocx, 1, 0, 0, 0, "Obstructive sleep apnea hypopnea (Severe) (G47.33):");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "Body weight control.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "Further treatment of CPAP or surgery may be considered.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "AHI > 60, AHI (REM / Non-REM) < 2, limited surgical improvement can be predicted.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "AHI (Supine / Non-supine) < 2, limited body position therapy can be predicted.");
                    }
                }
                else if(d === '5'){
                    let condition = ageAHIcondition(rd.Age, rd.AHI);
                    if(condition === "c1" || condition === "a1"){
                        DiseasesDocx.push({Disease: "Mixed sleep hypopnea (Mild) (G47.33, G47.37)."});
                        tword(TreatmentsDocx, 1, 0, 0, 0, "Mixed sleep hypopnea (Mild) (G47.33, G47.37):");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "Body weight control.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "Further treatment of mandibular advancement device or myofunctional therapy or surgery may be considered.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "The possible etiologies of central sleep apnea include");
                        tword(TreatmentsDocx, 0, 0, 1, 0, "congestive heart failure,");
                        tword(TreatmentsDocx, 0, 0, 1, 0, "hypothyroid disease,");
                        tword(TreatmentsDocx, 0, 0, 1, 0, "renal failure,");
                        tword(TreatmentsDocx, 0, 0, 1, 0, "neurological disease (parkinson's dz, alzheimer's dz),");
                        tword(TreatmentsDocx, 0, 0, 1, 0, "stroke, encephalitis, head injury,");
                        tword(TreatmentsDocx, 0, 0, 1, 0, "medication (opioids),");
                        tword(TreatmentsDocx, 0, 0, 1, 0, "unknown.");
                    }
                    else if(condition === "c2" || condition === "a2"){
                        DiseasesDocx.push({Disease: "Mixed sleep hypopnea (Moderate) (G47.33, G47.37)."});
                        tword(TreatmentsDocx, 1, 0, 0, 0, "Mixed sleep hypopnea (Moderate) (G47.33, G47.37):");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "Body weight control.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "Further treatment of CPAP or mandibular advancement device or myofunctional therapy or surgery may be considered.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "The possible etiologies of central sleep apnea include");
                        tword(TreatmentsDocx, 0, 0, 1, 0, "congestive heart failure,");
                        tword(TreatmentsDocx, 0, 0, 1, 0, "hypothyroid disease,");
                        tword(TreatmentsDocx, 0, 0, 1, 0, "renal failure,");
                        tword(TreatmentsDocx, 0, 0, 1, 0, "neurological disease (parkinson's dz, alzheimer's dz),");
                        tword(TreatmentsDocx, 0, 0, 1, 0, "stroke, encephalitis, head injury,");
                        tword(TreatmentsDocx, 0, 0, 1, 0, "medication (opioids),");
                        tword(TreatmentsDocx, 0, 0, 1, 0, "unknown.");
                    }
                    else if(condition === "c3" || condition === "a3"){
                        DiseasesDocx.push({Disease: "Mixed sleep hypopnea (Severe) (G47.33, G47.37)."});
                        tword(TreatmentsDocx, 1, 0, 0, 0, "Mixed sleep hypopnea (Severe) (G47.33, G47.37):");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "Body weight control.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "Further treatment of CPAP or surgery may be considered.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "AHI > 60, AHI (REM / Non-REM) < 2, limited surgical improvement can be predicted.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "AHI (Supine / Non-supine) < 2, limited body position therapy can be predicted.");
                        tword(TreatmentsDocx, 0, 1, 0, 0, "The possible etiologies of central sleep apnea include");
                        tword(TreatmentsDocx, 0, 0, 1, 0, "congestive heart failure,");
                        tword(TreatmentsDocx, 0, 0, 1, 0, "hypothyroid disease,");
                        tword(TreatmentsDocx, 0, 0, 1, 0, "renal failure,");
                        tword(TreatmentsDocx, 0, 0, 1, 0, "neurological disease (parkinson's dz, alzheimer's dz),");
                        tword(TreatmentsDocx, 0, 0, 1, 0, "stroke, encephalitis, head injury,");
                        tword(TreatmentsDocx, 0, 0, 1, 0, "medication (opioids),");
                        tword(TreatmentsDocx, 0, 0, 1, 0, "unknown.");
                    }
                }
                else if(d === '6'){
                    let condition = ageAHIcondition(rd.Age, rd.AHI);
                    if(condition === "c1" || condition === "a1"){
                        DiseasesDocx.push({Disease: "Mixed sleep apnea hypopnea (Mild) (G47.33, G47.37)."});
                    }
                    else if(condition === "c2" || condition === "a2"){
                        DiseasesDocx.push({Disease: "Mixed sleep apnea hypopnea (Moderate) (G47.33, G47.37)."});
                    }
                    else if(condition === "c3" || condition === "a3"){
                        DiseasesDocx.push({Disease: "Mixed sleep apnea hypopnea (Severe) (G47.33, G47.37)."});
                    }
                }
                else if(d === '7'){
                    let condition = ageAHIcondition(rd.Age, rd.AHI);
                    if(condition === "c1" || condition === "a1"){
                        DiseasesDocx.push({Disease: "Central sleep hypopnea (Mild) (G47.37)."});
                    }
                    else if(condition === "c2" || condition === "a2"){
                        DiseasesDocx.push({Disease: "Central sleep hypopnea (Moderate) (G47.37)."});
                    }
                    else if(condition === "c3" || condition === "a3"){
                        DiseasesDocx.push({Disease: "Central sleep hypopnea (Severe) (G47.37)."});
                    }
                }
                else if(d === '8'){
                    let condition = ageAHIcondition(rd.Age, rd.AHI);
                    if(condition === "c1" || condition === "a1"){
                        DiseasesDocx.push({Disease: "Central sleep apnea hypopnea (Mild) (G47.37)."});
                    }
                    else if(condition === "c2" || condition === "a2"){
                        DiseasesDocx.push({Disease: "Central sleep apnea hypopnea (Moderate) (G47.37)."});
                    }
                    else if(condition === "c3" || condition === "a3"){
                        DiseasesDocx.push({Disease: "Central sleep apnea hypopnea (Severe) (G47.37)."});
                    }
                }
                else if(d === '9'){
                    let condition = ageAHIcondition(rd.Age, rd.AHI);
                    if(condition === "c1" || condition === "a1"){
                        DiseasesDocx.push({Disease: "Obstructive sleep hypopnea, treated (Mild) (G47.33)."});
                    }
                    else if(condition === "c2" || condition === "a2"){
                        DiseasesDocx.push({Disease: "Obstructive sleep hypopnea, treated (Moderate) (G47.33)."});
                    }
                    else if(condition === "c3" || condition === "a3"){
                        DiseasesDocx.push({Disease: "Obstructive sleep hypopnea, treated (Severe) (G47.33)."});
                    }
                }
                else if(d === '10'){
                    let condition = ageAHIcondition(rd.Age, rd.AHI);
                    if(condition === "c1" || condition === "a1"){
                        DiseasesDocx.push({Disease: "Obstructive sleep apnea hypopnea, treated (Mild) (G47.33)."});
                    }
                    else if(condition === "c2" || condition === "a2"){
                        DiseasesDocx.push({Disease: "Obstructive sleep apnea hypopnea, treated (Moderate) (G47.33)."});
                    }
                    else if(condition === "c3" || condition === "a3"){
                        DiseasesDocx.push({Disease: "Obstructive sleep apnea hypopnea, treated (Severe) (G47.33)."});
                    }
                }
                else if(d === '11'){
                    let condition = ageAHIcondition(rd.Age, rd.AHI);
                    if(condition === "c1" || condition === "a1"){
                        DiseasesDocx.push({Disease: "Mixed sleep apnea hypopnea, treated (Mild) (G47.33, G47.37)."});
                    }
                    else if(condition === "c2" || condition === "a2"){
                        DiseasesDocx.push({Disease: "Mixed sleep apnea hypopnea, treated (Moderate) (G47.33, G47.37)."});
                    }
                    else if(condition === "c3" || condition === "a3"){
                        DiseasesDocx.push({Disease: "Mixed sleep apnea hypopnea, treated (Severe) (G47.33, G47.37)."});
                    }
                }
                else if(d === '12'){
                    DiseasesDocx.push({Disease: "Poor sleep efficiency (G47.8)."});
                }
                else if(d === '13'){
                    DiseasesDocx.push({Disease: "Under treatment of CPAP."});
                }
                else if(d === '14'){
                    DiseasesDocx.push({Disease: "Under treatment of oral appliance."});
                }
                else if(d === '15'){
                    DiseasesDocx.push({Disease: "Treatment of myofunctional therapy."});
                }
                else if(d === '16'){
                    DiseasesDocx.push({Disease: "Treatment of body-weight control."});
                }
                else if(d === '17'){
                    DiseasesDocx.push({Disease: "Suspect periodic limb movement (G47.61)."});
                }
                else if(d === '18'){
                    DiseasesDocx.push({Disease: "Periodic limb movement (G47.61)."});
                }
                else if(d === '19'){
                    DiseasesDocx.push({Disease: "Suspect autonomic dysfunction (F41.9)."});
                }
                else if(d === '20'){
                    DiseasesDocx.push({Disease: "Suspect poor quality of life."});
                }
                else if(d === '21'){
                    DiseasesDocx.push({Disease: "Suspect tinnitus (H93.19)."});
                }
                else if(d === '22'){
                    DiseasesDocx.push({Disease: "Suspect Gastro-Esophageal reflux disease (GERD) (K21.0)."});
                }
                else if(d === '23'){
                    DiseasesDocx.push({Disease: "Suspect cardiac arrhythmia (I49.9)."});
                }
                else if(d === '24'){
                    DiseasesDocx.push({Disease: "Sleep bruxism (G47.63)."});
                }
                else if(d === '25'){
                    DiseasesDocx.push({Disease: "Alpha sleep."});
                }
                else if(d === '26'){
                    DiseasesDocx.push({Disease: "Suspect REM behavior disorder (G47.52)."});
                }
                else if(d === '27'){
                    DiseasesDocx.push({Disease: "Suspect REM behavior disorder, provisionally (G47.52)."});
                }
                else if(d === '28'){
                    DiseasesDocx.push({Disease: "Subclinical REM behavior disorder (G47.52)."});
                }
                else if(d === '29'){
                    DiseasesDocx.push({Disease: "Suspect idiopathic REM behavior disorder (G47.52)."});
                }
                else if(d === '30'){
                    DiseasesDocx.push({Disease: "Suspect nocturia (R35.1)."});
                }
                else if(d === '31'){
                    DiseasesDocx.push({Disease: "Sleep related groaning (G47.8)."});
                }
                else if(d === '32'){
                    DiseasesDocx.push({Disease: "Suspect disorder of arousal from NREM Sleep."});
                }
                else if(d === '33'){
                    DiseasesDocx.push({Disease: "Suspected sleep-related hypoventilation disorder (G47.36)."});
                }
                else if(d === '34'){
                    DiseasesDocx.push({Disease: "Suspect Cheyne-Stokes Breathing."});
                }
                
            }

            doc.setData({

                // EPart區域
                e1: rd.StudyDate, e2: n2w(rd.CaseID), e3: rd.Name, e4: rd.Age, e5: rd.PatientID.split(':')[0], e6: rd.Sex, e7: rd.DOB, 
                e8: rd.Height, e9: rd.Weight, e10: rd.BMI, e11: rd.Neck, e12: n2s(rd.Waist), e13: n2s(rd.Hip), e14: n2s(rd.HADS_A), 
                e15: n2s(rd.HADS_D), e16: n2s(rd.ESS), e17: n2s(rd.PSQI), e18: n2s(rd.SOS), e19: n2s(rd.THI), e20: n2s(rd.GERD_Q), 
                e21: n2s(rd.WHO_Phy), e22: n2s(rd.WHO_Psy), e23: n2s(rd.BP_S_D), e24: n2s(rd.BP_S_S), e25: n2s(rd.BP_W_D), 
                e26: n2s(rd.BP_W_S), e27: n2s(rd.SleepQuality), e28: rd.AHI,e29: rd.AI, e30: rd.HI, e31: rd.OI, e32: rd.CI, 
                e33: rd.MI, e34: rd.AHI_Supine, e35: rd.AHI_NSupine, e36: rd.AHI_REM, e37: rd.AHI_NREM, e38: rd.AHI_Left, 
                e39: rd.AHI_Right, e40: rd.AHI_REM_Supine, e41: rd.AHI_REM_NSupine, e42: rd.AHI_NREM_Supine, e43: rd.AHI_NREM_NSupine, 
                e44: rd.StartTime, e45: rd.EndTime, e46: rd.TotalRecordTime, e47: rd.TotalSleepPeriod, e48: rd.TotalSleepTime, 
                e49: rd.AwakeTime, e50: rd.Stage1, e51: rd.REM, e52: rd.Stage2, e53: rd.SleepLatency, e54: rd.Stage3, e55: rd.Efficiency, 
                e56: rd.ArousalIndex, e57: rd.OA, e58: rd.OAT, e59: rd.CA, e60: rd.CAT, e61: rd.MA, e62: rd.MAT, e63: rd.HA, e64: rd.HAT,
                e65: rd.LA, e66: rd.LH, e67: rd.MeanSpO2, e68: rd.MeanDesat, e69: rd.MinSpO2, e70: rd.ODI, e71: rd.Snore, 
                e72: rd.SnoreIndex, e73: rd.MS, e74: rd.MR, e75: rd.MN, e76: rd.LS, e77: rd.LR, e78: rd.LN, e79: rd.HS, e80: rd.HR, 
                e81: rd.HN, e82: rd.MeanHR, e83: rd.MinHR, e84: rd.LM_R, e85: rd.LM_N, e86: rd.LM_T, e87: rd.PLM_R, e88: rd.PLM_N, 
                e89: rd.PLM_T, e90: rd.PLMI_R, e91: rd.PLMI_N, e92: rd.PLMI_T,
                
                // Graph區域
                g1: rd.Baseline_path,
                g2: rd.Hypnogram_path,
                g3: rd.Event_path,
                g4: rd.BodyPosition_path,
                g5: rd.HeartRate_path,
                g6: rd.SaO2_path,
                g7: rd.Sound_path,
                g8: rd.PLM_path,

                // Diagnosis區域
                d1: n2s(rd.FriedmanStage), d2: n2s(rd.TonsilSize), d3: n2s(rd.FriedmanTonguePosition), d4: n2s(rd.Technician), 
                d5: n2s(rd.TechnicianDate),d6: n2s(rd.Physician), d7: n2s(rd.PhysicianDate), Comment: n2s(rd.Comment),

                // Treatment區域
                Diseases: DiseasesDocx,
                Treatments: TreatmentsDocx,
                ExtraTreatment: n2s(rd.ExtraTreatment),

                // CPart區域
                c1: rd.StudyDate, c2: rd.Name, c3: rd.Age, c4: rd.PatientID.split(':')[0], c5: rd.Sex==='Male'?'男':'女',
                c6: rd.DOB, c7: rd.Height, c8: rd.Weight, c9: rd.BMI, c10: rd.Neck, c11: rd.Waist, c12: rd.Hip, c13: rd.AHI, 
                c14: rd.AI, c15: rd.HI, c16: rd.OI, c17: rd.CI, c18: rd.AHI_REM, c19: rd.AHI_NREM, c20: rd.AHI_SUPINE,
                c21: rd.AHI_Supine, c22: rd.AHI_NSupine, c23: rd.StartTime, c24: rd.EndTime, c25: rd.TotalRecordTime,
                c26: rd.TotalSleepPeriod, c27: rd.TotalSleepTime, c28: rd.AwakeTime, c29: rd.Stage1, c30: rd.Stage2,
                c31: rd.Stage2, c32: rd.SleepLatency, c33: rd.Stage3, c34: rd.Efficiency, c35: rd.ArousalIndex, c36: rd.OA, 
                c37: rd.OAT, c38: rd.CA, c39: rd.CAT, c40: rd.MA, c41: rd.MAT, c42: rd.HA, c43: rd.HAT, c44: rd.LA, c45: rd.LH,
                c46: rd.MeanSpO2, c47: rd.MeanDesat, c48: rd.MinSpO2, c49: rd.SpO2, c50: rd.Snore,c51: rd.SnoreIndex,

            });

            doc.render();
            var buffer = doc.getZip().generate({type: 'nodebuffer'});

            // 同步儲存檔案
            fs.writeFileSync(path.resolve(__dirname, './reports/' + wordName + '.docx'), buffer);
            console.log('WORD檔寫入成功');

            // 以docx格式回傳檔案
            console.log(wordName);
            res.set({"Content-Disposition": "attachment; filename=" + wordName + ".docx;", "Content-type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document;"});
            res.download(path.resolve(__dirname, "./reports/" + wordName + ".docx"));

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