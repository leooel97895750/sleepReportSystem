import React from 'react';
import '../css/dataflow.css';
//import {getAPI, postAPI} from './API.js';

class Dataflow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sleepStage: [],
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
            </div>
        );
    }
}

export default Dataflow;