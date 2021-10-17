
// 計算睡眠階段
export function stageCalculate(sleepStage){

    // 計算以下的epoch數
    let sot = 0;
    let wake = 0;
    let n1 = 0;
    let n2 = 0;
    let n3 = 0;
    let rem = 0;
    for(let i=0; i<sleepStage.length; i++){
        if(sleepStage[i] === 10) wake++;
        else if(sleepStage[i] === 1) n1++;
        else if(sleepStage[i] === 2) n2++;
        else if(sleepStage[i] === 3) n3++;
        else if(sleepStage[i] === 5) rem++;

        if((i+1) === wake) sot++;
    }

    return {sot, wake, n1, n2, n3, rem};
}

function ahiIndexCalculate(event, dfs, ahiIndex){

    let epoch = Math.floor(event.EVT_TIME / 30);
    let positionPoint = Math.floor(event.EVT_TIME * 25);
    let nowStage = dfs.sleepStage[epoch];
    let nowPosition = dfs.position[positionPoint];
    if(nowPosition === 1) ahiIndex.AHI_Supine += 1;
    if(nowPosition !== 1) ahiIndex.AHI_NSupine += 1;
    if(nowStage === 5) ahiIndex.AHI_REM += 1;
    if(nowStage !== 5) ahiIndex.AHI_NREM += 1;
    if(nowPosition === 2) ahiIndex.AHI_Left += 1;
    if(nowPosition === 0) ahiIndex.AHI_Right += 1;
    if(nowPosition === 1 && nowStage === 5) ahiIndex.AHI_REM_Supine += 1;
    if(nowPosition !== 1 && nowStage === 5) ahiIndex.AHI_REM_NSupine += 1;
    if(nowPosition === 1 && nowStage !== 5) ahiIndex.AHI_NREM_Supine += 1;
    if(nowPosition !== 1 && nowStage !== 5) ahiIndex.AHI_NREM_NSupine += 1;

    return ahiIndex;
}
// 計算event相關的數據: 出現次數、持續時間...
export function eventCalculate(dataflow, events){

    const dfs = dataflow.state;

    // 計算不同情況的AHI
    // stage: 30秒1個點    position: 1秒25個點

    let ahiIndex = {'AHI_Supine':0, 'AHI_NSupine':0, 'AHI_REM':0, 'AHI_NREM':0, 'AHI_Left':0, 'AHI_Right':0, 'AHI_REM_Supine':0, 'AHI_REM_NSupine':0, 'AHI_NREM_Supine':0, 'AHI_NREM_NSupine':0};
    
    let eventsTime = {'CA':[], 'OA':[], 'MA':[], 'OH':[]};
    let eventsCount = {'CA':0, 'TCA':0, 'OA':0, 'TOA':0, 'MA':0, 'TMA':0, 'LA':0, 'SPD':0, 'SPDS':0, 'MSPD':100, 'SD':0, 'SPA':0, 'A1':0, 'A2':0, 'A3':0, 'A4':0, 'OH':0, 'TOH':0, 'LH':0, 'RERA':0, 'SNORE':0};
    
    let plmCount = {'lm':0, 'plm':0, 'remLm':0, 'nremLm':0, 'remPlm':0, 'nremPlm':0};
    let plmTime = [];
    let plmSerial = 0;
    let plmLastSecond = 0;
    let tmpPlmTime = [];
    let tmpPlmStage = [];
    let startPlm = 0;

    let snoreTime ={'time':[], 'param3':[]};

    for(let i=0; i<events.length; i++){
        let event = events[i];
        // Central Apnea
        if(event.EVT_TYPE === 1 && event.MAN_SCORED === 1){
            eventsCount.CA += 1;
            eventsCount.TCA = eventsCount.TCA + event.EVT_LENGTH;
            eventsTime.CA.push(event.EVT_TIME);
            if(eventsCount.LA < event.EVT_LENGTH) eventsCount.LA = event.EVT_LENGTH;
            ahiIndex = ahiIndexCalculate(event, dfs, ahiIndex);
        }
        // Obstructive Apnea
        else if(event.EVT_TYPE === 2 && event.MAN_SCORED === 1){
            eventsCount.OA += 1;
            eventsCount.TOA = eventsCount.TOA + event.EVT_LENGTH;
            eventsTime.OA.push(event.EVT_TIME);
            if(eventsCount.LA < event.EVT_LENGTH) eventsCount.LA = event.EVT_LENGTH;
            ahiIndex = ahiIndexCalculate(event, dfs, ahiIndex);
        }
        // Mixed Apnea
        else if(event.EVT_TYPE === 3 && event.MAN_SCORED === 1){
            eventsCount.MA += 1;
            eventsCount.TMA = eventsCount.TMA + event.EVT_LENGTH;
            eventsTime.MA.push(event.EVT_TIME);
            if(eventsCount.LA < event.EVT_LENGTH) eventsCount.LA = event.EVT_LENGTH;
            ahiIndex = ahiIndexCalculate(event, dfs, ahiIndex);
        }
        // SpO2 Desat
        else if(event.EVT_TYPE === 4){
            eventsCount.SPD += 1;
            eventsCount.SPDS = eventsCount.SPDS + event.PARAM2;
            eventsCount.SD = eventsCount.SD + event.PARAM1;
            if(eventsCount.MSPD > event.PARAM2) eventsCount.MSPD = event.PARAM2;
        }
        // SpO2 Artifact
        else if(event.EVT_TYPE === 6 && event.MAN_SCORED === 1){
            eventsCount.SPA += 1;
        }
        // Arousal 1 ARO RES
        else if(event.EVT_TYPE === 7 && event.MAN_SCORED === 1){
            eventsCount.A1 += 1;
        }
        // Arousal 2 ARO Limb
        else if(event.EVT_TYPE === 8 && event.MAN_SCORED === 1){
            eventsCount.A2 += 1;
        }
        // Arousal 3 ARO SPONT
        else if(event.EVT_TYPE === 9 && event.MAN_SCORED === 1){
            eventsCount.A3 += 1;
        }
        // Arousal 4 ARO PLM
        else if(event.EVT_TYPE === 10 && event.MAN_SCORED === 1){
            eventsCount.A4 += 1;
        }
        // Limb movement(Left)(PLM)、Limb movement(Right)(PLM)
        else if(event.EVT_TYPE === 12 || event.EVT_TYPE === 13){
            plmCount.lm += 1;
            if(dfs.sleepStage[Math.floor(event.EVT_TIME / 30)] === 5){
                plmCount.remLm += 1;
            }
            else plmCount.nremLm += 1;

            if((Number(event.EVT_TIME) - plmLastSecond) <= 90){
                plmSerial += 1;
                
                if(plmSerial >= 4){
                    if(startPlm === 0){
                        plmTime.concat(tmpPlmTime);
                        tmpPlmTime = [];
                        plmCount.plm += 4;
                        for(let i=0; i<tmpPlmStage.length; i++){
                            if(tmpPlmStage[i] === 5){
                                plmCount.remPlm += 1;
                            }
                            else{
                                plmCount.nremPlm += 1;
                            }
                        }
                        tmpPlmStage = [];
                        startPlm = 1;
                    }
                    else{
                        plmTime.push(event.EVT_TIME);
                        plmCount.plm += 1;
                        if(dfs.sleepStage[Math.floor(event.EVT_TIME / 30)] === 5){
                            plmCount.remPlm += 1;
                        }
                        else{
                            plmCount.nremPlm += 1;
                        }
                    }
                }
                else{
                    tmpPlmTime.push(event.EVT_TIME);
                    tmpPlmStage.push(dfs.sleepStage[Math.floor(event.EVT_TIME / 30)]);
                }
            }
            else{
                startPlm = 0;
                plmSerial = 0;
                tmpPlmTime = [];
                tmpPlmStage = [];
            }
            plmLastSecond = Number(event.EVT_TIME);

        }
        // Obstructive Hypopnea
        else if(event.EVT_TYPE === 29){
            eventsCount.OH += 1;
            eventsCount.TOH = eventsCount.TOH + event.EVT_LENGTH;
            eventsTime.OH.push(event.EVT_TIME);
            if(eventsCount.LH < event.EVT_LENGTH) eventsCount.LH = event.EVT_LENGTH;
            ahiIndex = ahiIndexCalculate(event, dfs, ahiIndex);
        }
        // RERA
        else if(event.EVT_TYPE === 32){
            eventsCount.RERA += 1;
        }
        // Snore
        else if(event.EVT_TYPE === 33){
            eventsCount.SNORE += 1;
            snoreTime.time.push(event.EVT_TIME);
            snoreTime.param3.push(event.PARAM3);
        }
    }
    eventsCount.LA = eventsCount.LA.toFixed(0);
    eventsCount.LH = eventsCount.LH.toFixed(0);

    return {eventsCount, eventsTime, ahiIndex, plmCount, plmTime, snoreTime};
}

