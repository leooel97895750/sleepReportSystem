
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

// 計算event相關的數據: 出現次數、持續時間...
export function eventCalculate(events){

    let eventsTime = {'CA':[], 'OA':[], 'MA':[], 'OH':[]};
    let eventsCount = {'CA':0, 'TCA':0, 'OA':0, 'TOA':0, 'MA':0, 'TMA':0, 'LA':0, 'SPD':0, 'SPDS':0, 'MSPD':100, 'SD':0, 'SPA':0, 'A1':0, 'A2':0, 'A3':0, 'A4':0, 'OH':0, 'TOH':0, 'LH':0, 'RERA':0, 'SNORE':0};
    
    for(let i=0; i<events.length; i++){
        let event = events[i];
        // Central Apnea
        if(event.EVT_TYPE === 1 && event.MAN_SCORED === 1){
            eventsCount.CA = eventsCount.CA + 1;
            eventsCount.TCA = eventsCount.TCA + event.EVT_LENGTH;
            eventsTime.CA.push(event.EVT_TIME);
            if(eventsCount.LA < event.EVT_LENGTH) eventsCount.LA = event.EVT_LENGTH;
        }
        // Obstructive Apnea
        else if(event.EVT_TYPE === 2 && event.MAN_SCORED === 1){
            eventsCount.OA = eventsCount.OA + 1;
            eventsCount.TOA = eventsCount.TOA + event.EVT_LENGTH;
            eventsTime.OA.push(event.EVT_TIME);
            if(eventsCount.LA < event.EVT_LENGTH) eventsCount.LA = event.EVT_LENGTH;
        }
        // Mixed Apnea
        else if(event.EVT_TYPE === 3 && event.MAN_SCORED === 1){
            eventsCount.MA = eventsCount.MA + 1;
            eventsCount.TMA = eventsCount.TMA + event.EVT_LENGTH;
            eventsTime.MA.push(event.EVT_TIME);
            if(eventsCount.LA < event.EVT_LENGTH) eventsCount.LA = event.EVT_LENGTH;
        }
        // SpO2 Desat
        else if(event.EVT_TYPE === 4){
            eventsCount.SPD = eventsCount.SPD + 1;
            eventsCount.SPDS = eventsCount.SPDS + event.PARAM2;
            eventsCount.SD = eventsCount.SD + event.PARAM1;
            if(eventsCount.MSPD > event.PARAM2) eventsCount.MSPD = event.PARAM2;
        }
        // SpO2 Artifact
        else if(event.EVT_TYPE === 6 && event.MAN_SCORED === 1){
            eventsCount.SPA = eventsCount.SPA + 1;
        }
        // Arousal 1 ARO RES
        else if(event.EVT_TYPE === 7 && event.MAN_SCORED === 1){
            eventsCount.A1 = eventsCount.A1 + 1;
        }
        // Arousal 2 ARO Limb
        else if(event.EVT_TYPE === 8 && event.MAN_SCORED === 1){
            eventsCount.A2 = eventsCount.A2 + 1;
        }
        // Arousal 3 ARO SPONT
        else if(event.EVT_TYPE === 9 && event.MAN_SCORED === 1){
            eventsCount.A3 = eventsCount.A3 + 1;
        }
        // Arousal 4 ARO PLM
        else if(event.EVT_TYPE === 10 && event.MAN_SCORED === 1){
            eventsCount.A4 = eventsCount.A4 + 1;
        }
        // Limb movement(Left)(PLM)
        else if(event.EVT_TYPE === 12){}
        // Limb movement(Right)(PLM)
        else if(event.EVT_TYPE === 13){}
        // Obstructive Hypopnea
        else if(event.EVT_TYPE === 29 && event.MAN_SCORED === 1){
            eventsCount.OH = eventsCount.OH + 1;
            eventsCount.TOH = eventsCount.TOH + event.EVT_LENGTH;
            eventsTime.OH.push(event.EVT_TIME);
            if(eventsCount.LH < event.EVT_LENGTH) eventsCount.LH = event.EVT_LENGTH;
        }
        // RERA
        else if(event.EVT_TYPE === 32){
            eventsCount.RERA = eventsCount.RERA + 1;
        }
        // Snore
        else if(event.EVT_TYPE === 33){
            eventsCount.SNORE = eventsCount.SNORE + 1;
        }
    }
    eventsCount.LA = eventsCount.LA.toFixed(0);
    eventsCount.LH = eventsCount.LH.toFixed(0);

    return {eventsCount, eventsTime};
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
export function reportDataCalculate(dataflow, timestamp){

    const dfs = dataflow.state;
    const evn = dfs.eventsCount;
    const yearMonth = timestamp.slice(0, 7);
    
    let reportData = {
        CaseID: dfs.cfg.patientID, 
        StudyDate: dfs.cfg.startDate,
        Name: dfs.cfg.name, 
        Age: dfs.cfg.age, 
        Sex: dfs.cfg.sex, 
        DOB: dfs.cfg.dob, 
        Height: dfs.cfg.height, 
        Weight: dfs.cfg.weight, 
        BMI: dfs.cfg.bmi, 
        Neck: dfs.cfg.neck, 
        AHI: (((evn.CA + evn.MA + evn.OA + evn.OH) / ((dfs.epochNum - dfs.wake) / 2) * 60).toFixed(1)), 
        AI: ((evn.CA + evn.MA + evn.OA) / ((dfs.epochNum - dfs.wake) / 2) * 60).toFixed(1), 
        HI: (evn.OH / ((dfs.epochNum - dfs.wake) / 2) * 60).toFixed(1), 
        OI: (evn.OA / ((dfs.epochNum - dfs.wake) / 2) * 60).toFixed(1), 
        CI: (evn.CA / ((dfs.epochNum - dfs.wake) / 2) * 60).toFixed(1), 
        MI: (evn.MA / ((dfs.epochNum - dfs.wake) / 2) * 60).toFixed(1), 
        AHI_Supine: 0,
        AHI_NSupine: 0, 
        AHI_REM: 0, 
        AHI_NREM: 0, 
        AHI_Left: 0, 
        AHI_Right: 0, 
        AHI_REM_Supine: 0,
        AHI_REM_NSupine: 0, 
        AHI_NREM_Supine: 0, 
        AHI_NREM_NSupine: 0, 
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
        OAT: evn.TOA / 60, 
        CA: evn.CA,
        CAT: evn.TCA / 60, 
        MA: evn.MA, 
        MAT: evn.TMA / 60, 
        HA: evn.OH, 
        HAT: evn.TOH / 60, 
        LA: evn.LA, 
        LH: evn.LH, 
        MeanSpO2: (evn.SPDS / evn.SPD).toFixed(1), 
        MeanDesat: (evn.SD / evn.SPD).toFixed(1), 
        MinSpO2: evn.MSPD, 
        ODI: ((evn.SPD) / ((dfs.epochNum - dfs.wake) / 2) * 60).toFixed(1), 
        Snore: evn.SNORE,
        SnoreIndex: ((evn.SNORE) / ((dfs.epochNum - dfs.wake) / 2) * 60).toFixed(1), 
        MS: 0, 
        MR: 0, 
        MN: 0, 
        LS: 0, 
        LR: 0, 
        LN: 0, 
        HS: 0, 
        HR: 0, 
        HN: 0, 
        MeanHR: 0, 
        MinHR: 0, 
        LM_R: 0,
        LM_N: 0, 
        LM_T: 0, 
        PLM_R: 0, 
        PLM_N: 0, 
        PLM_T: 0, 
        PLMI_R: 0, 
        PLMI_N: 0, 
        PLMI_T: 0, 
        Baseline_path: "./graphs/" + yearMonth + "/Baseline" + timestamp + ".png",
        Hypnogram_path: "./graphs/" + yearMonth + "/Hynogram" + timestamp + ".png",
        Event_path: "./graphs/" + yearMonth + "/Event" + timestamp + ".png",
        BodyPosition_path: "./graphs/" + yearMonth + "/BodyPosition" + timestamp + ".png",
        HeartRate_path: "./graphs/" + yearMonth + "/HeartRate" + timestamp + ".png",
        SaO2_path: "./graphs/" + yearMonth + "/SaO2" + timestamp + ".png",
        Sound_path: "./graphs/" + yearMonth + "/Sound" + timestamp + ".png",
        PLM_path: "./graphs/" + yearMonth + "/PLM" + timestamp + ".png",
    };
    return reportData;
}