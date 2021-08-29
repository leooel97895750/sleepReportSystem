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
            finalReportData: {
                EPartData: {},
                GraphData: {},
                DiagnosisData: {},
                CPartData: {},
            },
            getEPartData: 0,
            getDiagnosisData: 0,
            getCPartData: 0,
        };
        this.updateEPartData = this.updateEPartData.bind(this);
        this.updateDiagnosisData = this.updateDiagnosisData.bind(this);
        this.updateCPartData = this.updateCPartData.bind(this);
    }
    // 偵測DataFlow呼叫回傳報告數值
    componentDidUpdate(prevProps){
        
        // 呼叫 Dataflow 產生報告函式，並將完整報告資料傳入
        if(prevProps.getReport === 0 && this.props.getReport === 1){
            // EPart資料
            this.setState({getEPartData: 1}, () => {
                // Diagnosis資料
                this.setState({getDiagnosisData: 1}, () => {
                    // CPart資料
                    this.setState({getCPartData: 1}, () => {
                        this.props.downloadReport(this.state.finalReportData);
                    });
                });
            });
        }
    }

    // getData的子元件回傳函式
    updateEPartData(EPartData){
        let finalReportData = this.state.finalReportData;
        finalReportData.EPartData = EPartData;
        this.setState({
            getEPartData: 0,
            finalReportData: finalReportData,
        });
    }
    updateDiagnosisData(DiagnosisData){
        let finalReportData = this.state.finalReportData;
        finalReportData.DiagnosisData = DiagnosisData;
        this.setState({
            getDiagnosisData: 0,
            finalReportData: finalReportData,
        });
    }
    updateCPartData(CPartData){
        let finalReportData = this.state.finalReportData;
        finalReportData.CPartData = CPartData;
        this.setState({
            getCPartData: 0,
            finalReportData: finalReportData,
        });
    }

    render(){

        return(
            <div style={{width:"100%", display:this.props.display}}>
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
                        reportData = {this.props.reportData}
                    />

                    {/* Graphic summary */}
                    <br/><br/>
                    <Graph 
                        getGraphData = {this.props.getGraphData}
                        graphExist = {this.props.graphExist}
                        insertGraphDataBase = {this.props.insertGraphDataBase}
                        reportData = {this.props.reportData}
                        eventsTime = {this.props.eventsTime}
                        eventsCount = {this.props.eventsCount}
                        startTime = {this.props.reportData.StartTime}
                        endTime = {this.props.reportData.EndTime}
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
                        updateDiagnosisData = {this.updateDiagnosisData}
                        AHI = {this.props.reportData.AHI}
                        age = {this.props.reportData.Age}
                        awakeTime = {this.props.AwakeTime}
                        sleepLatency = {this.props.SleepLatency}
                        totalSleepTime = {this.props.TotalSleepTime}
                        SE = {this.props.Efficiency}
                    />  

                    
                    <br/><br/><br/>
                    <input className = "reportTitle" type = "text" defaultValue = "國立成功大學附設醫院" />
                    <input className = "reportTitle" type = "text" defaultValue = "多頻睡眠生理檢查報告" />
                    <input className = "reportSubtitle" type = "text" defaultValue = "《依據2020年美國睡眠醫學學會判讀標準》" />
                    <br/><br/><br/>

                    {/* 中文版 */}
                    <CPart
                        getCPartData = {this.state.getCPartData}
                        updateCPartData = {this.updateCPartData}
                        reportData = {this.props.reportData}
                    />
                </div>
            </div>
        );
    }
}

export default Report;