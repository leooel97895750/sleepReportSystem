import React from 'react';
import '../css/dataflow.css';
import Report from './Report';
//import {getAPI, postAPI} from './API.js';

class Dataflow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sound: [],
            pulse: [],
            spo2: [],
            position: [],
            sleepStage: [],
            startDate: "",
            name: "",
            age: "",
            patientID: "",
            sex: "",
            dob: "",
            height: "",
            weight: "",
            bmi: "",
            neck: "",
            startTime: "",
            endTime: "",
            totalRecordTime: "",
            epochNum: 0,
            sot: 0,
            wake: 0,
            n1: 0,
            n2: 0,
            n3: 0,
            rem: 0,

        };
        this.updateFile = this.updateFile.bind(this);
    }

    
    updateFile(e){
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
                //console.log(sleepStage);
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

        // 第一層檔案讀取
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
                this.setState({
                    totalRecordTime: String((Number(duration) / 60).toFixed(1)),
                });

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

                        this.setState({
                            startDate: startDate,
                            name: studycfgXML.getElementsByTagName("Surname")[0].textContent,
                            age: age,
                            patientID: studycfgXML.getElementsByTagName("Reference")[0].textContent,
                            sex: studycfgXML.getElementsByTagName("Sex")[0].textContent,
                            dob: dob,
                            height: height,
                            weight: weight,
                            bmi: bmi,
                            neck: studycfgXML.getElementsByTagName("NeckSize")[0].textContent,
                            startTime: startTime,
                            endTime: endTime,
                        });

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
                                //console.log(position.includes(3));
                                
                                this.setState({
                                    position: position,
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
                                //console.log(pulse);
                                this.setState({
                                    pulse: pulse,
                                });
                            }
                            pulseReader.readAsArrayBuffer(e.target.files[pulseIndex]);
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
                                console.log(file.target.result);
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
    render(){
        return(
            <div style={{display: this.props.display}}>
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
                <Report 
                    sound = {this.state.sound}
                    pulse = {this.state.pulse}
                    position = {this.state.position}
                    spo2 = {this.state.spo2}
                    sleepStage = {this.state.sleepStage}
                    startDate = {this.state.startDate}
                    name = {this.state.name}
                    age = {this.state.age}
                    patientID = {this.state.patientID}
                    sex = {this.state.sex}
                    dob = {this.state.dob}
                    height = {this.state.height}
                    weight = {this.state.weight}
                    bmi = {this.state.bmi}
                    neck = {this.state.neck}
                    startTime = {this.state.startTime}
                    endTime = {this.state.endTime}
                    totalRecordTime = {this.state.totalRecordTime}
                    epochNum = {this.state.epochNum}
                    sot = {this.state.sot}
                    wake = {this.state.wake}
                    n1 = {this.state.n1}
                    n2 = {this.state.n2}
                    n3 = {this.state.n3}
                    rem = {this.state.rem}
                />
            </div>
        );
    }
}

export default Dataflow;