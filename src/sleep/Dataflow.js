import React from 'react';
import '../css/dataflow.css';
import Report from './Report';
import shark from '../image/shark.gif';
import watson from '../image/watson.gif';
import {getAPI, postJsonAPI, postMdbAPI, getWordAPI} from './functions/API.js';
import {stageCalculate, eventCalculate, studycfgCalculate, reportDataCalculate} from './functions/Calculate.js';


class Dataflow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            // 整個系統的報告完整資料
            RID: 0,
            reportData: {
                PatientID: "", StudyDate: "",Name: "", Age: 0, Sex: "", DOB: "", Height: 0, Weight: 0, BMI: 0, Neck: 0, AHI: 0, AI: 0, HI: 0, 
                OI: 0, CI: 0, MI: 0, AHI_Supine: 0,AHI_NSupine: 0, AHI_REM: 0, AHI_NREM: 0, AHI_Left: 0, AHI_Right: 0, AHI_REM_Supine: 0,
                AHI_REM_NSupine: 0, AHI_NREM_Supine: 0, AHI_NREM_NSupine: 0, StartTime: "", EndTime: "",TotalRecordTime: 0, TotalSleepPeriod: 0, 
                TotalSleepTime: 0, AwakeTime: 0, Stage1: 0,REM: 0, Stage2: 0, SleepLatency: 0, Stage3: 0, Efficiency: 0, ArousalIndex: 0, 
                OA: 0, OAT: 0, CA: 0,CAT: 0, MA: 0, MAT: 0, HA: 0, HAT: 0, LA: 0, LH: 0, MeanSpO2: 0, MeanDesat: 0, MinSpO2: 0, ODI: 0, 
                Snore: 0, SnoreIndex: 0, MS: 0, MR: 0, MN: 0, LS: 0, LR: 0, LN: 0, HS: 0, HR: 0, HN: 0, MeanHR: 0, MinHR: 0, LM_R: 0, LM_N: 0, 
                LM_T: 0, PLM_R: 0, PLM_N: 0, PLM_T: 0, PLMI_R: 0, PLMI_N: 0, PLMI_T: 0, Baseline_path: "", Hypnogram_path: "", Event_path: "",
                BodyPosition_path: "", HeartRate_path: "", SaO2_path: "", Sound_path: "", PLM_path: ""
            },

            graphExist: 0,
            waiting: 1,
            loading: 0,
            isLoad: 0,
            gifDisplay: 'inline-block',

            timestamp: "",

            getReport: 0, //是否傳資料回dataflow
            getGraphData: 0,
            events: {},
            eventsTime: {'CA':[], 'OA':[], 'MA':[], 'OH':[]},
            eventsCount: {},
            ahiIndex: {},
            plmCount: {},
            plmTime: [],
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
        if(positionIndex === -1) alert('找不到' + channelsList.Position);
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
        if(spo2Index === -1) alert('找不到' + channelsList.SpO2);
        else{
            let spo2Reader = new FileReader();
            spo2Reader.onload = (file) => {
                let spo2 = new Float32Array(file.target.result);
                this.setState({spo2: spo2});
                this.loadPulse(e, channelsList);
            }
            spo2Reader.readAsArrayBuffer(e.target.files[spo2Index]);
        }
    }

    // step 7. 解析Pulse
    loadPulse(e, channelsList){
        let pulseIndex = -1;
        for(let i=0; i<e.target.files.length; i++) if(e.target.files[i].name === "CHANNEL24.DAT") pulseIndex = i;
        if(pulseIndex === -1) alert('找不到CHANNEL24.DAT');
        else{
            let pulseReader = new FileReader();
            pulseReader.onload = (file) => {
                let pulse = new Float32Array(file.target.result);
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
        if(eventsIndex === -1) alert('EVENTS.MDB');
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
                    plmTime: eventsData.plmTime,
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
            });
        });
    }

    // 產生WORD並下載
    downloadReport(){
        let wordUrl = "http://140.116.245.43:3000/word?rid=" + this.state.RID;
        getWordAPI(wordUrl);
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

                <div className="fileBlock">
                    <label>
                        <span className="fileButton">選擇資料夾</span>
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

                <div className="downloadBlock">
                    <label>
                        <span className="fileButton">下載報告檔</span>
                        <button 
                            onClick = {this.downloadReport}
                            style = {{display: 'none'}}
                        />
                    </label>
                </div>

                <div className="toolBox">
                    <input type="checkbox" id="isGif" name="isGif" value="1" onChange={this.isGif}/>
                    <span>close GIF</span>
                </div>

                <div className="waiting" style={{display: this.state.waiting ? 'block' : 'none'}}>
                    <b id="waitingWord">尚未選取PSG資料夾</b><br/>
                    <img src={shark} alt="尚未選取PSG資料夾" style={{display: this.state.gifDisplay, width:"200px", height:"200px"}}/>
                </div>

                <div className="waiting" style={{display: this.state.loading ? 'block' : 'none'}}>
                    <b id="loadingWord4">檔案讀取中...</b><br/>
                    <b id="loadingWord3">資料庫建立中...</b><br/>
                    <b id="loadingWord2">數值計算中...</b><br/>
                    <b id="loadingWord1">圖型繪製中...</b><br/>
                    <img src={watson} alt="資料處理中" style={{display: this.state.gifDisplay, width:"200px", height:"200px"}}/>
                </div>

                <Report 
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
                />
                <footer style={{position: this.state.isLoad ? 'static' : 'fixed'}}>
                    <span>成大醫院睡眠中心 National Cheng Kung University Hospital</span><br/>
                    <span>成大資訊工程所 神經運算與腦機介面實驗室 National Cheng Kung University Department of Computer Science and Information Engineering NCBCI Lab</span>
                </footer>
            </div>
        );
    }
}

export default Dataflow;