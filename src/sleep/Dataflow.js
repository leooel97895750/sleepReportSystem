import React from 'react';
import '../css/dataflow.css';
import Report from './Report';
import shark from '../image/shark.gif';
import {getAPI, postAPI, postJsonAPI, postMdbAPI, postWordAPI} from './functions/API.js';
import {stageCalculate, eventCalculate, studycfgCalculate} from './functions/Calculate.js';


class Dataflow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoad: 0,

            getReport: 0, //是否傳資料回dataflow
            eventsTime: {'CA':[], 'OA':[], 'MA':[], 'OH':[]},
            eventsCount: {},
            sound: [],
            pulse: [],
            spo2: [],
            position: [],
            sleepStage: [],
            cfg: {
                startDate:"", name:"", age:"", patientID:"", sex:"", dob:"", 
                height:"", weight:"", bmi:"", neck:"", startTime:"", endTime:"", totalRecordTime:""
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
        this.getReportData = this.getReportData.bind(this);
        this.downloadReport = this.downloadReport.bind(this);
        this.loadStageData = this.loadStageData.bind(this);
        this.loadEventData = this.loadEventData.bind(this);
        this.loadDataSegment = this.loadDataSegment.bind(this);
        this.loadStudyCfg = this.loadStudyCfg.bind(this);
        this.loadPosition = this.loadPosition.bind(this);
        this.loadSpO2 = this.loadSpO2.bind(this);
        this.loadPulse = this.loadPulse.bind(this);
        this.loadSound = this.loadSound.bind(this);
    }

    updateFile(e){

        // 測試 database
        let insertTestUrl = "http://140.116.245.43:3000/insertTest";
        getAPI(insertTestUrl, (xhttp) => {
            console.log(xhttp.response);
        });

        // 抓取caseID查詢資料庫，若有資料則load回來，若無則新增一筆並開始計算數值
        let configIndex = -1;
        for(let i=0; i<e.target.files.length; i++) if(e.target.files[i].name === "STUDYCFG.XML") configIndex = i;
        if(configIndex === -1) alert('找不到STUDYCFG.XML');
        else{
            let caseIDReader = new FileReader();
            caseIDReader.onload = (file) => {
                let caseIDparser = new DOMParser();
                let caseIDXML = caseIDparser.parseFromString(file.target.result, "text/xml");
                let caseID = caseIDXML.getElementsByTagName("Reference")[0].textContent;

                let caseIDUrl = "http://140.116.245.43:3000/caseID?caseID=" + caseID;
                getAPI(caseIDUrl, (xhttp) => {
                    let caseIDJson = JSON.parse(xhttp.responseText);
                    console.log(caseIDJson);

                    if(caseIDJson.length !== 0){
                        alert('有資料');
                        
                    }
                    else{
                        alert('無資料 開始load file');
                        
                        /* 連續函式傳接呼叫: loadStageData => loadEventData => loadDataSegment => loadStudyCfg => 
                                            loadPosition => loadSpO2 => loadPulse => loadSound 
                        */
                        this.loadStageData(e);
                    }
                });
                
            }
            caseIDReader.readAsText(e.target.files[configIndex]);
        }

        
    }

    // step 1. 解析睡眠階段: 尋找 "SLPSTAG.DAT"，參數:檔案event、檔案index、完成後下一個函式
    loadStageData(e){
        let slpstagIndex = -1;
        for(let i=0; i<e.target.files.length; i++) if(e.target.files[i].name === "SLPSTAG.DAT") slpstagIndex = i;
        if(slpstagIndex === -1) alert('找不到SLPSTAG.DAT');
        else{
            let stageReader = new FileReader();
            stageReader.onload = (file) => {
                // 取得stage資料: 10=wake、1=n1、2=n2、3=n3、5=rem
                let sleepStage = new Int8Array(file.target.result);

                // calculate function 進行計算
                let stageData = stageCalculate(sleepStage);

                this.setState({
                    isLoad: 1, // report頁面出現
                    sleepStage: sleepStage,
                    epochNum: sleepStage.length,
                    sot: stageData.sot,
                    wake: stageData.wake,
                    n1: stageData.n1,
                    n2: stageData.n2,
                    n3: stageData.n3,
                    rem: stageData.rem,
                });

                this.loadEventData(e);
            }
            stageReader.readAsArrayBuffer(e.target.files[slpstagIndex]);
        }
    }

    // step 2. 解析事件
    loadEventData(e){
        let eventsIndex = -1;
        for(let i=0; i<e.target.files.length; i++) if(e.target.files[i].name === "EVENTS.MDB") eventsIndex = i;
        if(eventsIndex === -1) alert('EVENTS.MDB');
        else{
            let mdbUrl = "http://140.116.245.43:3000/mdb";
            let mdbData = new FormData();
            mdbData.append('file', e.target.files[eventsIndex]);
            postMdbAPI(mdbUrl, mdbData, (xhttp) => {
                let events = JSON.parse(xhttp.response);
    
                // calculate function 進行計算
                let eventsData = eventCalculate(events);
    
                this.setState({
                    eventsTime: eventsData.eventsTime,
                    eventsCount: eventsData.eventsCount,
                });

                this.loadDataSegment(e);
            });
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
                console.log(studycfgData);

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
                this.loadSound(e, channelsList);
            }
            pulseReader.readAsArrayBuffer(e.target.files[pulseIndex]);
        }
    }

    // step 8. 解析Sound
    loadSound(e, channelsList){
        let soundIndex = -1;
        for(let i=0; i<e.target.files.length; i++) if(e.target.files[i].name === channelsList.Sound) soundIndex = i;
        if(soundIndex === -1) alert('找不到' + channelsList.Sound);
        else{
            let soundReader = new FileReader();
            soundReader.onload = (file) => {
                let sound = new Float32Array(file.target.result);
                this.setState({sound: sound});
            }
            soundReader.readAsArrayBuffer(e.target.files[soundIndex]);
        }
    }

    // 觸發Report資料回傳
    getReportData(){
        this.setState({
            getReport: 1,
        })
    }
    // 傳入資料產生WORD並下載
    downloadReport(reportData){
        this.setState({
            getReport: 0,
        })
        console.log(reportData);
        
        // 先存圖片
        let graphUrl = "http://140.116.245.43:3000/graph";
        postJsonAPI(graphUrl, reportData.GraphData, (xhttp) => {
            console.log(xhttp.responseText);

            // 增加圖片時戳並產生word檔
            reportData.timestamp = xhttp.responseText;
            let wordUrl = "http://140.116.245.43:3000/word";
            postWordAPI(wordUrl, reportData);
        });
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
                            onClick = {this.getReportData}
                            style = {{display: 'none'}}
                        />
                    </label>
                </div>

                <div className="waiting" style={{display: this.state.isLoad ? 'none' : 'block'}}>
                    <b id="waitingWord">尚未選取PSG資料夾</b><br/>
                    <img src={shark} alt="尚未選取PSG資料夾" style={{width:"200px", height:"200px"}}/>
                </div>

                <Report 
                    display = {this.state.isLoad ? 'block' : 'none'}
                    downloadReport = {this.downloadReport}
                    getReport = {this.state.getReport}
                    eventsTime = {this.state.eventsTime}
                    eventsCount = {this.state.eventsCount}
                    sound = {this.state.sound}
                    pulse = {this.state.pulse}
                    position = {this.state.position}
                    spo2 = {this.state.spo2}
                    sleepStage = {this.state.sleepStage}
                    cfg = {this.state.cfg}
                    epochNum = {this.state.epochNum}
                    sot = {this.state.sot}
                    wake = {this.state.wake}
                    n1 = {this.state.n1}
                    n2 = {this.state.n2}
                    n3 = {this.state.n3}
                    rem = {this.state.rem}
                />
                <footer style={{position: this.state.isLoad ? 'static' : 'fixed'}}>
                    <span>成大睡眠中心 National Cheng Kung University Hospital</span><br/>
                    <span>成大資訊工程所 神經運算與腦機介面實驗室 National Cheng Kung University Department of Computer Science and Information Engineering NCBCI Lab</span>
                </footer>
            </div>
        );
    }
}

export default Dataflow;