import React from 'react';
import '../css/report.css';
import Graph from './Graph';
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
    // 偵測DataFlow呼叫回傳報告數值
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.getReport === 0 && this.props.getReport === 1){
            this.props.downloadReport({'name':'leo', 'age':24});
        }
    }
    handleReportTitle(e){
        console.log(e.target.value);
        this.setState({
            reportTitle: e.target.value,
        });
    }
    render(){
        let evn = this.props.eventsCount;
        return(
            <div style={{width:"100%"}}>
                <div className="reportBlock" style={{fontFamily:"Times New Roman, DFKai-sb, sans-serif"}}>

                    {/* 英文版 */}
                    {/* Title */}
                    <br/>
                    <br/>
                    <br/>
                    <input className = "reportTitle" type = "text" defaultValue = "國立成功大學附設醫院" />
                    <input className = "reportTitle" type = "text" defaultValue = "多頻睡眠生理檢查報告" />
                    <input className = "reportSubtitle" type = "text" defaultValue = "《依據2020年美國睡眠醫學學會判讀標準》" />
                    <br/>
                    <br/>
                    <br/>

                    {/* 雙層div置中，寬度1000px對齊patient table寬度 */}

                    {/* Patient Information */}
                    <div style={{width:"100%", fontSize:"20px"}}>
                        <div style={{width:"1000px", margin:"0px auto"}}>
                            <span style={{fontWeight:"bold"}}>Patient Information: </span>
                            <div style={{float:"right"}}>
                                <span style={{fontWeight:"bold"}}>Study Date: </span>
                                <input className="upperInput" defaultValue={this.props.startDate}/>
                                <span style={{fontWeight:"bold", marginLeft:"20px"}}>單號: </span>
                                <input className="upperInput"/>
                            </div>
                        </div>
                    </div>
                    
                    
                    <div style={{fontSize:"18px", fontWeight:"500"}}>
                        <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px", whiteSpace: "nowrap"}}>
                            <tbody>
                                <tr>
                                    <td colSpan="4" width="20%">Name：<span>{this.props.name}</span></td>
                                    <td colSpan="4" width="20%">Age：<span>{this.props.age}</span></td>
                                    <td colSpan="4" width="20%">Patient ID：<span>{this.props.patientID}</span></td>
                                    <td colSpan="4" width="20%">Sex：<span>{this.props.sex}</span></td>
                                    <td colSpan="4" width="20%">DOB：<span>{this.props.dob}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{fontSize:"18px", fontWeight:"500", position:"relative", top:"-2px"}}>
                        <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px", whiteSpace: "nowrap"}}>
                            <tbody>
                                <tr>
                                    <td colSpan="4" width="20%">Height(cm)：<span>{this.props.height}</span></td>
                                    <td colSpan="4" width="20%">Weight(kg)：<span>{this.props.weight}</span></td>
                                    <td colSpan="3" width="15%">BMI：<span>{this.props.bmi}</span></td>
                                    <td colSpan="3" width="15%">Neck(cm)：<span>{this.props.neck}</span></td>
                                    <td colSpan="3" width="15%"><div style={{overflow:"hidden"}}>Waist(cm)：<input className="myInput"/></div></td>
                                    <td colSpan="3" width="15%"><div style={{overflow:"hidden"}}>Hip(cm)：<input className="myInput"/></div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{fontSize:"18px", fontWeight:"500", position:"relative", top:"-4px"}}>
                        <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px", whiteSpace: "nowrap"}}>
                            <tbody>
                                <tr>
                                    <td colSpan="4" width="20%"><div style={{overflow:"hidden"}}>HADS(A/D)：<input className="myInput"/></div></td>
                                    <td colSpan="4" width="20%"><div style={{overflow:"hidden"}}>ESS：<input className="myInput"/></div></td>
                                    <td colSpan="3" width="15%"><div style={{overflow:"hidden"}}>PSQI：<input className="myInput"/></div></td>
                                    <td colSpan="3" width="15%"><div style={{overflow:"hidden"}}>SOS：<input className="myInput"/></div></td>
                                    <td colSpan="3" width="15%"><div style={{overflow:"hidden"}}>THI：<input className="myInput"/></div></td>
                                    <td colSpan="3" width="15%"><div style={{overflow:"hidden"}}>GERD-Q：<input className="myInput"/></div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{fontSize:"18px", fontWeight:"500", position:"relative", top:"-6px"}}>
                        <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px", whiteSpace: "nowrap"}}>
                            <tbody>
                                <tr>
                                    <td colSpan="5" width="25%"><div style={{overflow:"hidden"}}>WHO(Phy/Psy)：<input className="myInput"/></div></td>
                                    <td colSpan="5" width="25%"><div style={{overflow:"hidden"}}>BP(S)(mmHg)：<input className="myInput"/></div></td>
                                    <td colSpan="5" width="25%"><div style={{overflow:"hidden"}}>BP(W)(mmHg)：<input className="myInput"/></div></td>
                                    <td colSpan="5" width="25%"><div style={{overflow:"hidden"}}>Subjective sleep quality：<input className="myInput"/></div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Respiratory Disturbance Index */}
                    <br/>
                    <div style={{width:"100%", fontSize:"20px"}}>
                        <div style={{width:"1000px", margin:"0px auto"}}>
                            <span style={{fontWeight:"bold"}}>Respiratory Disturbance Index：</span>
                        </div>
                    </div>

                    <div style={{fontSize:"18px", fontWeight:"500"}}>
                        <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px", whiteSpace: "nowrap"}}>
                            <tbody>
                                <tr>
                                    <td width="25%">AHI：<span>{((evn.CA + evn.MA + evn.OA + evn.OH) / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
                                    <td width="25%">AI：<span>{((evn.CA + evn.MA + evn.OA) / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
                                    <td width="25%">HI：<span>{(evn.OH / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
                                    <td width="25%">OI：<span>{(evn.OA / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
                                </tr>
                                <tr>
                                    <td>CI：<span>{(evn.CA / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
                                    <td>MI：<span>{(evn.MA / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
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

                    {/* Sleep Stage */}
                    <br/>
                    <div style={{width:"100%", fontSize:"20px"}}>
                        <div style={{width:"1000px", margin:"0px auto"}}>
                            <span style={{fontWeight:"bold"}}>Sleep Stage：</span>
                            <span>Start time at {this.props.startTime} ; End time at {this.props.endTime}</span>
                        </div>
                    </div>

                    <div style={{fontSize:"18px", fontWeight:"500"}}>
                        <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px", whiteSpace: "nowrap"}}>
                            <tbody>
                                <tr>
                                    <td width="50%">Total record time(min)：<span>{this.props.totalRecordTime}</span></td>
                                    <td width="50%">Total sleep period(min)：<span>{((this.props.epochNum - this.props.sot) / 2).toFixed(1)}</span></td>
                                </tr>
                                <tr>
                                    <td>Total sleep time(min)：<span>{((this.props.epochNum - this.props.wake) / 2).toFixed(1)}</span></td>
                                    <td>Awake time(min)：<span>{((this.props.wake - this.props.sot) / 2).toFixed(1)}</span></td>
                                </tr>
                                <tr>
                                    <td>Stage 1 (%)：<span>{((this.props.n1 / (this.props.n1 + this.props.n2 + this.props.n3 + this.props.rem)) * 100).toFixed(1)}</span></td>
                                    <td>REM (%)：<span>{((this.props.rem / (this.props.n1 + this.props.n2 + this.props.n3 + this.props.rem)) * 100).toFixed(1)}</span></td>
                                </tr>
                                <tr>
                                    <td>Stage 2 (%)：<span>{((this.props.n2 / (this.props.n1 + this.props.n2 + this.props.n3 + this.props.rem)) * 100).toFixed(1)}</span></td>
                                    <td>Sleep Latency：<span>{(this.props.sot / 2).toFixed(1)}</span></td>
                                </tr>
                                <tr>
                                    <td>Stage 3 (%)：<span>{((this.props.n3 / (this.props.n1 + this.props.n2 + this.props.n3 + this.props.rem)) * 100).toFixed(1)}</span></td>
                                    <td>Efficiency (%)：<span>{(((this.props.epochNum - this.props.wake) /this.props.epochNum) * 100).toFixed(1)}</span></td>
                                </tr>
                                <tr>
                                    <td>Arousal Index (/h)：<span>{((evn.A1 + evn.A2 + evn.A3 + evn.A4) / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Events */}
                    <br/>
                    <div style={{width:"100%", fontSize:"20px"}}>
                        <div style={{width:"1000px", margin:"0px auto"}}>
                            <span style={{fontWeight:"bold"}}>Events：</span>
                        </div>
                    </div>

                    <div style={{fontSize:"18px", fontWeight:"500"}}>
                        <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
                            <tbody>
                                <tr>
                                    <td width="50%">Obstructive apnea (counts)：<span>{evn.OA}</span></td>
                                    <td width="50%">Total duration (min)：<span>{(evn.TOA / 60)}</span></td>
                                </tr>
                                <tr>
                                    <td>Central apnea (counts)：<span>{evn.CA}</span></td>
                                    <td>Total duration (min)：<span>{(evn.TCA / 60)}</span></td>
                                </tr>
                                <tr>
                                    <td>Mixed apnea (counts)：<span>{evn.MA}</span></td>
                                    <td>Total duration (min)：<span>{(evn.TMA / 60)}</span></td>
                                </tr>
                                <tr>
                                    <td>Hypopnea (counts)：<span>{evn.OH}</span></td>
                                    <td>Total duration (min)：<span>{(evn.TOH / 60)}</span></td>
                                </tr>
                                <tr>
                                    <td>Longest apnea (sec)：<span>{evn.LA}</span></td>
                                    <td>Longest hypopnea (sec)：<span>{evn.LH}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Oxygen Saturation */}
                    <br/>
                    <div style={{width:"100%", fontSize:"20px"}}>
                        <div style={{width:"1000px", margin:"0px auto"}}>
                            <span style={{fontWeight:"bold"}}>Oxygen Saturation：</span>
                        </div>
                    </div>

                    <div style={{fontSize:"18px", fontWeight:"500"}}>
                        <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
                            <tbody>
                                <tr>
                                    <td width="50%">Mean SpO2 (%)：<span>{(evn.SPDS / evn.SPD).toFixed(1)}</span></td>
                                    <td width="50%">Mean desaturation (%)：<span>{(evn.SD / evn.SPD).toFixed(1)}</span></td>
                                </tr>
                                <tr>
                                    <td>Minimum SpO2 (%)：<span>{evn.MSPD}</span></td>
                                    <td>ODI (/h)：<span>{((evn.SPD) / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Snore */}
                    <br/>
                    <div style={{width:"100%", fontSize:"20px"}}>
                        <div style={{width:"1000px", margin:"0px auto"}}>
                            <span style={{fontWeight:"bold"}}>Snore：</span>
                        </div>
                    </div>

                    <div style={{fontSize:"18px", fontWeight:"500"}}>
                        <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
                            <tbody>
                                <tr>
                                    <td width="50%">Total (counts)：<span>{evn.SNORE}</span></td>
                                    <td width="50%">Snore Index (/h)：<span>{((evn.SNORE) / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Heart Rate Summary */}
                    <br/>
                    <div style={{width:"100%", fontSize:"20px"}}>
                        <div style={{width:"1000px", margin:"0px auto"}}>
                            <span style={{fontWeight:"bold"}}>Heart Rate Summary：</span>
                        </div>
                    </div>

                    <div style={{fontSize:"18px", fontWeight:"500"}}>
                        <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
                            <tbody>
                                <tr>
                                    <td width="40%"></td>
                                    <td width="20%">Sleep</td>
                                    <td width="20%">REM</td>
                                    <td width="20%">NREM</td>
                                </tr>
                                <tr>
                                    <td>Mean heart rate</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Lowest heart rate</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Hightest heart rate</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Cardiac Profile */}
                    <br/>
                    <div style={{width:"100%", fontSize:"20px"}}>
                        <div style={{width:"1000px", margin:"0px auto"}}>
                            <span style={{fontWeight:"bold"}}>Cardiac Profile：heart rate</span>
                        </div>
                    </div>

                    <div style={{fontSize:"18px", fontWeight:"500"}}>
                        <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
                            <tbody>
                                <tr>
                                    <td width="50%">Mean Heart Rate：</td>
                                    <td width="50%">Minimum Heart Rate：</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Limb Movements Summary */}
                    <br/>
                    <div style={{width:"100%", fontSize:"20px"}}>
                        <div style={{width:"1000px", margin:"0px auto"}}>
                            <span style={{fontWeight:"bold"}}>Limb Movements Summary：</span>
                        </div>
                    </div>

                    <div style={{fontSize:"18px", fontWeight:"500"}}>
                        <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
                            <tbody>
                                <tr>
                                    <td width="40%">Total Number of Limb Movements</td>
                                    <td width="20%">REM：</td>
                                    <td width="20%">NREM：</td>
                                    <td width="20%">Total：</td>
                                </tr>
                                <tr>
                                    <td>Number of Periodic Leg Movements(PLM)</td>
                                    <td>REM：</td>
                                    <td>NREM：</td>
                                    <td>Total：</td>
                                </tr>
                                <tr>
                                    <td>PLM Index</td>
                                    <td>REM：</td>
                                    <td>NREM：</td>
                                    <td>Total：</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Graphic summary */}
                    <br/>
                    <br/>
                    <Graph 
                        eventsTime = {this.props.eventsTime}
                        eventsCount = {this.props.eventsCount}
                        startTime = {this.props.startTime}
                        endTime = {this.props.endTime}
                        epochNum = {this.props.epochNum}
                        sleepStage = {this.props.sleepStage}
                        position = {this.props.position}
                        spo2 = {this.props.spo2}
                        pulse = {this.props.pulse}
                        sound = {this.props.sound}
                    />

                    {/* Findings and Comments */}
                    <br/>
                    <br/>
                    <div style={{width:"100%", fontSize:"20px"}}>
                        <div style={{width:"1000px", margin:"0px auto"}}>
                            <span style={{fontWeight:"bold"}}>Findings and Comments：</span>
                        </div>
                    </div>

                    <div style={{fontSize:"18px", fontWeight:"500"}}>
                        <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
                            <tbody>
                                <tr>
                                    <td width="20%">Friedman Stage: </td>
                                    <td width="15%"><input className="myInput"/></td>
                                    <td width="15%">Tonsil size: </td>
                                    <td width="10%"><input className="myInput"/></td>
                                    <td colSpan="2" width="25%">Friedman tongue position: </td>
                                    <td width="15%"><input className="myInput"/></td>
                                </tr>
                                <tr>
                                    <td colSpan="7"><textarea style={{width:"984px", height:"300px"}}/></td>
                                </tr>
                                <tr>
                                    <td colSpan="4"></td>
                                    <td width="10%">Technician: </td>
                                    <td width="15%"><input className="myInput"/></td>
                                    <td width="15%"><input className="myInput"/></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Diagnsis */}
                    <br/>
                    <div style={{width:"100%", fontSize:"20px"}}>
                        <div style={{width:"1000px", margin:"0px auto"}}>
                            <span style={{fontWeight:"bold"}}>Diagnosis：</span>
                        </div>
                    </div>
                    <div style={{fontSize:"18px", fontWeight:"500"}}>
                        <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
                            <tbody>
                                <tr>
                                    <td colSpan="4"><textarea style={{width:"984px", height:"300px"}}/></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* Suggestive Treatment and Planning */}
                    <br/>
                    <div style={{width:"100%", fontSize:"20px"}}>
                        <div style={{width:"1000px", margin:"0px auto"}}>
                            <span style={{fontWeight:"bold"}}>Suggestive Treatment and Planning：</span>
                        </div>
                    </div>
                    <div style={{fontSize:"18px", fontWeight:"500"}}>
                        <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
                            <tbody>
                                <tr>
                                    <td colSpan="4"><textarea style={{width:"984px", height:"300px"}}/></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td width="15%">Physician: </td>
                                    <td width="15%"><input className="myInput"/></td>
                                    <td width="15%"><input className="myInput"/></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 中文版 */}
                    {/* 標題 */}
                    <br/>
                    <br/>
                    <br/>
                    <input className = "reportTitle" type = "text" defaultValue = "國立成功大學附設醫院" />
                    <input className = "reportTitle" type = "text" defaultValue = "多頻睡眠生理檢查報告" />
                    <input className = "reportSubtitle" type = "text" defaultValue = "《依據2020年美國睡眠醫學學會判讀標準》" />
                    <br/>
                    <br/>
                    <br/>

                    {/* 基本資料 */}
                    <div style={{width:"100%", fontSize:"20px"}}>
                        <div style={{width:"1000px", margin:"0px auto"}}>
                            <span style={{fontWeight:"bold"}}>基本資料：</span>
                            <div style={{float:"right"}}>
                                <span style={{fontWeight:"bold", marginLeft:"20px"}}>紀錄時間: </span>
                                <span>{this.props.startDate}</span>
                                
                            </div>
                        </div>
                    </div>
                    
                    
                    <div style={{fontSize:"18px", fontWeight:"500"}}>
                        <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px", whiteSpace: "nowrap"}}>
                            <tbody>
                                <tr>
                                    <td width="20%">姓名：<span>{this.props.name}</span></td>
                                    <td width="20%">年齡：<span>{this.props.age}</span></td>
                                    <td width="20%">病歷號：<span>{this.props.patientID}</span></td>
                                    <td width="20%">性別：<span>{this.props.sex === 'Male'?'男':'女'}</span></td>
                                    <td width="20%">生日：<span>{this.props.dob}</span></td>
                                </tr>
                                <tr>
                                    <td>身高：<span>{this.props.height}</span></td>
                                    <td>體重：<span>{this.props.weight}</span></td>
                                    <td>體質量指數：<span>{this.props.bmi}</span></td>
                                    <td>頸圍：<span>{this.props.neck}</span></td>
                                    <td>腰圍：</td>
                                    
                                </tr>
                                <tr>
                                    <td>臀圍：</td>
                                    <td colSpan="4"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 呼吸障礙指數 */}
                    <br/>
                    <div style={{width:"100%", fontSize:"20px"}}>
                        <div style={{width:"1000px", margin:"0px auto"}}>
                            <span style={{fontWeight:"bold"}}>呼吸障礙指數：</span>
                        </div>
                    </div>

                    <div style={{fontSize:"18px", fontWeight:"500"}}>
                        <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
                            <tbody>
                                <tr>
                                    <td colSpan="2" width="40%">呼吸中止和淺呼吸指數：<span>{((evn.CA + evn.MA + evn.OA + evn.OH) / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
                                    <td colSpan="2" width="30%">呼吸中止指數：<span>{((evn.CA + evn.MA + evn.OA) / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
                                    <td colSpan="2" width="30%">淺呼吸指數：<span>{(evn.OH / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
                                    
                                </tr>
                                <tr>
                                    <td colSpan="2">阻塞型呼吸中止指數：<span>{(evn.OA / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
                                    <td colSpan="2">中樞型呼吸中止指數：<span>{(evn.CA / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
                                    <td colSpan="2">混和型呼吸中止指數：<span>{(evn.MA / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
                                    

                                </tr>
                                <tr>
                                    <td colSpan="3">呼吸中止和淺呼吸指數(快速動眼期/非快速動眼期)：</td>
                                    <td colSpan="3"></td>

                                </tr>
                                <tr>
                                    <td colSpan="3">呼吸中止和淺呼吸指數(平躺/非平躺)：</td>
                                    <td colSpan="3"></td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

                    {/* 睡眠分期 */}
                    <br/>
                    <div style={{width:"100%", fontSize:"20px"}}>
                        <div style={{width:"1000px", margin:"0px auto"}}>
                            <span style={{fontWeight:"bold"}}>睡眠分期：</span>
                            <span>開始記錄時間 {this.props.startTime} ; 結束紀錄時間 {this.props.endTime}</span>
                        </div>
                    </div>

                    <div style={{fontSize:"18px", fontWeight:"500"}}>
                        <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
                            <tbody>
                                <tr>
                                    <td width="20%">全部記錄時間(分鐘)：</td>
                                    <td width="30%"><span>{this.props.totalRecordTime}</span></td>
                                    <td width="20%">睡眠時間(分鐘)：</td>
                                    <td width="30%"><span>{((this.props.epochNum - this.props.sot) / 2).toFixed(1)}</span></td>
                                </tr>
                                <tr>
                                    <td>全部睡眠時間(分鐘)：</td>
                                    <td><span>{((this.props.epochNum - this.props.wake) / 2).toFixed(1)}</span></td>
                                    <td>清醒時間(分鐘)：</td>
                                    <td><span>{((this.props.wake - this.props.sot) / 2).toFixed(1)}</span></td>
                                </tr>
                                <tr>
                                    <td>睡眠第一期(%)：</td>
                                    <td><span>{((this.props.n1 / (this.props.n1 + this.props.n2 + this.props.n3 + this.props.rem)) * 100).toFixed(1)}</span></td>
                                    <td>快速動眼期(%)：</td>
                                    <td><span>{((this.props.rem / (this.props.n1 + this.props.n2 + this.props.n3 + this.props.rem)) * 100).toFixed(1)}</span></td>
                                </tr>
                                <tr>
                                    <td>睡眠第二期(%)：</td>
                                    <td><span>{((this.props.n2 / (this.props.n1 + this.props.n2 + this.props.n3 + this.props.rem)) * 100).toFixed(1)}</span></td>
                                    <td>入睡時間(分鐘)：</td>
                                    <td><span>{(this.props.sot / 2).toFixed(1)}</span></td>
                                </tr>
                                <tr>
                                    <td>睡眠第三期(%)：</td>
                                    <td><span>{((this.props.n3 / (this.props.n1 + this.props.n2 + this.props.n3 + this.props.rem)) * 100).toFixed(1)}</span></td>
                                    <td>睡眠效率(%)：</td>
                                    <td><span>{(((this.props.epochNum - this.props.wake) /this.props.epochNum) * 100).toFixed(1)}</span></td>
                                </tr>
                                <tr>
                                    <td>覺醒指數(/小時)：</td>
                                    <td></td>
                                    <td colSpan="2"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 睡眠事件 */}
                    <br/>
                    <div style={{width:"100%", fontSize:"20px"}}>
                        <div style={{width:"1000px", margin:"0px auto"}}>
                            <span style={{fontWeight:"bold"}}>睡眠事件：</span>
                        </div>
                    </div>

                    <div style={{fontSize:"18px", fontWeight:"500"}}>
                        <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
                            <tbody>
                                <tr>
                                    <td width="20%">阻塞行呼吸中止：</td>
                                    <td width="30%"><span>{evn.OA}</span></td>
                                    <td width="20%">總發生時間：</td>
                                    <td width="30%"></td>
                                </tr>
                                <tr>
                                    <td>中樞型呼吸中止：</td>
                                    <td><span>{evn.CA}</span></td>
                                    <td>總發生時間：</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>混和型呼吸中止：</td>
                                    <td><span>{evn.MA}</span></td>
                                    <td>總發生時間：</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>淺呼吸：</td>
                                    <td><span>{evn.OH}</span></td>
                                    <td>總發生時間：</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>最長的呼吸中止：</td>
                                    <td></td>
                                    <td>最長的淺呼吸：</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 氧氣飽和度 */}
                    <br/>
                    <div style={{width:"100%", fontSize:"20px"}}>
                        <div style={{width:"1000px", margin:"0px auto"}}>
                            <span style={{fontWeight:"bold"}}>氧氣飽和度：</span>
                        </div>
                    </div>

                    <div style={{fontSize:"18px", fontWeight:"500"}}>
                        <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
                            <tbody>
                                <tr>
                                    <td width="20%">平均氧氣飽和度：</td>
                                    <td width="30%"></td>
                                    <td width="20%">血氧平均下降幅度：</td>
                                    <td width="30%"></td>
                                </tr>
                                <tr>
                                    <td>最低氧氣飽和度：</td>
                                    <td></td>
                                    <td>血氧平均下降幅度：</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 打鼾 */}
                    <br/>
                    <div style={{width:"100%", fontSize:"20px"}}>
                        <div style={{width:"1000px", margin:"0px auto"}}>
                            <span style={{fontWeight:"bold"}}>打鼾：</span>
                        </div>
                    </div>

                    <div style={{fontSize:"18px", fontWeight:"500"}}>
                        <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
                            <tbody>
                                <tr>
                                    <td width="20%">總數 (次)：</td>
                                    <td width="30%"><span>{evn.SNORE}</span></td>
                                    <td width="20%">打鼾指數 (/小時)：</td>
                                    <td width="30%"><span>{((evn.SNORE) / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 整夜監測睡眠呼吸障礙指數(事件/小時) */}
                    <br/>
                    <div style={{width:"100%", fontSize:"20px"}}>
                        <div style={{width:"1000px", margin:"0px auto"}}>
                            <span style={{fontWeight:"bold"}}>整夜監測睡眠呼吸障礙指數(事件/小時)：</span>
                        </div>
                    </div>

                    <div style={{fontSize:"18px", fontWeight:"500"}}>
                        <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px", textAlign:"center"}}>
                            <tbody>
                                <tr>
                                    <td width="20%"></td>
                                    <td width="20%">正常</td>
                                    <td width="20%">輕度</td>
                                    <td width="20%">中度</td>
                                    <td width="20%">重度</td>
                                </tr>
                                <tr>
                                    <td>成人</td>
                                    <td>＜5</td>
                                    <td>5-15</td>
                                    <td>15-30</td>
                                    <td>＞30</td>
                                </tr>
                                <tr>
                                    <td>兒童</td>
                                    <td>＜1</td>
                                    <td>1-5</td>
                                    <td>5-10</td>
                                    <td>＞10</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        );
    }
}

export default Report;