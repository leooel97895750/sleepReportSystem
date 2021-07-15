import React from 'react';
import '../css/dataflow.css';
import Report from './Report';
import shark from '../image/shark.gif';
import {getAPI, postAPI, postJsonAPI} from './API.js';


class Dataflow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoad: 0,
            wordOpacity: 1,

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
    }

    updateFile(e){
        let insertTestUrl = "http://140.116.245.43:3000/insertTest";
        getAPI(insertTestUrl, (xhttp) => {
            console.log(xhttp.responseText);
        });
        // 印出所有檔案陣列
        console.log(e.target.files);

        // 解析睡眠階段: 尋找 "SLPSTAG.DAT"
        let slpstagIndex = -1;
        for(let i=0; i<e.target.files.length; i++){
            if(e.target.files[i].name === "SLPSTAG.DAT") slpstagIndex = i;
        }
        // 建立reader開啟 "SLPSTAG.DAT"
        if(slpstagIndex === -1) alert('找不到SLPSTAG.DAT');
        else{
            let stageReader = new FileReader();
            stageReader.onload = (e) => {
                // 取得stage資料: 10=wake、1=n1、2=n2、3=n3、5=rem
                let sleepStage = new Int8Array(e.target.result);
                console.log(sleepStage);
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
                //console.log(wake, n1, n2, n3, rem);
                this.setState({
                    isLoad: 1,
                    sleepStage: sleepStage,
                    epochNum: sleepStage.length,
                    sot: sot,
                    wake: wake,
                    n1: n1,
                    n2: n2,
                    n3: n3,
                    rem: rem,
                });
            }
            stageReader.readAsArrayBuffer(e.target.files[slpstagIndex]);
        }

        // 解析事件
        let eventsIndex = -1;
        for(let i=0; i<e.target.files.length; i++){
            if(e.target.files[i].name === "EVENTS.MDB") eventsIndex = i;
        }
        let url = "http://140.116.245.43:3000/mdb";
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.onprogress = function(e) {
            console.log(e.loaded +'/'+ e.total);
        }
        xhr.onload = () => {
            let events = JSON.parse(xhr.response);
            console.log(events.length);
            console.log(events[0]);
            // 抓出需要的事件
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
            console.log(eventsCount);
            this.setState({
                eventsTime: eventsTime,
                eventsCount: eventsCount,
            });
        }
        xhr.onerror = function() {
            console.log('error');
        }
        let data = new FormData();
        data.append('file', e.target.files[eventsIndex]);
        xhr.send(data);
        

        // 第一層檔案讀取
        let tmpCfg = {
            startDate:"", name:"", age:"", patientID:"", sex:"", dob:"", 
            height:"", weight:"", bmi:"", neck:"", startTime:"", endTime:"", totalRecordTime:""
        };
        // 解析基本資料: 尋找 "DATASEGMENTS.XML"
        let datasegmentIndex = -1;
        let duration = "";
        for(let i=0; i<e.target.files.length; i++){
            if(e.target.files[i].name === "DATASEGMENTS.XML") datasegmentIndex = i;
        }
        // 建立reader開啟 "DATASEGMENTS.XML"
        if(datasegmentIndex === -1) alert('找不到DATASEGMENTS.XML');
        else{
            let datasegmentReader = new FileReader();
            datasegmentReader.onload = (file) => {
                
                let parser = new DOMParser();
                let datasegmentXmlDoc = parser.parseFromString(file.target.result, "text/xml");
                //console.log(datasegmentXmlDoc);
                duration = datasegmentXmlDoc.getElementsByTagName("Duration")[0].textContent;
                tmpCfg.totalRecordTime = String((Number(duration) / 60).toFixed(1));

                // 第二層檔案讀取
                // 解析基本資料: 尋找 "STUDYCFG.XML"
                let configIndex = -1;
                for(let i=0; i<e.target.files.length; i++){
                    if(e.target.files[i].name === "STUDYCFG.XML") configIndex = i;
                }
                // 建立reader開啟 "STUDYCFG.XML"
                if(configIndex === -1) alert('找不到STUDYCFG.XML');
                else{
                    let configReader = new FileReader();
                    configReader.onload = (file) => {
                        let parser = new DOMParser();
                        let studycfgXML = parser.parseFromString(file.target.result, "text/xml");
                        console.log(studycfgXML);
                        

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

                        // Channels對照表
                        let channelsList = {};
                        let channels = studycfgXML.getElementsByTagName("Channels")[0]
                        for(let i=0; i<channels.childElementCount; i++){
                            let channel = channels.getElementsByTagName("Channel")[i];
                            channelsList[channel.getElementsByTagName("Label")[0].textContent] = channel.getElementsByTagName("Filename")[0].textContent;
                        }
                        console.log(channelsList);

                        tmpCfg.startDate = startDate;
                        tmpCfg.name = studycfgXML.getElementsByTagName("Surname")[0].textContent;
                        tmpCfg.age = age;
                        tmpCfg.patientID = studycfgXML.getElementsByTagName("Reference")[0].textContent;
                        tmpCfg.sex = studycfgXML.getElementsByTagName("Sex")[0].textContent;
                        tmpCfg.dob = dob;
                        tmpCfg.height = height;
                        tmpCfg.weight = weight;
                        tmpCfg.bmi = bmi;
                        tmpCfg.neck = studycfgXML.getElementsByTagName("NeckSize")[0].textContent;
                        tmpCfg.startTime = startTime;
                        tmpCfg.endTime = endTime;

                        this.setState({cfg: tmpCfg});

                        // 第三層檔案讀取
                        // 解析Position
                        let positionIndex = -1;
                        for(let i=0; i<e.target.files.length; i++){
                            if(e.target.files[i].name === channelsList.Position) positionIndex = i;
                        }
                        if(positionIndex === -1) alert('找不到' + channelsList.Position);
                        else{
                            let positionReader = new FileReader();
                            positionReader.onload = (file) => {
                                //console.log(file.target.result);
                                let position = new Int16Array(file.target.result);
                                let positionClean = [];
                                positionClean = position;
                                // for(let i=0; i<position.length; i++){
                                //     if(i % 2 == 1) positionClean.push(position[i]);
                                // }
                                console.log(positionClean);
                                
                                this.setState({
                                    position: positionClean,
                                });
                            }
                            positionReader.readAsArrayBuffer(e.target.files[positionIndex]);
                        }
                        // 解析SpO2
                        let spo2Index = -1;
                        for(let i=0; i<e.target.files.length; i++){
                            if(e.target.files[i].name === channelsList.SpO2) spo2Index = i;
                        }
                        if(spo2Index === -1) alert('找不到' + channelsList.SpO2);
                        else{
                            let spo2Reader = new FileReader();
                            spo2Reader.onload = (file) => {
                                let spo2 = new Float32Array(file.target.result);
                                this.setState({
                                    spo2: spo2,
                                });
                            }
                            spo2Reader.readAsArrayBuffer(e.target.files[spo2Index]);
                        }
                        // 解析Pulse
                        let pulseIndex = -1;
                        for(let i=0; i<e.target.files.length; i++){
                            if(e.target.files[i].name === "CHANNEL24.DAT") pulseIndex = i;
                        }
                        if(pulseIndex === -1) alert('找不到' + channelsList.Pulse);
                        else{
                            let pulseReader = new FileReader();
                            pulseReader.onload = (file) => {
                                let pulse = new Float32Array(file.target.result);

                                let total = 0;
                                let min = 120;
                                let index = 0;
                                for(let i=0; i<pulse.length; i++){
                                    if(pulse[i] < min){
                                        min = pulse[i];
                                        index = i;
                                    } 
                                    total += pulse[i];
                                } 
                                console.log("ch24: 平均心率、最低心率、最低心率位置");
                                console.log(total/pulse.length, min, index);
                                console.log(pulse);
                                this.setState({
                                    pulse: pulse,
                                });
                            }
                            pulseReader.readAsArrayBuffer(e.target.files[pulseIndex]);
                        }
                        // 解析Pulse2
                        let pulseIndex2 = -1;
                        for(let i=0; i<e.target.files.length; i++){
                            if(e.target.files[i].name === channelsList.Pulse) pulseIndex2 = i;
                        }
                        if(pulseIndex2 === -1) alert('找不到' + channelsList.Pulse);
                        else{
                            let pulseReader = new FileReader();
                            pulseReader.onload = (file) => {
                                let pulse = new Float32Array(file.target.result);
                                let pulseClean = [];
                                for(let i=0; i<pulse.length; i++){
                                    if(i % 2 === 1) pulseClean.push(pulse[i]);
                                }

                                let total = 0;
                                let min = 120;
                                let index = 0;
                                for(let i=0; i<pulseClean.length; i++){
                                    if(pulseClean[i] < min){
                                        min = pulseClean[i];
                                        index = i;
                                    } 
                                    total += pulseClean[i];
                                } 
                                console.log("DCH5C0F: 平均心率、最低心率、最低心率位置");
                                console.log(total/pulseClean.length, min, index);
                                console.log(pulse);
                                // this.setState({
                                //     pulse: pulseClean,
                                // });
                            }
                            pulseReader.readAsArrayBuffer(e.target.files[pulseIndex2]);
                        }
                        // 解析Sound
                        let soundIndex = -1;
                        for(let i=0; i<e.target.files.length; i++){
                            if(e.target.files[i].name === channelsList.Sound) soundIndex = i;
                        }
                        if(soundIndex === -1) alert('找不到' + channelsList.Sound);
                        else{
                            let soundReader = new FileReader();
                            soundReader.onload = (file) => {
                                //console.log(file.target.result);
                                let sound = new Float32Array(file.target.result);
                                console.log(sound);
                                this.setState({
                                    sound: sound,
                                });
                            }
                            soundReader.readAsArrayBuffer(e.target.files[soundIndex]);
                        }
                    }
                    configReader.readAsText(e.target.files[configIndex]);
                }
            }
            datasegmentReader.readAsText(e.target.files[datasegmentIndex]);
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
        
        //儲存圖片在server上
        let xhr = new XMLHttpRequest();
        xhr.open("post", "http://140.116.245.43:3000/graph");
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
            console.log(xhr.response);
            let timestamp = xhr.response;
            reportData.timestamp = timestamp;

            // 圖片儲存完成後將timestamp傳入產生WORD
            let xhr2 = new XMLHttpRequest();
            xhr2.open('post', "http://140.116.245.43:3000/word");
            xhr2.setRequestHeader('Content-Type', 'application/json');
            xhr2.responseType = 'blob'; //以blob的形式接收資料，一般檔案內容比較大
            xhr2.onload = () => {
                var blob = xhr2.response; //Blob資料
                if (xhr2.status === 200) {
                    if (blob && blob.size > 0) {
                        let element = document.createElement('a');
                        element.setAttribute('href', URL.createObjectURL(blob));
                        element.setAttribute('download', 'test.docx');
                        document.body.appendChild(element);
                        element.click();
                    } 
                } 
            };
            let data2 = JSON.stringify(reportData);
            xhr2.send(data2);

        }
        xhr.onerror = function() {
            console.log('error');
        }
        let data = JSON.stringify(reportData.GraphData);
        xhr.send(data);
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
                    {/* <img src={shark} style={{width:"200px", height:"200px"}}/> */}
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