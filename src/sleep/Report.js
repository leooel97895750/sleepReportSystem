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
    handleReportTitle(e){
        console.log(e.target.value);
        this.setState({
            reportTitle: e.target.value,
        });
    }
    render(){
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
                                    <td colSpan="4" width="20%"><div style={{overflow:"hidden"}}>Name：<input className="myInput" defaultValue={this.props.name}/></div></td>
                                    <td colSpan="4" width="20%"><div style={{overflow:"hidden"}}>Age：<input className="myInput" defaultValue={this.props.age}/></div></td>
                                    <td colSpan="4" width="20%"><div style={{overflow:"hidden"}}>Patient ID：<input className="myInput" defaultValue={this.props.patientID}/></div></td>
                                    <td colSpan="4" width="20%"><div style={{overflow:"hidden"}}>Sex：<input className="myInput" defaultValue={this.props.sex}/></div></td>
                                    <td colSpan="4" width="20%"><div style={{overflow:"hidden"}}>DOB：<input className="myInput" defaultValue={this.props.dob}/></div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{fontSize:"18px", fontWeight:"500", position:"relative", top:"-2px"}}>
                        <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px", whiteSpace: "nowrap"}}>
                            <tbody>
                                <tr>
                                    <td colSpan="4" width="20%"><div style={{overflow:"hidden"}}>Height(cm)：<input className="myInput" defaultValue={this.props.height}/></div></td>
                                    <td colSpan="4" width="20%"><div style={{overflow:"hidden"}}>Weight(kg)：<input className="myInput" defaultValue={this.props.weight}/></div></td>
                                    <td colSpan="3" width="15%"><div style={{overflow:"hidden"}}>BMI：<input className="myInput" defaultValue={this.props.bmi}/></div></td>
                                    <td colSpan="3" width="15%"><div style={{overflow:"hidden"}}>Neck(cm)：<input className="myInput" defaultValue={this.props.neck}/></div></td>
                                    <td colSpan="3" width="15%">Waist(cm)：</td>
                                    <td colSpan="3" width="15%">Hip(cm)：</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{fontSize:"18px", fontWeight:"500", position:"relative", top:"-4px"}}>
                        <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px", whiteSpace: "nowrap"}}>
                            <tbody>
                                <tr>
                                    <td colSpan="4" width="20%">HADS(A/D)：</td>
                                    <td colSpan="4" width="20%">ESS：</td>
                                    <td colSpan="3" width="15%">PSQI：</td>
                                    <td colSpan="3" width="15%">SOS：</td>
                                    <td colSpan="3" width="15%">THI：</td>
                                    <td colSpan="3" width="15%">GERD-Q：</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{fontSize:"18px", fontWeight:"500", position:"relative", top:"-6px"}}>
                        <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px", whiteSpace: "nowrap"}}>
                            <tbody>
                                <tr>
                                    <td colSpan="5" width="25%">WHO(Phy/Psy)：</td>
                                    <td colSpan="5" width="25%">BP(S)(mmHg)：</td>
                                    <td colSpan="5" width="25%">BP(W)(mmHg)：</td>
                                    <td colSpan="5" width="25%">Subjective sleep quality：</td>
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
                                    <td width="25%">AHI：</td>
                                    <td width="25%">AI：</td>
                                    <td width="25%">HI：</td>
                                    <td width="25%">OI：</td>
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
                                    <td width="50%"><div style={{overflow:"hidden"}}>Total record time(min)：<input className="myInput" defaultValue={this.props.totalRecordTime}/></div></td>
                                    <td width="50%">Total sleep period(min)：<span style={{fontWeight: "normal"}}>{((this.props.epochNum - this.props.sot) / 2).toFixed(1)}</span></td>
                                </tr>
                                <tr>
                                    <td>Total sleep time(min)：<span style={{fontWeight: "normal"}}>{((this.props.epochNum - this.props.wake) / 2).toFixed(1)}</span></td>
                                    <td>Awake time(min)：<span style={{fontWeight: "normal"}}>{((this.props.wake - this.props.sot) / 2).toFixed(1)}</span></td>
                                </tr>
                                <tr>
                                    <td>Stage 1 (%)：<span style={{fontWeight: "normal"}}>{((this.props.n1 / (this.props.n1 + this.props.n2 + this.props.n3 + this.props.rem)) * 100).toFixed(1)}</span></td>
                                    <td>REM (%)：<span style={{fontWeight: "normal"}}>{((this.props.rem / (this.props.n1 + this.props.n2 + this.props.n3 + this.props.rem)) * 100).toFixed(1)}</span></td>
                                </tr>
                                <tr>
                                    <td>Stage 2 (%)：<span style={{fontWeight: "normal"}}>{((this.props.n2 / (this.props.n1 + this.props.n2 + this.props.n3 + this.props.rem)) * 100).toFixed(1)}</span></td>
                                    <td>Sleep Latency：<span style={{fontWeight: "normal"}}>{(this.props.sot / 2).toFixed(1)}</span></td>
                                </tr>
                                <tr>
                                    <td>Stage 3 (%)：<span style={{fontWeight: "normal"}}>{((this.props.n3 / (this.props.n1 + this.props.n2 + this.props.n3 + this.props.rem)) * 100).toFixed(1)}</span></td>
                                    <td>Efficiency (%)：<span style={{fontWeight: "normal"}}>{(((this.props.epochNum - this.props.wake) /this.props.epochNum) * 100).toFixed(1)}</span></td>
                                </tr>
                                <tr>
                                    <td>Arousal Index：</td>
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
                                    <td width="50%">Obstructive apnea：</td>
                                    <td width="50%">Total duration：</td>
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
                                    <td width="50%">Mean SpO2：</td>
                                    <td width="50%">Mean desaturation：</td>
                                </tr>
                                <tr>
                                    <td>Minimum SpO2：</td>
                                    <td>ODI：</td>
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
                                    <td width="50%">Total：</td>
                                    <td width="50%">Snore Index：</td>
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
                                    <td width="15%"></td>
                                    <td width="15%">Tonsil size: </td>
                                    <td width="10%"></td>
                                    <td colSpan="2" width="25%">Friedman tongue position: </td>
                                    <td width="15%"></td>
                                </tr>
                                <tr>
                                    <td colSpan="7"><input type="text" /></td>
                                </tr>
                                <tr>
                                    <td colSpan="4"></td>
                                    <td width="15%">Technician: </td>
                                    <td width="10%"></td>
                                    <td width="15%"></td>
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
                                    <td colSpan="4">Suggestive Treatment and Planning</td>
                                </tr>
                                <tr>
                                    <td colSpan="4"><input type="text" /></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td width="15%">Physician: </td>
                                    <td width="15%"></td>
                                    <td width="15%"></td>
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
                                    <td width="20%"><div style={{overflow:"hidden"}}>姓名：<input className="myInput" defaultValue={this.props.name}/></div></td>
                                    <td width="20%"><div style={{overflow:"hidden"}}>年齡：<input className="myInput" defaultValue={this.props.age}/></div></td>
                                    <td width="20%"><div style={{overflow:"hidden"}}>病歷號：<input className="myInput" defaultValue={this.props.patientID}/></div></td>
                                    <td width="20%"><div style={{overflow:"hidden"}}>性別：<input className="myInput" defaultValue={this.props.sex}/></div></td>
                                    <td width="20%"><div style={{overflow:"hidden"}}>生日：<input className="myInput" defaultValue={this.props.dob}/></div></td>
                                </tr>
                                <tr>
                                    <td><div style={{overflow:"hidden"}}>身高：<input className="myInput" defaultValue={this.props.height}/></div></td>
                                    <td><div style={{overflow:"hidden"}}>體重：<input className="myInput" defaultValue={this.props.weight}/></div></td>
                                    <td><div style={{overflow:"hidden"}}>體質量指數：<input className="myInput" defaultValue={this.props.bmi}/></div></td>
                                    <td><div style={{overflow:"hidden"}}>頸圍：<input className="myInput" defaultValue={this.props.neck}/></div></td>
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
                                    <td colSpan="2" width="40%">呼吸中止和淺呼吸指數：</td>
                                    <td colSpan="2" width="30%">呼吸中止指數：</td>
                                    <td colSpan="2" width="30%">淺呼吸指數：</td>
                                    
                                </tr>
                                <tr>
                                    <td colSpan="2">阻塞型呼吸中止指數：</td>
                                    <td colSpan="2">中樞型呼吸中止指數：</td>
                                    <td colSpan="2">混和型呼吸中止指數：</td>
                                    

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
                                    <td width="30%"><div style={{overflow:"hidden"}}><input className="myInput" defaultValue={this.props.totalRecordTime}/></div></td>
                                    <td width="20%">睡眠時間(分鐘)：</td>
                                    <td width="30%"><span style={{fontWeight: "normal"}}>{((this.props.epochNum - this.props.sot) / 2).toFixed(1)}</span></td>
                                </tr>
                                <tr>
                                    <td>全部睡眠時間(分鐘)：</td>
                                    <td><span style={{fontWeight: "normal"}}>{((this.props.epochNum - this.props.wake) / 2).toFixed(1)}</span></td>
                                    <td>清醒時間(分鐘)：</td>
                                    <td><span style={{fontWeight: "normal"}}>{((this.props.wake - this.props.sot) / 2).toFixed(1)}</span></td>
                                </tr>
                                <tr>
                                    <td>睡眠第一期(%)：</td>
                                    <td><span style={{fontWeight: "normal"}}>{((this.props.n1 / (this.props.n1 + this.props.n2 + this.props.n3 + this.props.rem)) * 100).toFixed(1)}</span></td>
                                    <td>快速動眼期(%)：</td>
                                    <td><span style={{fontWeight: "normal"}}>{((this.props.rem / (this.props.n1 + this.props.n2 + this.props.n3 + this.props.rem)) * 100).toFixed(1)}</span></td>
                                </tr>
                                <tr>
                                    <td>睡眠第二期(%)：</td>
                                    <td><span style={{fontWeight: "normal"}}>{((this.props.n2 / (this.props.n1 + this.props.n2 + this.props.n3 + this.props.rem)) * 100).toFixed(1)}</span></td>
                                    <td>入睡時間(分鐘)：</td>
                                    <td><span style={{fontWeight: "normal"}}>{(this.props.sot / 2).toFixed(1)}</span></td>
                                </tr>
                                <tr>
                                    <td>睡眠第三期(%)：</td>
                                    <td><span style={{fontWeight: "normal"}}>{((this.props.n3 / (this.props.n1 + this.props.n2 + this.props.n3 + this.props.rem)) * 100).toFixed(1)}</span></td>
                                    <td>睡眠效率(%)：</td>
                                    <td><span style={{fontWeight: "normal"}}>{(((this.props.epochNum - this.props.wake) /this.props.epochNum) * 100).toFixed(1)}</span></td>
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
                                    <td width="30%"></td>
                                    <td width="20%">總發生時間：</td>
                                    <td width="30%"></td>
                                </tr>
                                <tr>
                                    <td>中樞型呼吸中止：</td>
                                    <td></td>
                                    <td>總發生時間：</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>混和型呼吸中止：</td>
                                    <td></td>
                                    <td>總發生時間：</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>淺呼吸：</td>
                                    <td></td>
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
                                    <td width="20%">總數：</td>
                                    <td width="30%"></td>
                                    <td width="20%">打鼾指數：</td>
                                    <td width="30%"></td>
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
                        <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
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
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>兒童</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
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