var express = require('express');
var router = express.Router();
var fs = require('fs');
let path = require("path");
var PizZip = require('pizzip');
var Docxtemplater = require('docxtemplater');
var ImageModule = require('docxtemplater-image-module');

router.post('/word', function(req, res, next) {

    let reportJson = req.body;
    let ts = reportJson.timestamp;
    let eData = reportJson.EPartData;
    let gData = reportJson.GraphData;
    let dData = reportJson.DiagnosisData;
    let cData = reportJson.CPartData;

    // 診斷資料處理
    let DiseasesDocx = [];
    let DiseasesList = dData.Disease.split("\n");
    for(let i=0; i<DiseasesList.length; i++){
        DiseasesDocx.push({Disease: DiseasesList[i]});
    }
    
    let TreatmentsDocx = [];
    let TreatmentList = dData.Treatment.split("\n");
    // 手動換行接回
    for(let i=TreatmentList.length-1; i>=0; i--){
        let tLine = TreatmentList[i];
        if(tLine[0] === "^"){
            // 接回前項並移除
            tLine = tLine.replace("^ ", "");
            TreatmentList[i-1] = TreatmentList[i-1] + tLine;
            TreatmentList.splice(i, 1);
        }
    }
    console.log(TreatmentList);
    
    // 排版
    for(let i=0; i<TreatmentList.length; i++){
        let tLine = TreatmentList[i];
        if(tLine[0] === "-"){
            TreatmentsDocx.push({Treatment: tLine, hasTitle: true, hasNumber: false, hasEnglish: false, hasRoman: false});
        }
        else if(tLine[0] === "#"){
            tLine = tLine.replace("# ", "");
            TreatmentsDocx.push({Treatment: tLine, hasTitle: false, hasNumber: true, hasEnglish: false, hasRoman: false});
        }
        else if(tLine[0] === "`"){
            tLine = tLine.replace("` ", "");
            TreatmentsDocx.push({Treatment: tLine, hasTitle: false, hasNumber: true, hasEnglish: false, hasRoman: false});
        }
        else if(tLine[0] === "@"){
            tLine = tLine.replace("@ ", "");
            tLine = tLine.replace(/\([a-z]\)/, "");
            TreatmentsDocx.push({Treatment: tLine, hasTitle: false, hasNumber: false, hasEnglish: true, hasRoman: false});
        }
        else if(tLine[0] === "|"){
            tLine = tLine.replace("| ", "");
            tLine = tLine.replace("(i)   ", "");
            tLine = tLine.replace("(ii)  ", "");
            tLine = tLine.replace("(iii) ", "");
            tLine = tLine.replace("(iv) ", "");
            tLine = tLine.replace("(v)  ", "");
            TreatmentsDocx.push({Treatment: tLine, hasTitle: false, hasNumber: false, hasEnglish: false, hasRoman: true});
        }
    }
    console.log(TreatmentsDocx);

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
    doc.setData({
        e1: eData.StudyDate, e2: eData.CaseNumber, e3: eData.Name, e4: eData.Age, e5: eData.PatientID,
        e6: eData.Sex, e7: eData.DOB, e8: eData.Height, e9: eData.Weight, e10: eData.BMI,
        e11: eData.Neck, e12: eData.Waist, e13: eData.Hip, e14: eData.HADS, e15: eData.ESS, 
        e16: eData.PSQI, e17: eData.SOS, e18: eData.THI, e19: eData.GERD_Q, e20: eData.WHO,
        e21: eData.BP_S, e22: eData.BP_W, e23: eData.SleepQuality, e24: eData.AHI,e25: eData.AI,
        e26: eData.HI, e27: eData.OI, e28: eData.CI, e29: eData.MI, e30: eData.AHI_Supine,
        e31: eData.AHI_NSupine, e32: eData.AHI_REM, e33: eData.AHI_NREM, e34: eData.AHI_Left, e35: eData.AHI_Right,
        e36: eData.AHI_REM_Supine, e37: eData.AHI_REM_NSupine, e38: eData.AHI_NREM_Supine, e39: eData.AHI_NREM_NSupine, e40: eData.StartTime,
        e41: eData.EndTime, e42: eData.TotalRecordTime, e43: eData.TotalSleepPeriod, e44: eData.TotalSleepTime, e45: eData.AwakeTime,
        e46: eData.Stage1, e47: eData.REM, e48: eData.Stage2, e49: eData.SleepLatency, e50: eData.Stage3,
        e51: eData.Efficiency, e52: eData.ArousalIndex, e53: eData.OA, e54: eData.OAT, e55: eData.CA,
        e56: eData.CAT, e57: eData.MA, e58: eData.MAT, e59: eData.HA, e60: eData.HAT,
        e61: eData.LA, e62: eData.LH, e63: eData.MeanSpO2, e64: eData.MeanDesat, e65: eData.MinSpO2,
        e66: eData.ODI, e67: eData.Snore, e68: eData.SnoreIndex, e69: eData.MS, e70: eData.MR,
        e71: eData.MN, e72: eData.LS, e73: eData.LR, e74: eData.LN, e75: eData.HS,
        e76: eData.HR, e77: eData.HN, e78: eData.MeanHR, e79: eData.MinHR, e80: eData.LM_R,
        e81: eData.LM_N, e82: eData.LM_T, e83: eData.PLM_R, e84: eData.PLM_N, e85: eData.PLM_T,
        e86: eData.PLMI_R, e87: eData.PLMI_N, e88: eData.PLMI_T,
        
        g1: "./graphs/Baseline" + ts + ".png",
        g2: "./graphs/Hypnogram" + ts + ".png",
        g3: "./graphs/Event" + ts + ".png",
        g4: "./graphs/BodyPosition" + ts + ".png",
        g5: "./graphs/HeartRate" + ts + ".png",
        g6: "./graphs/SaO2" + ts + ".png",
        g7: "./graphs/Sound" + ts + ".png",
        g8: "./graphs/PLM" + ts + ".png",

        d1: dData.FriedmanStage, d2: dData.TonsilSize, d3: dData.FriedmanTonguePosition, d4: dData.Technician, d5: dData.TechnicianDate,
        d6: dData.Physician, d7: dData.PhysicianDate,
        //Disease: dData.Disease,
        Diseases: DiseasesDocx,
        Treatments: TreatmentsDocx,

        c1: cData.StudyDate, c2: cData.Name, c3: cData.Age, c4: cData.PatientID, c5: cData.Sex,
        c6: cData.DOB, c7: cData.Height, c8: cData.Weight, c9: cData.BMI, c10: cData.Neck,
        c11: cData.Waist, c12: cData.Hip, c13: cData.AHI, c14: cData.AI, c15: cData.HI,
        c16: cData.OI, c17: cData.CI, c18: cData.AHI_REM, c19: cData.AHI_NREM, c20: cData.AHI_SUPINE,
        c21: cData.AHI_Supine, c22: cData.AHI_NSupine, c23: cData.StartTime, c24: cData.EndTime, c25: cData.TotalRecordTime,
        c26: cData.TotalSleepPeriod, c27: cData.TotalSleepTime, c28: cData.AwakeTime, c29: cData.Stage1, c30: cData.Stage2,
        c31: cData.Stage2, c32: cData.SleepLatency, c33: cData.Stage3, c34: cData.Efficiency, c35: cData.ArousalIndex,
        c36: cData.OA, c37: cData.OAT, c38: cData.CA, c39: cData.CAT, c40: cData.MA,
        c41: cData.MAT, c42: cData.HA, c43: cData.HAT, c44: cData.LA, c45: cData.LH,
        c46: cData.MeanSpO2, c47: cData.MeanDesat, c48: cData.MinSpO2, c49: cData.SpO2, c50: cData.Snore,
        c51: cData.SnoreIndex,

    });

    doc.render();
    var buffer = doc.getZip().generate({type: 'nodebuffer'});

    // 同步儲存檔案
    fs.writeFileSync(path.resolve(__dirname, './reports/output.docx'), buffer);
    console.log('WORD檔寫入成功');
    // 刪除上傳的檔案
    fs.unlinkSync(path.resolve(__dirname, "./graphs/Baseline" + ts + ".png"));
    fs.unlinkSync(path.resolve(__dirname, "./graphs/Hypnogram" + ts + ".png"));
    fs.unlinkSync(path.resolve(__dirname, "./graphs/Event" + ts + ".png"));
    fs.unlinkSync(path.resolve(__dirname, "./graphs/BodyPosition" + ts + ".png"));
    fs.unlinkSync(path.resolve(__dirname, "./graphs/HeartRate" + ts + ".png"));
    fs.unlinkSync(path.resolve(__dirname, "./graphs/SaO2" + ts + ".png"));
    fs.unlinkSync(path.resolve(__dirname, "./graphs/Sound" + ts + ".png"));
    fs.unlinkSync(path.resolve(__dirname, "./graphs/PLM" + ts + ".png"));

    // 以docx格式回傳檔案
    res.set({"Content-Disposition": "attachment; filename=test.docx","Content-type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document;"})
    res.download(path.resolve(__dirname, "./reports/output.docx"))

});

module.exports = router;