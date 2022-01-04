import React from 'react';
import ReactDOM from 'react-dom'
import '../css/dataflow.css';
import Report from './Report';
import shark from '../image/shark.gif';
import watson from '../image/watson.gif';
import violet from '../image/violet.gif';
import {getAPI, postJsonAPI, postMdbAPI, getWordAPI} from './functions/API.js';
import {stageCalculate, pulseFilterCalculate, spo2FilterCalculate, eventCalculate, studycfgCalculate, reportDataCalculate} from './functions/Calculate.js';
// import { getAllByDisplayValue } from '@testing-library/dom';


class Dataflow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            // 整個系統的報告完整資料
            RID: 0,
            reportData: {
                RID: 0, CaseID: "", PatientID: "", StudyDate: "", Since: "", Name: "", Age: 0, Sex: "", DOB: "", Height: 0, Weight: 0, BMI: 0,
                Neck: 0, Waist: null, Hip: null, HADS_A: null, HADS_D: null, ESS: null, PSQI: null, SOS: null, THI: null, GERD_Q: null, WHO_Phy: null, WHO_Psy: null,
                BP_S_D: null, BP_S_S: null, BP_W_D: null, BP_W_S: null, SleepQuality: null, AHI: 0, AI: 0, HI: 0, OI: 0, CI: 0, MI: 0, AHI_Supine: 0,
                AHI_NSupine: 0, AHI_REM: 0, AHI_NREM: 0, AHI_Left: 0, AHI_Right: 0, AHI_REM_Supine: 0, AHI_REM_NSupine: 0, AHI_NREM_Supine: 0, 
                AHI_NREM_NSupine: 0, StartTime: "", EndTime: "",TotalRecordTime: 0, TotalSleepPeriod: 0, TotalSleepTime: 0, AwakeTime: 0, 
                Stage1: 0,REM: 0, Stage2: 0, SleepLatency: 0, Stage3: 0, Efficiency: 0, ArousalIndex: 0, OA: 0, OAT: 0, CA: 0,CAT: 0, MA: 0, 
                MAT: 0, HA: 0, HAT: 0, LA: 0, LH: 0, SpO2Count: 0, MeanSpO2: 0, MeanDesat: 0, MinSpO2: 0, ODI: 0, Snore: 0, SnoreIndex: 0, MS: 0, MR: 0, 
                MN: 0, LS: 0, LR: 0, LN: 0, HS: 0, HR: 0, HN: 0, MeanHR: 0, MinHR: 0, LM_R: 0, LM_N: 0, LM_T: 0, PLM_R: 0, PLM_N: 0, PLM_T: 0, 
                PLMI_R: 0, PLMI_N: 0, PLMI_T: 0, Baseline_path: "", Hypnogram_path: "", Event_path: "", BodyPosition_path: "", HeartRate_path: "", 
                SaO2_path: "", Sound_path: "", PLM_path: "", FriedmanStage: null, TonsilSize: null, FriedmanTonguePosition: null, Technician: null, 
                TechnicianDate: null, Physician: null, PhysicianDate: null, Comment: null, DiseaseList: [], Disease: null, Treatment: null
            },

            graphExist: 0,
            waiting: 1,
            loading: 0,
            isLoad: 0,
            gifDisplay: 'inline-block',
            isDownloadBox: 'none',
            isReportList: 'none',

            timestamp: "",

            getReport: 0, //是否傳資料回dataflow
            getGraphData: 0,
            events: {},
            eventsTime: {'CA':[], 'OA':[], 'MA':[], 'OH':[]},
            eventsCount: {},
            ahiIndex: {},
            plmCount: {},
            plmGraph: {'time':[], 'high': []},
            snoreTime: {'time':[], 'param3':[]},
            pulse: [],
            spo2: [],
            position: [],
            sleepStage: [],
            cfg: {
                startDate:"", name:"", age:"", patientID:"", sex:"", dob:"", height:"", 
                weight:"", bmi:"", neck:"", startTime:"", endTime:"", totalRecordTime:""
            },
            epochNum: 0,
            sot: 0,
            wake: 0,
            n1: 0,
            n2: 0,
            n3: 0,
            rem: 0,

        };
        this.updateFile = this.updateFile.bind(this);
        this.downloadReport = this.downloadReport.bind(this);
        this.loadStageData = this.loadStageData.bind(this);
        this.loadEventData = this.loadEventData.bind(this);
        this.loadDataSegment = this.loadDataSegment.bind(this);
        this.loadStudyCfg = this.loadStudyCfg.bind(this);
        this.loadPosition = this.loadPosition.bind(this);
        this.loadSpO2 = this.loadSpO2.bind(this);
        this.loadPulse = this.loadPulse.bind(this);
        this.insertGraphDataBase = this.insertGraphDataBase.bind(this);
        this.insertReportDataBase = this.insertReportDataBase.bind(this);
        this.insertStageDataBase = this.insertStageDataBase.bind(this);
        this.insertEventDataBase = this.insertEventDataBase.bind(this);
        this.insertPositionDataBase = this.insertPositionDataBase.bind(this);
        this.isGif = this.isGif.bind(this);
        this.downloadBox = this.downloadBox.bind(this);
        this.downloadBoxClose = this.downloadBoxClose.bind(this);
        this.reportList = this.reportList.bind(this);
        this.reportListClose = this.reportListClose.bind(this);
    }

    updateFile(e){
        // 抓取patientID查詢資料庫，若有資料則load回來，若無則新增一筆並開始計算數值
        let configIndex = -1;
        for(let i=0; i<e.target.files.length; i++) if(e.target.files[i].name === "STUDYCFG.XML") configIndex = i;
        if(configIndex === -1) alert('找不到STUDYCFG.XML');
        else{
            let patientIDReader = new FileReader();
            patientIDReader.onload = (file) => {
                let patientIDparser = new DOMParser();
                let patientIDXML = patientIDparser.parseFromString(file.target.result, "text/xml");
                let patientID = patientIDXML.getElementsByTagName("Reference")[0].textContent;
                let rawStartDate = patientIDXML.getElementsByTagName("StartDate")[0].textContent.split("/");
                let startDate = rawStartDate[2] + "/" + String(Number(rawStartDate[1])) + "/" + String(Number(rawStartDate[0]));

                let patientIDUrl = "http://140.116.245.43:3000/patientID?patientID=" + patientID + ":" + startDate;
                getAPI(patientIDUrl, (xhttp) => {
                    let patientIDJson = JSON.parse(xhttp.responseText);

                    if(patientIDJson.length !== 0){
                        alert('有資料');
                        let RID = patientIDJson[0].RID;
                        this.setState({RID: RID});
                        let selectReportUrl = "http://140.116.245.43:3000/selectReport?rid=" + RID;
                        getAPI(selectReportUrl, (xhttp) => {
                            let selectReportJson = JSON.parse(xhttp.responseText);
                            this.setState({
                                reportData: selectReportJson[0],
                                graphExist: 1,
                                waiting: 0,
                                isLoad: 1, // report頁面出現
                            });
                        });
                    }
                    else{
                        alert('無資料 開始load file');
                        
                        // 連續函式傳接呼叫: 

                        let timeElapsed = Date.now();
                        let today = new Date(timeElapsed);
                        let timestamp = today.toISOString();
                        this.setState({
                            reportData: {
                                RID: 0, CaseID: "", PatientID: "", StudyDate: "", Since: "", Name: "", Age: 0, Sex: "", DOB: "", Height: 0, Weight: 0, BMI: 0,
                                Neck: 0, Waist: null, Hip: null, HADS_A: null, HADS_D: null, ESS: null, PSQI: null, SOS: null, THI: null, GERD_Q: null, WHO_Phy: null, WHO_Psy: null,
                                BP_S_D: null, BP_S_S: null, BP_W_D: null, BP_W_S: null, SleepQuality: null, AHI: 0, AI: 0, HI: 0, OI: 0, CI: 0, MI: 0, AHI_Supine: 0,
                                AHI_NSupine: 0, AHI_REM: 0, AHI_NREM: 0, AHI_Left: 0, AHI_Right: 0, AHI_REM_Supine: 0, AHI_REM_NSupine: 0, AHI_NREM_Supine: 0, 
                                AHI_NREM_NSupine: 0, StartTime: "", EndTime: "",TotalRecordTime: 0, TotalSleepPeriod: 0, TotalSleepTime: 0, AwakeTime: 0, 
                                Stage1: 0,REM: 0, Stage2: 0, SleepLatency: 0, Stage3: 0, Efficiency: 0, ArousalIndex: 0, OA: 0, OAT: 0, CA: 0,CAT: 0, MA: 0, 
                                MAT: 0, HA: 0, HAT: 0, LA: 0, LH: 0, SpO2Count: 0, MeanSpO2: 0, MeanDesat: 0, MinSpO2: 0, ODI: 0, Snore: 0, SnoreIndex: 0, MS: 0, MR: 0, 
                                MN: 0, LS: 0, LR: 0, LN: 0, HS: 0, HR: 0, HN: 0, MeanHR: 0, MinHR: 0, LM_R: 0, LM_N: 0, LM_T: 0, PLM_R: 0, PLM_N: 0, PLM_T: 0, 
                                PLMI_R: 0, PLMI_N: 0, PLMI_T: 0, Baseline_path: "", Hypnogram_path: "", Event_path: "", BodyPosition_path: "", HeartRate_path: "", 
                                SaO2_path: "", Sound_path: "", PLM_path: "", FriedmanStage: null, TonsilSize: null, FriedmanTonguePosition: null, Technician: null, 
                                TechnicianDate: null, Physician: null, PhysicianDate: null, Comment: null, DiseaseList: [], Disease: null, Treatment: null
                            },
                            graphExist: 0,
                            timestamp: timestamp,
                            isLoad: 0,
                            waiting: 0,
                            loading: 1,
                        });
                        this.loadStageData(e);
                    }
                });
            }
            patientIDReader.readAsText(e.target.files[configIndex]);
        }
    }

    // step 1. 解析睡眠階段: 尋找 "SLPSTAG.DAT"，參數:檔案event、檔案index、完成後下一個函式
    loadStageData(e){
        // 有兩種檔案，可能要看LST來分別
        let slpstagIndex = -1;
        for(let i=0; i<e.target.files.length; i++) if(e.target.files[i].name === "SLPSTAG.DAT") slpstagIndex = i;

        if(slpstagIndex === -1) alert('找不到 SLP2.DAT 或 SLPSTAG.DAT');
        else{
            let stageReader = new FileReader();
            stageReader.onload = (file) => {
                // 取得stage資料: 10=wake、1=n1、2=n2、3=n3、5=rem
                let sleepStage = new Int8Array(file.target.result);

                // calculate function 進行計算
                let stageData = stageCalculate(sleepStage);

                this.setState({
                    sleepStage: sleepStage,
                    epochNum: sleepStage.length,
                    sot: stageData.sot,
                    wake: stageData.wake,
                    n1: stageData.n1,
                    n2: stageData.n2,
                    n3: stageData.n3,
                    rem: stageData.rem,
                });

                this.loadDataSegment(e);
            }
            stageReader.readAsArrayBuffer(e.target.files[slpstagIndex]);
        }
    }

    

    // step 3. 總時間
    loadDataSegment(e){
        let tmpCfg = {
            startDate:"", name:"", age:"", patientID:"", sex:"", dob:"", height:"", 
            weight:"", bmi:"", neck:"", startTime:"", endTime:"", totalRecordTime:""
        };
        let datasegmentIndex = -1;
        for(let i=0; i<e.target.files.length; i++) if(e.target.files[i].name === "DATASEGMENTS.XML") datasegmentIndex = i;
        if(datasegmentIndex === -1) alert('找不到DATASEGMENTS.XML');
        else{
            let datasegmentReader = new FileReader();
            datasegmentReader.onload = (file) => {
                
                // 總時間s
                let parser = new DOMParser();
                let datasegmentXmlDoc = parser.parseFromString(file.target.result, "text/xml");
                let duration = datasegmentXmlDoc.getElementsByTagName("Duration")[0].textContent;
                tmpCfg.totalRecordTime = String((Number(duration) / 60).toFixed(1));

                this.loadStudyCfg(e, duration, tmpCfg);
            }
            datasegmentReader.readAsText(e.target.files[datasegmentIndex]);
        }
    }

    // step 4. 解析基本資料: 尋找 "STUDYCFG.XML"
    loadStudyCfg(e, duration, tmpCfg){
        let configIndex = -1;
        for(let i=0; i<e.target.files.length; i++) if(e.target.files[i].name === "STUDYCFG.XML") configIndex = i;
        if(configIndex === -1) alert('找不到STUDYCFG.XML');
        else{
            let configReader = new FileReader();
            configReader.onload = (file) => {
                let parser = new DOMParser();
                let studycfgXML = parser.parseFromString(file.target.result, "text/xml");
                
                // calculate function 進行計算
                let studycfgData = studycfgCalculate(studycfgXML, duration);

                tmpCfg.startDate = studycfgData.startDate;
                tmpCfg.name = studycfgData.name;
                tmpCfg.age = studycfgData.age;
                tmpCfg.patientID = studycfgData.patientID;
                tmpCfg.sex = studycfgData.sex;
                tmpCfg.dob = studycfgData.dob;
                tmpCfg.height = studycfgData.height;
                tmpCfg.weight = studycfgData.weight;
                tmpCfg.bmi = studycfgData.bmi;
                tmpCfg.neck = studycfgData.neck;
                tmpCfg.startTime = studycfgData.startTime;
                tmpCfg.endTime = studycfgData.endTime;
                this.setState({cfg: tmpCfg});

                let channelsList = studycfgData.channelsList;

                this.loadPosition(e, channelsList);
            }
            configReader.readAsText(e.target.files[configIndex]);
        }
    }

    // step 5. 解析Position
    loadPosition(e, channelsList){
        let positionIndex = -1;
        for(let i=0; i<e.target.files.length; i++) if(e.target.files[i].name === channelsList.Position) positionIndex = i;
        if(positionIndex === -1) alert('找不到position ' + channelsList.Position);
        else{
            let positionReader = new FileReader();
            positionReader.onload = (file) => {
                let position = new Int16Array(file.target.result);
                this.setState({position: position});
                this.loadSpO2(e, channelsList);
            }
            positionReader.readAsArrayBuffer(e.target.files[positionIndex]);
        }
    }

    // step 6. 解析SpO2
    loadSpO2(e, channelsList){
        let spo2Index = -1;
        for(let i=0; i<e.target.files.length; i++) if(e.target.files[i].name === channelsList.SpO2) spo2Index = i;
        if(spo2Index === -1) alert('找不到spo2 ' + channelsList.SpO2);
        else{
            let spo2Reader = new FileReader();
            spo2Reader.onload = (file) => {
                let spo2 = new Float32Array(file.target.result);
                spo2 = spo2FilterCalculate(spo2);
                this.setState({spo2: spo2});
                this.loadPulse(e, channelsList);
            }
            spo2Reader.readAsArrayBuffer(e.target.files[spo2Index]);
        }
    }

    // step 7. 解析Pulse
    loadPulse(e){
        let pulseIndex = -1;
        for(let i=0; i<e.target.files.length; i++) if(e.target.files[i].name === "CHANNEL24.DAT") pulseIndex = i;
        if(pulseIndex === -1) alert('找不到CHANNEL24.DAT');
        else{
            let pulseReader = new FileReader();
            pulseReader.onload = (file) => {
                let pulse = new Float32Array(file.target.result);
                pulse = pulseFilterCalculate(pulse);
                this.setState({pulse: pulse});
                this.loadEventData(e);
            }
            pulseReader.readAsArrayBuffer(e.target.files[pulseIndex]);
        }
    }

    // step 2. 解析事件
    loadEventData(e){
        let eventsIndex = -1;
        for(let i=0; i<e.target.files.length; i++) if(e.target.files[i].name === "EVENTS.MDB") eventsIndex = i;
        if(eventsIndex === -1) alert('no EVENTS.MDB');
        else{
            let mdbUrl = "http://140.116.245.43:3000/mdb?timestamp=" + this.state.timestamp;
            let mdbData = new FormData();
            mdbData.append('file', e.target.files[eventsIndex]);
            postMdbAPI(mdbUrl, mdbData, (xhttp) => {
                let events = JSON.parse(xhttp.response);
    
                // calculate function 進行計算
                let eventsData = eventCalculate(this, events);
    
                this.setState({
                    events: events,
                    eventsTime: eventsData.eventsTime,
                    eventsCount: eventsData.eventsCount,
                    ahiIndex: eventsData.ahiIndex,
                    plmCount: eventsData.plmCount,
                    plmGraph: eventsData.plmGraph,
                    snoreTime: eventsData.snoreTime,
                    getGraphData: 1,
                });
            });
        }
    }

    // step 9. Graph儲存
    insertGraphDataBase(GraphData){
        this.setState({getGraphData: 0});
        let graphUrl = "http://140.116.245.43:3000/graph?timestamp=" + this.state.timestamp;
        postJsonAPI(graphUrl, GraphData, (xhttp) => {
            console.log(xhttp.responseText);
            this.insertReportDataBase();
        });
    }

    // step 10. database insert report
    insertReportDataBase(){
        let reportData = reportDataCalculate(this);
        console.log(reportData);
        let insertReportUrl = "http://140.116.245.43:3000/insertReport";
        postJsonAPI(insertReportUrl, reportData, (xhttp) => {
            console.log(xhttp.responseText);
            this.setState({reportData: reportData}, () => {
                this.insertStageDataBase();
            });
        });
    }

    // step 11. bulk insert stage
    insertStageDataBase(){
        let patientIDUrl = "http://140.116.245.43:3000/patientID?patientID=" + this.state.reportData.PatientID;
        getAPI(patientIDUrl, (xhttp) => {
            let patientIDJson = JSON.parse(xhttp.responseText);
            let RID = patientIDJson[0].RID;

            this.setState({RID: RID}, () => {
                let insertStageUrl = "http://140.116.245.43:3000/insertStage";
                let stageData = {
                    RID: this.state.RID,
                    stage: Array.from(this.state.sleepStage),
                };
                console.log(stageData);
                postJsonAPI(insertStageUrl, stageData, (xhttp) => {
                    console.log(xhttp.responseText);
                    this.insertEventDataBase();
                });
            });
        });
    }

    // step 12. bulk insert event
    insertEventDataBase(){
        let insertEventUrl = "http://140.116.245.43:3000/insertEvent?timestamp=" + this.state.timestamp + "&rid=" + this.state.RID;
        getAPI(insertEventUrl, (xhttp) => {
            console.log(xhttp.responseText);
            this.insertPositionDataBase();
        });
    }

    // step 13. bulk insert position
    insertPositionDataBase(){
        let randomPosition = [];
        let chooseSpace = Math.floor(this.state.position.length / this.state.epochNum);
        for(let i=0; i<this.state.epochNum; i++){
            randomPosition.push(this.state.position[i*chooseSpace]);
        }
        let insertPositionUrl = "http://140.116.245.43:3000/insertPosition";
        let positionData = {
            RID: this.state.RID,
            position: randomPosition,
        };
        postJsonAPI(insertPositionUrl, positionData, (xhttp) => {
            console.log(xhttp.responseText);
            this.setState({
                loading: 0,
                isLoad: 1, // report頁面出現
            }, () => {console.log(this.state.reportData)});
        });
    }

    isNull(date, name){
        return date === null ? '缺' : name + ' ' + date;
    }

    // 開啟舊報告
    reportList(){
        let selectDateURL = "http://140.116.245.43:3000/selectDate";
        getAPI(selectDateURL, (xhttp) => {
            let dateJson = JSON.parse(xhttp.responseText);

            // 將資料庫取回來的Report條列掛載，並加入雙擊事件
            let all = dateJson.map((val, i) => {
                let name = React.createElement('div', {className: 'old', key: i+'name'}, val.Name);
                let patientID = React.createElement('div', {className: 'old', key: i+'patientID'}, val.PatientID.split(':')[0]);
                let studyDate = React.createElement('div', {className: 'old', key: i+'studyDate'}, val.StudyDate);
                let since = React.createElement('div', {className: 'old', key: i+'since'}, val.Since.split('T')[0]);
                let tDate = React.createElement('div', {className: 'old2', key: i+'tDate'}, this.isNull(val.TechnicianDate, val.Technician));
                let pDate = React.createElement('div', {className: 'old2', key: i+'pDate'}, this.isNull(val.PhysicianDate, val.Physician));
                let eachOldBlock = React.createElement('div', {className: 'oldBlock', key: i+'eachOldBlock'}, [name, patientID, studyDate, since, tDate, pDate]);
                let li = React.createElement('li', {key: i+'li', onDoubleClick: () => this.loadReport(val.RID)}, [eachOldBlock]);
                return li;
            });
            ReactDOM.render(all, document.getElementById("oldReportList"));

        });
        this.setState({isReportList: 'block'});
    }
    reportListClose(e){
        if(e.target.className === "reportListBackground" || e.target.className === "downloadButtonNo"){
            this.setState({isReportList: 'none'});
        }
    }

    // 直接從資料庫取出報告
    loadReport(RID){
        console.log(RID);
        this.setState({RID: RID});
        let selectReportUrl = "http://140.116.245.43:3000/selectReport?rid=" + RID;
        getAPI(selectReportUrl, (xhttp) => {
            let selectReportJson = JSON.parse(xhttp.responseText);
            this.setState({
                reportData: selectReportJson[0],
                graphExist: 1,
                waiting: 0,
                isLoad: 1, // report頁面出現
                isReportList: 'none',
            });
        });
    }

    // 輸入報告名稱欄位顯示
    downloadBox(){
        this.setState({isDownloadBox: 'block'});
    }
    downloadBoxClose(e){
        if(e.target.className === "downloadBackground" || e.target.className === "downloadButtonNo"){
            this.setState({isDownloadBox: 'none'});
        }
    }

    // 產生WORD並下載
    downloadReport(){
        let filename = document.getElementById("reportFilename").value;
        if(filename !== ""){
            let wordUrl = "http://140.116.245.43:3000/word?rid=" + this.state.RID + "&filename=" + filename;
            getWordAPI(wordUrl, filename);
            this.setState({isDownloadBox: 'none'});
            console.log(filename);
        }
        else alert('請輸入報告檔案名稱');
    }

    // 關閉GIF
    isGif(e){
        let gifDisplay = "";
        if(e.target.checked === true) gifDisplay = "none"
        else gifDisplay = "inline-block";
        this.setState({gifDisplay: gifDisplay});
    }

    render(){
        return(
            <div style={{display: this.props.display, height: "100%"}}>

                {/* 建立新報告 */}
                <div className="fileBlock">
                    <label>
                        <span className="fileButton">建立新報告</span>
                        <input 
                            onChange = {this.updateFile}
                            type = "file" 
                            multiple 
                            mozdirectory = "" 
                            webkitdirectory = "" 
                            directory = ""
                            name = "psgFile"
                            style = {{display: 'none'}}
                        />
                    </label>
                </div>

                {/* 開啟舊報告 */}
                <div className="fileList">
                    <label>
                        <span className="fileButton">開啟舊報告</span>
                        <button 
                            onClick = {this.reportList}
                            style = {{display: 'none'}}
                        />
                    </label>
                </div>
                <div className="reportListBackground" style={{display: this.state.isReportList}} onClick={this.reportListClose}>
                    <div className="reportListBox">
                        <div style={{textAlign: "left", fontWeight: "bold", marginLeft: "10px", marginRight: "10px"}}>
                            <div className="old">姓名</div>
                            <div className="old">病歷號</div>
                            <div className="old">StudyDate</div>
                            <div className="old">建立日期</div>
                            <div className="old2">技師填寫日期</div>
                            <div className="old2">醫師填寫日期</div>
                        </div>
                        
                        <div style={{border: "1px gray solid", height: "500px", borderRadius: "5px", opacity: "0.8", overflowY: "scroll"}}>
                            <ul id="oldReportList" style={{listStyleType: 'none', padding: "0px"}}>

                            </ul>
                        </div>
                        <div style={{position: "absolute", bottom: "30px", right: "10px"}}>
                            <span>左鍵雙擊載入報告...</span>
                            <span className="downloadButtonNo" onClick={this.reportListClose}>取消</span>
                        </div>
                    </div>
                </div>

                {/* 下載報告檔 */}
                <div className="downloadBlock">
                    <label>
                        <span className="fileButton">下載報告檔</span>
                        <button 
                            onClick = {this.downloadBox}
                            style = {{display: 'none'}}
                        />
                    </label>
                </div>
                <div className="downloadBackground" style={{display: this.state.isDownloadBox}} onClick={this.downloadBoxClose}>
                    <div className="downloadBox">
                        <div style={{border: "1px gray solid", height: "340px", borderRadius: "5px", opacity: "0.8"}}>
                            <h2>輸入Word檔案名稱</h2>
                            <input type="text" id="reportFilename" style={{textAlign: "center"}}/><span>.docx</span><br/><br/>
                            <img src={violet} alt="產生報告檔" style={{display: this.state.gifDisplay, width:"180px", height:"180px", opacity:"0.7"}}/>
                        </div>
                        <div style={{position: "absolute", bottom: "30px", right: "10px"}}>
                            <span className="downloadButtonYes" onClick={this.downloadReport}>確定</span>
                            <span className="downloadButtonNo" onClick={this.downloadBoxClose}>取消</span>
                        </div>
                    </div>
                </div>
                
                {/* GIF顯示選項 */}
                <div className="toolBox">
                    <input type="checkbox" id="isGif" name="isGif" value="1" onChange={this.isGif}/>
                    <span>close GIF</span>
                </div>

                {/* 尚未選取動畫 */}
                <div className="waiting" style={{display: this.state.waiting ? 'block' : 'none'}}>
                    <b id="waitingWord">尚未選取PSG資料夾</b><br/>
                    <img src={shark} alt="尚未選取PSG資料夾" style={{display: this.state.gifDisplay, width:"200px", height:"200px"}}/>
                </div>

                {/* 計算資料動畫 */}
                <div className="waiting" style={{display: this.state.loading ? 'block' : 'none'}}>
                    <b id="loadingWord4">檔案讀取中...</b><br/>
                    <b id="loadingWord3">資料庫建立中...</b><br/>
                    <b id="loadingWord2">數值計算中...</b><br/>
                    <b id="loadingWord1">圖型繪製中...</b><br/>
                    <img src={watson} alt="資料處理中" style={{display: this.state.gifDisplay, width:"200px", height:"200px"}}/>
                </div>

                <Report 
                    RID = {this.state.RID}
                    display = {this.state.isLoad ? 'block' : 'none'}
                    downloadReport = {this.downloadReport}
                    graphExist = {this.state.graphExist}
                    insertGraphDataBase = {this.insertGraphDataBase}
                    getGraphData = {this.state.getGraphData}
                    reportData = {this.state.reportData}
                    eventsTime = {this.state.eventsTime}
                    eventsCount = {this.state.eventsCount}
                    snoreTime = {this.state.snoreTime}
                    startTime = {this.state.reportData.StartTime}
                    endTime = {this.state.reportData.EndTime}
                    epochNum = {this.state.epochNum}
                    sleepStage = {this.state.sleepStage}
                    position = {this.state.position}
                    spo2 = {this.state.spo2}
                    pulse = {this.state.pulse}
                    sound = {this.state.sound}
                    plmGraph = {this.state.plmGraph}
                />

                <footer style={{position: this.state.isLoad ? 'static' : 'fixed'}}>
                    <span>成大醫院睡眠醫學中心 National Cheng Kung University Hospital Sleep Center</span><br/>
                    <span>成大資訊工程所 神經運算與腦機介面實驗室 National Cheng Kung University Department of Computer Science and Information Engineering NCBCI Lab</span>
                </footer>

            </div>
        );
    }
}

export default Dataflow;