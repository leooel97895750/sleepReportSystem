import React from 'react';
import '../css/report.css';
import EPart from './EPart';
import Graph from './Graph';
import Diagnosis from './Diagnosis';
import CPart from './CPart';
//import {getAPI, postAPI} from './API.js';

// 報告內容
class Report extends React.Component{
    constructor(props){
        super(props);
        // 紀錄完整報告資料
        this.state = {
            finalReportData: {},
            getEPartData: 0,
            getGraphData: 0,
            getDiagnosisData: 0,
            getCPartData: 0,
        };
        this.updateEPartData = this.updateEPartData.bind(this);
    }
    // 偵測DataFlow呼叫回傳報告數值
    componentDidUpdate(prevProps){
        
        
        // 呼叫 Dataflow 產生報告函式，並將完整報告資料傳入
        if(prevProps.getReport === 0 && this.props.getReport === 1){
            // EPart資料
            this.setState({getEPartData: 1});
            // Graph資料
            this.setState({getGraphData: 1});
            // Diagnosis資料
            this.setState({getDiagnosisData: 1});
            // CPart資料
            this.setState({getCPartData: 1});

            this.props.downloadReport(this.state.finalReportData);
        }
    }
    updateEPartData(EPartData){
        this.setState({getEPartData: 0});
        console.log(EPartData);
    }

    render(){
        
        return(
            <div style={{width:"100%"}}>
                <div className="reportBlock" style={{fontFamily:"Times New Roman, DFKai-sb, sans-serif"}}>

                    
                    <br/><br/><br/>
                    <input className="reportTitle" type="text" readOnly="readonly" defaultValue="國立成功大學附設醫院" />
                    <input className="reportTitle" type="text" readOnly="readonly" defaultValue="多頻睡眠生理檢查報告" />
                    <input className="reportSubtitle" type="text" readOnly="readonly" defaultValue="《依據2020年美國睡眠醫學學會判讀標準》" />
                    <br/><br/><br/>

                    {/* 雙層div置中，寬度1000px對齊patient table寬度 */}
                    
                    {/* 英文版 */}
                    <EPart
                        getEPartData = {this.state.getEPartData}
                        updateEPartData = {this.updateEPartData}
                        eventsCount = {this.props.eventsCount}
                        cfg = {this.props.cfg}
                        epochNum = {this.props.epochNum}
                        sot = {this.props.sot}
                        wake = {this.props.wake}
                        n1 = {this.props.n1}
                        n2 = {this.props.n2}
                        n3 = {this.props.n3}
                        rem = {this.props.rem}
                    />

                    {/* Graphic summary */}
                    <br/><br/>
                    <Graph 
                        getGraphData = {this.state.getGraphtData}
                        eventsTime = {this.props.eventsTime}
                        eventsCount = {this.props.eventsCount}
                        startTime = {this.props.cfg.startTime}
                        endTime = {this.props.cfg.endTime}
                        epochNum = {this.props.epochNum}
                        sleepStage = {this.props.sleepStage}
                        position = {this.props.position}
                        spo2 = {this.props.spo2}
                        pulse = {this.props.pulse}
                        sound = {this.props.sound}
                    />

                    <br/><br/>
                    <Diagnosis 
                        getDiagnosisData = {this.state.getDiagnosisData}
                        AHI = {((this.props.eventsCount.CA + this.props.eventsCount.MA + this.props.eventsCount.OA + this.props.eventsCount.OH) / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}
                        age = {this.props.cfg.age}
                        epochNum = {this.props.epochNum}
                        sot = {this.props.sot}
                        wake = {this.props.wake}
                        n1 = {this.props.n1}
                        n2 = {this.props.n2}
                        n3 = {this.props.n3}
                        rem = {this.props.rem}
                    />  

                    
                    <br/><br/><br/>
                    <input className = "reportTitle" type = "text" defaultValue = "國立成功大學附設醫院" />
                    <input className = "reportTitle" type = "text" defaultValue = "多頻睡眠生理檢查報告" />
                    <input className = "reportSubtitle" type = "text" defaultValue = "《依據2020年美國睡眠醫學學會判讀標準》" />
                    <br/><br/><br/>

                    {/* 中文版 */}
                    <CPart
                        getCPartData = {this.state.getCPartData}
                        eventsCount = {this.props.eventsCount}
                        cfg = {this.props.cfg}
                        epochNum = {this.props.epochNum}
                        sot = {this.props.sot}
                        wake = {this.props.wake}
                        n1 = {this.props.n1}
                        n2 = {this.props.n2}
                        n3 = {this.props.n3}
                        rem = {this.props.rem}
                    />
                </div>
            </div>
        );
    }
}

export default Report;