import React from 'react';
import '../css/report.css';
//import {getAPI, postAPI} from './API.js';

// 報告內容
class Report extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            reportTitle: "",
        };
        this.handleReportTitle = this.handleReportTitle.bind(this);
    }

    handleReportTitle(e){
        console.log(e.target.value);
        this.setState({
            reportTitle: e.target.value,
        });
    }
    render(){
        return(
            <div className="reportBlock" style={{fontFamily:"Times New Roman, DFKai-sb, sans-serif"}}>
                <input className = "reportTitle" type = "text" defaultValue = "國立成功大學附設醫院" />
                <input className = "reportTitle" type = "text" defaultValue = "多頻睡眠生理檢查報告" />
                <input className = "reportSubtitle" type = "text" defaultValue = "《依據2020年美國睡眠醫學學會判讀標準》" />
                <br/>
                <br/>

                {/*雙層div置中，寬度1000px對齊patient table寬度*/}
                <div style={{width:"100%", fontSize:"18px"}}>
                    <div style={{width:"1000px", margin:"0px auto"}}>
                        <span style={{fontWeight:"bold"}}>Patient Information: </span>
                        <div style={{float:"right"}}>
                            <span style={{fontWeight:"bold"}}>Study Date: </span>
                            <input className="patientInput" type="text"/>
                            <span style={{fontWeight:"bold", marginLeft:"20px"}}>單號: </span>
                            <input className="patientInput" type="text"/>
                        </div>
                    </div>
                </div>
                
                
                <div style={{fontSize:"18px"}}>
                    <table border="1" cellSpacing="0" cellPadding="2" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
                        <tbody>
                            <tr>
                                <td colSpan="4">Name：</td>
                                <td colSpan="4">Age：</td>
                                <td colSpan="4">Patient ID：</td>
                                <td colSpan="4">Sex：</td>
                                <td colSpan="4">DOB：</td>
                            </tr>
                            <tr>
                                <td colSpan="4">Height：</td>
                                <td colSpan="4">Weight：</td>
                                <td colSpan="3">BMI：</td>
                                <td colSpan="3">Neck：</td>
                                <td colSpan="3">Waist：</td>
                                <td colSpan="3">Hip：</td>
                            </tr>
                            <tr>
                                <td colSpan="4">HADS(A/D)：</td>
                                <td colSpan="4">ESS：</td>
                                <td colSpan="3">PSQI：</td>
                                <td colSpan="3">SOS：</td>
                                <td colSpan="3">THI：</td>
                                <td colSpan="3">GERD-Q：</td>
                            </tr>
                            <tr>
                                <td colSpan="5">WHO(Phy/Psy)：</td>
                                <td colSpan="5">BP(S)：</td>
                                <td colSpan="5">BP(W)：</td>
                                <td colSpan="5">Subjective sleep quality：</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/*雙層div置中，寬度1000px對齊patient table寬度*/}
                <div style={{width:"100%", fontSize:"18px"}}>
                    <div style={{width:"1000px", margin:"0px auto"}}>
                        <span style={{fontWeight:"bold"}}>Respiratory Disturbance Index：</span>
                    </div>
                </div>

                <div style={{fontSize:"18px"}}>
                    <table border="1" cellSpacing="0" cellPadding="2" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
                        <tbody>
                            <tr>
                                <td>AHI：</td>
                                <td>AI：</td>
                                <td>HI：</td>
                                <td>OI：</td>
                            </tr>
                            <tr>
                                <td>CI：</td>
                                <td>MI：</td>
                                <td>AHI(Left)：</td>
                                <td>AHI(NSupine)：</td>
                            </tr>
                            <tr>
                                <td>AHI(REM)：</td>
                                <td>AHI(NREM)：</td>
                                <td>AHI(Left)：</td>
                                <td>AHI(Right)：</td>
                            </tr>
                            <tr>
                                <td colSpan="2">AHI(REM-Supine)：</td>
                                <td colSpan="2">AHI(REM-NSupine)：</td>
                            </tr>
                            <tr>
                                <td colSpan="2">AHI(NREM-Supine)：</td>
                                <td colSpan="2">AHI(NREM-NSupine)：</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/*雙層div置中，寬度1000px對齊patient table寬度*/}
                <div style={{width:"100%", fontSize:"18px"}}>
                    <div style={{width:"1000px", margin:"0px auto"}}>
                        <span style={{fontWeight:"bold"}}>Sleep Stage：</span>
                    </div>
                </div>

                <div style={{fontSize:"18px"}}>
                    <table border="1" cellSpacing="0" cellPadding="2" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
                        <tbody>
                            <tr>
                                <td>Total record time：</td>
                                <td>Total sleep period：</td>
                            </tr>
                            <tr>
                                <td>Total sleep time：</td>
                                <td>Awake time：</td>
                            </tr>
                            <tr>
                                <td>Stage 1：</td>
                                <td>REM：</td>
                            </tr>
                            <tr>
                                <td>Stage 2：</td>
                                <td>Sleep Latency：</td>
                            </tr>
                            <tr>
                                <td>Stage 3：</td>
                                <td>Efficiency：</td>
                            </tr>
                            <tr>
                                <td>Arousal Index：</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/*雙層div置中，寬度1000px對齊patient table寬度*/}
                <div style={{width:"100%", fontSize:"18px"}}>
                    <div style={{width:"1000px", margin:"0px auto"}}>
                        <span style={{fontWeight:"bold"}}>Events：</span>
                    </div>
                </div>

                <div style={{fontSize:"18px"}}>
                    <table border="1" cellSpacing="0" cellPadding="2" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
                        <tbody>
                            <tr>
                                <td>Obstructive apnea：</td>
                                <td>Total duration：</td>
                            </tr>
                            <tr>
                                <td>Central apnea：</td>
                                <td>Total duration：</td>
                            </tr>
                            <tr>
                                <td>Mixed apnea：</td>
                                <td>Total duration：</td>
                            </tr>
                            <tr>
                                <td>Hypopnea 2：</td>
                                <td>Total duration：</td>
                            </tr>
                            <tr>
                                <td>Longest apnea 3：</td>
                                <td>Longest hypopnea：</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/*雙層div置中，寬度1000px對齊patient table寬度*/}
                <div style={{width:"100%", fontSize:"18px"}}>
                    <div style={{width:"1000px", margin:"0px auto"}}>
                        <span style={{fontWeight:"bold"}}>Oxygen Saturation：</span>
                    </div>
                </div>

                <div style={{fontSize:"18px"}}>
                    <table border="1" cellSpacing="0" cellPadding="2" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
                        <tbody>
                            <tr>
                                <td>Mean SpO2：</td>
                                <td>Mean desaturation：</td>
                            </tr>
                            <tr>
                                <td>Minimum SpO2：</td>
                                <td>ODI：</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/*雙層div置中，寬度1000px對齊patient table寬度*/}
                <div style={{width:"100%", fontSize:"18px"}}>
                    <div style={{width:"1000px", margin:"0px auto"}}>
                        <span style={{fontWeight:"bold"}}>Snore：</span>
                    </div>
                </div>

                <div style={{fontSize:"18px"}}>
                    <table border="1" cellSpacing="0" cellPadding="2" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
                        <tbody>
                            <tr>
                                <td>Total：</td>
                                <td>Snore Index：</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </div>
        );
    }
}

export default Report;