// 計算STUDYCFG
export function studycfgCalculate(studycfgXML, duration){

    // 生日格式
    let rawDob = studycfgXML.getElementsByTagName("DOB")[0].textContent.split("/");
    let dob = rawDob[2] + "/" + String(Number(rawDob[1])) + "/" + String(Number(rawDob[0]));

    // 實驗日期格式
    let rawStartDate = studycfgXML.getElementsByTagName("StartDate")[0].textContent.split("/");
    let startDate = rawStartDate[2] + "/" + String(Number(rawStartDate[1])) + "/" + String(Number(rawStartDate[0]));

    // 年齡推算
    let age = String(Number(rawStartDate[2]) - Number(rawDob[2]));

    // BMI計算
    let height = studycfgXML.getElementsByTagName("Height")[0].textContent;
    let weight = studycfgXML.getElementsByTagName("Weight")[0].textContent;
    let bmi = (weight/((height/100)*(height/100))).toFixed(1);

    // 推算End time
    let startTime = studycfgXML.getElementsByTagName("StartTime")[0].textContent;
    let startTimeSplit = startTime.split(":");
    let totalSec = Number(startTimeSplit[2]) + Number(duration);
    let finalSec = totalSec % 60;
    let totalMin = Number(startTimeSplit[1]) + Math.floor(totalSec / 60);
    let finalMin = totalMin % 60;
    let totalHour = Number(startTimeSplit[0]) + Math.floor(totalMin / 60);
    let finalHour = totalHour % 24;
    let endTime = String(finalHour).padStart(2, '0') + ":" + String(finalMin).padStart(2, '0') + ":" + String(finalSec).padStart(2, '0');

    // 名字
    let name = studycfgXML.getElementsByTagName("Surname")[0].textContent;

    // 病歷號
    let patientID = studycfgXML.getElementsByTagName("Reference")[0].textContent;

    // 性別
    let sex = studycfgXML.getElementsByTagName("Sex")[0].textContent;

    // 頸圍
    let neck = studycfgXML.getElementsByTagName("NeckSize")[0].textContent;


    // Channels對照表
    let channelsList = {};
    let channels = studycfgXML.getElementsByTagName("Channels")[0]
    for(let i=0; i<channels.childElementCount; i++){
        let channel = channels.getElementsByTagName("Channel")[i];
        channelsList[channel.getElementsByTagName("Label")[0].textContent] = channel.getElementsByTagName("Filename")[0].textContent;
    }
    
    return {startDate, name, age, patientID, sex, dob, height, weight, bmi, neck, startTime, endTime, channelsList};
}

