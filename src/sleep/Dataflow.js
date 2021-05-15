import React from 'react';
import '../css/dataflow.css';
import Report from './Report';
//import {getAPI, postAPI} from './API.js';

class Dataflow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sleepStage: [],
            name: "",
            patientID: "",
            sex: "",
            dob: "",
            height: "",
            weight: "",
            neck: "",

        };
        this.updateFile = this.updateFile.bind(this);
    }

    updateFile(e){
        // 印出所有檔案陣列
        console.log(e.target.files);

        // 解析睡眠階段: 尋找 "SLPSTAG.DAT"
        let slpstagIndex = -1;
        for(let i=0; i<e.target.files.length; i++){
            if(e.target.files[i].name === "SLPSTAG.DAT"){
                slpstagIndex = i;
            }
        }
        // 建立reader開啟 "SLPSTAG.DAT"
        if(slpstagIndex === -1) alert('找不到SLPSTAG.DAT');
        else{
            let stageReader = new FileReader();
            stageReader.onload = (e) => {
                // 取得stage資料: 10=wake、1=n1、2=n2、3=n3、5=rem
                let sleepStage = new Int8Array(e.target.result);
                console.log(sleepStage);
                this.setState({
                    sleepStage: sleepStage
                });
            }
            stageReader.readAsArrayBuffer(e.target.files[slpstagIndex]);
        }

    
        // 解析基本資料: 尋找 "STUDYCFG.DAT"
        let configIndex = -1;
        for(let i=0; i<e.target.files.length; i++){
            if(e.target.files[i].name === "STUDYCFG.XML"){
                configIndex = i;
            }
        }
        // 建立reader開啟 "STUDYCFG.DAT"
        if(configIndex === -1) alert('找不到STUDYCFG.XML');
        else{
            let configReader = new FileReader();
            configReader.onload = (e) => {
                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(e.target.result, "text/xml");
                console.log(xmlDoc);

                let rawDob = xmlDoc.getElementsByTagName("DOB")[0].textContent.split("/");
                let dob = rawDob[2] + "/" + String(Number(rawDob[1])) + "/" + String(Number(rawDob[0]));

                this.setState({
                    name: xmlDoc.getElementsByTagName("Surname")[0].textContent,
                    patientID: xmlDoc.getElementsByTagName("Reference")[0].textContent,
                    sex: xmlDoc.getElementsByTagName("Sex")[0].textContent,
                    dob: dob,
                    height: xmlDoc.getElementsByTagName("Height")[0].textContent,
                    weight: xmlDoc.getElementsByTagName("Weight")[0].textContent,
                    neck: xmlDoc.getElementsByTagName("NeckSize")[0].textContent,
                });
            }
            configReader.readAsText(e.target.files[configIndex]);
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
                    sleepStage = {this.state.sleepStage}
                    name = {this.state.name}
                    patientID = {this.state.patientID}
                    sex = {this.state.sex}
                    dob = {this.state.dob}
                    height = {this.state.height}
                    weight = {this.state.weight}
                    neck = {this.state.neck}
                />
            </div>
        );
    }
}

export default Dataflow;