// 最終網頁顯示與存入資料庫的固定數值
export function reportDataCalculate(dataflow){

    const dfs = dataflow.state;
    const evn = dfs.eventsCount;
    const yearMonth = dfs.timestamp.slice(0, 7);

    // 計算position時間
    let ahiIndexTime = {'supine':0, 'nsupine':0, 'left':0, 'right':0, 'remSupine':0, 'remNsupine':0, 'nremSupine':0, 'nremNsupine':0};
    for(let i=0; i<dfs.position.length; i++){
        if(dfs.position[i] === 1 && dfs.sleepStage[Math.floor(i/(25*30))] !== 10) ahiIndexTime.supine += 1;
        if(dfs.position[i] !== 1 && dfs.sleepStage[Math.floor(i/(25*30))] !== 10) ahiIndexTime.nsupine += 1;
        if(dfs.position[i] === 2 && dfs.sleepStage[Math.floor(i/(25*30))] !== 10) ahiIndexTime.left += 1;
        if(dfs.position[i] === 0 && dfs.sleepStage[Math.floor(i/(25*30))] !== 10) ahiIndexTime.right += 1;

        if(dfs.position[i] === 1 && dfs.sleepStage[Math.floor(i/(25*30))] === 5 && dfs.sleepStage[Math.floor(i/(25*30))] !== 10) ahiIndexTime.remSupine += 1;
        if(dfs.position[i] !== 1 && dfs.sleepStage[Math.floor(i/(25*30))] === 5 && dfs.sleepStage[Math.floor(i/(25*30))] !== 10) ahiIndexTime.remNsupine += 1;
        if(dfs.position[i] === 1 && dfs.sleepStage[Math.floor(i/(25*30))] !== 5 && dfs.sleepStage[Math.floor(i/(25*30))] !== 10) ahiIndexTime.nremSupine += 1;
        if(dfs.position[i] !== 1 && dfs.sleepStage[Math.floor(i/(25*30))] !== 5 && dfs.sleepStage[Math.floor(i/(25*30))] !== 10) ahiIndexTime.nremNsupine += 1;
    }
    console.log(ahiIndexTime);

    // 計算心率 (暫時用channel24來算 sample rate 1)
    let heartRate = {'MS':0, 'MSC':0, 'MR': 0, 'MRC':0, 'MN':0, 'MNC':0, 'LS':10000, 'LR':10000, 'LN':10000, 'HS':0, 'HR':0, 'HN':0};
    for(let i=0; i<dfs.pulse.length; i++){
        let nowStage = dfs.sleepStage[Math.floor(i / 30)];
        if(nowStage !== 10){
            heartRate.MS += dfs.pulse[i];
            heartRate.MSC += 1;
            if(dfs.pulse[i] < heartRate.LS){
                heartRate.LS = dfs.pulse[i];
            }
            if(dfs.pulse[i] > heartRate.HS){
                heartRate.HS = dfs.pulse[i];
            }
            if(nowStage === 5){
                heartRate.MR += dfs.pulse[i];
                heartRate.MRC += 1;
                if(dfs.pulse[i] < heartRate.LR){
                    heartRate.LR = dfs.pulse[i];
                }
                if(dfs.pulse[i] > heartRate.HR){
                    heartRate.HR = dfs.pulse[i];
                }
            }
            else{
                heartRate.MN += dfs.pulse[i];
                heartRate.MNC += 1;
                if(dfs.pulse[i] < heartRate.LN){
                    heartRate.LN = dfs.pulse[i];
                }
                if(dfs.pulse[i] > heartRate.HN){
                    heartRate.HN = dfs.pulse[i];
                }
            }
        }
    }

    // 睡眠報告資料
    let reportData = {
        PatientID: dfs.cfg.patientID + ":" + dfs.cfg.startDate,
        StudyDate: dfs.cfg.startDate,
        Name: dfs.cfg.name, 
        Age: dfs.cfg.age, 
        Sex: dfs.cfg.sex, 
        DOB: dfs.cfg.dob, 
        Height: dfs.cfg.height, 
        Weight: dfs.cfg.weight, 
        BMI: dfs.cfg.bmi, 
        Neck: dfs.cfg.neck, 
        Waist: null, 
        Hip: null, 
        HADS_A: null, 
        HADS_D: null, 
        ESS: null, 
        PSQI: null, 
        SOS: null, 
        THI: null, 
        GERD_Q: null, 
        WHO_Phy: null, 
        WHO_Psy: null,
        BP_S_D: null, 
        BP_S_S: null, 
        BP_W_D: null, 
        BP_W_S: null, 
        SleepQuality: null,
        AHI: (((evn.CA + evn.MA + evn.OA + evn.OH) / ((dfs.epochNum - dfs.wake) / 2) * 60).toFixed(1)), 
        AI: ((evn.CA + evn.MA + evn.OA) / ((dfs.epochNum - dfs.wake) / 2) * 60).toFixed(1), 
        HI: (evn.OH / ((dfs.epochNum - dfs.wake) / 2) * 60).toFixed(1), 
        OI: (evn.OA / ((dfs.epochNum - dfs.wake) / 2) * 60).toFixed(1), 
        CI: (evn.CA / ((dfs.epochNum - dfs.wake) / 2) * 60).toFixed(1), 
        MI: (evn.MA / ((dfs.epochNum - dfs.wake) / 2) * 60).toFixed(1), 
        AHI_Supine: (dfs.ahiIndex.AHI_Supine / (ahiIndexTime.supine / (25 * 60 * 60))).toFixed(1), //時間除的不對
        AHI_NSupine: (dfs.ahiIndex.AHI_NSupine / (ahiIndexTime.nsupine / (25 * 60 * 60))).toFixed(1),
        AHI_REM: (dfs.ahiIndex.AHI_REM / (dfs.rem / 2) * 60).toFixed(1),
        AHI_NREM: (dfs.ahiIndex.AHI_NREM / ((dfs.n1 + dfs.n2 + dfs.n3) / 2) * 60).toFixed(1),
        AHI_Left: (dfs.ahiIndex.AHI_Left / (ahiIndexTime.left / (25 * 60 * 60))).toFixed(1),
        AHI_Right: (dfs.ahiIndex.AHI_Right / (ahiIndexTime.right / (25 * 60 * 60))).toFixed(1),
        AHI_REM_Supine: (dfs.ahiIndex.AHI_REM_Supine / (ahiIndexTime.remSupine / (25 * 60 * 60))).toFixed(1),
        AHI_REM_NSupine: (dfs.ahiIndex.AHI_REM_NSupine / (ahiIndexTime.remNsupine / (25 * 60 * 60))).toFixed(1),
        AHI_NREM_Supine: (dfs.ahiIndex.AHI_NREM_Supine / (ahiIndexTime.nremSupine / (25 * 60 * 60))).toFixed(1),
        AHI_NREM_NSupine: (dfs.ahiIndex.AHI_NREM_NSupine / (ahiIndexTime.nremNsupine / (25 * 60 * 60))).toFixed(1),
        StartTime: dfs.cfg.startTime, 
        EndTime: dfs.cfg.endTime,
        TotalRecordTime: dfs.cfg.totalRecordTime, 
        TotalSleepPeriod: ((dfs.epochNum - dfs.sot) / 2).toFixed(1), 
        TotalSleepTime: ((dfs.epochNum - dfs.wake) / 2).toFixed(1), 
        AwakeTime: ((dfs.wake - dfs.sot) / 2).toFixed(1), 
        Stage1: ((dfs.n1 / (dfs.n1 + dfs.n2 + dfs.n3 + dfs.rem)) * 100).toFixed(1),
        REM: ((dfs.rem / (dfs.n1 + dfs.n2 + dfs.n3 + dfs.rem)) * 100).toFixed(1), 
        Stage2: ((dfs.n2 / (dfs.n1 + dfs.n2 + dfs.n3 + dfs.rem)) * 100).toFixed(1), 
        SleepLatency: (dfs.sot / 2).toFixed(1), 
        Stage3: ((dfs.n3 / (dfs.n1 + dfs.n2 + dfs.n3 + dfs.rem)) * 100).toFixed(1), 
        Efficiency: (((dfs.epochNum - dfs.wake) /dfs.epochNum) * 100).toFixed(1), 
        ArousalIndex: ((evn.A1 + evn.A2 + evn.A3 + evn.A4) / ((dfs.epochNum - dfs.wake) / 2) * 60).toFixed(1), 
        OA: evn.OA, 
        OAT: Math.floor(evn.TOA / 60), 
        CA: evn.CA,
        CAT: Math.floor(evn.TCA / 60), 
        MA: evn.MA, 
        MAT: Math.floor(evn.TMA / 60), 
        HA: evn.OH, 
        HAT: Math.floor(evn.TOH / 60), 
        LA: evn.LA, 
        LH: evn.LH, 
        SpO2Count: evn.SPD,
        MeanSpO2: (evn.SPDS / evn.SPD).toFixed(1), 
        MeanDesat: (evn.SD / evn.SPD).toFixed(1), 
        MinSpO2: evn.MSPD, 
        ODI: ((evn.SPD) / ((dfs.epochNum - dfs.wake) / 2) * 60).toFixed(1), 
        Snore: evn.SNORE,
        SnoreIndex: ((evn.SNORE) / ((dfs.epochNum - dfs.wake) / 2) * 60).toFixed(1), 
        MS: Math.round(heartRate.MS / heartRate.MSC), 
        MR: Math.round(heartRate.MR / heartRate.MRC), 
        MN: Math.round(heartRate.MN / heartRate.MNC), 
        LS: heartRate.LS, 
        LR: heartRate.LR, 
        LN: heartRate.LN,
        HS: heartRate.HS, 
        HR: heartRate.HR, 
        HN: heartRate.HN, 
        MeanHR: Math.round(heartRate.MS / heartRate.MSC), 
        MinHR: heartRate.LS, 
        LM_R: dfs.plmCount.remLm,
        LM_N: dfs.plmCount.nremLm, 
        LM_T: dfs.plmCount.lm, 
        PLM_R: dfs.plmCount.remPlm, 
        PLM_N: dfs.plmCount.nremPlm, 
        PLM_T: dfs.plmCount.plm, 
        PLMI_R: (dfs.plmCount.remPlm / (dfs.rem / 2) * 60).toFixed(1), 
        PLMI_N: (dfs.plmCount.nremPlm / ((dfs.n1 + dfs.n2 + dfs.n3) / 2) * 60).toFixed(1), 
        PLMI_T: (dfs.plmCount.plm / ((dfs.epochNum - dfs.wake) / 2) * 60).toFixed(1), 
        Baseline_path: "./graphs/" + yearMonth + "/Baseline" + dfs.timestamp + ".png",
        Hypnogram_path: "./graphs/" + yearMonth + "/Hypnogram" + dfs.timestamp + ".png",
        Event_path: "./graphs/" + yearMonth + "/Event" + dfs.timestamp + ".png",
        BodyPosition_path: "./graphs/" + yearMonth + "/BodyPosition" + dfs.timestamp + ".png",
        HeartRate_path: "./graphs/" + yearMonth + "/HeartRate" + dfs.timestamp + ".png",
        SaO2_path: "./graphs/" + yearMonth + "/SaO2" + dfs.timestamp + ".png",
        Sound_path: "./graphs/" + yearMonth + "/Sound" + dfs.timestamp + ".png",
        PLM_path: "./graphs/" + yearMonth + "/PLM" + dfs.timestamp + ".png",
        FriedmanStage: null, 
        TonsilSize: null, 
        FriedmanTonguePosition: null, 
        Technician: null, 
        TechnicianDate: null, 
        Physician: null, 
        PhysicianDate: null, 
        Comment: null, 
        DiseaseList: [], 
        Disease: null, 
        Treatment: null,
    };
    return reportData;
}