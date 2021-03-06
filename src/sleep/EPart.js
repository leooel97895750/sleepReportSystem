import React from 'react';
import '../css/report.css';
import {postJsonAPI} from './functions/API.js';

class EPart extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    // 是否是該是null
    nullCheck(str){
        return str === "" ? null : str; 
    }

    // 當input欄位改變時更新資料庫
    databaseUpdate(e, key){
        let inputReportData = {
            CaseID: this.nullCheck(document.getElementById("e2").value),
            Waist: this.nullCheck(document.getElementById("e12").value),
            Hip: this.nullCheck(document.getElementById("e13").value),
            HADS_A: this.nullCheck(document.getElementById("e14").value),
            HADS_D: this.nullCheck(document.getElementById("e15").value),
            ESS: this.nullCheck(document.getElementById("e16").value),
            PSQI: this.nullCheck(document.getElementById("e17").value),
            SOS: this.nullCheck(document.getElementById("e18").value),
            THI: this.nullCheck(document.getElementById("e19").value),
            GERD_Q: this.nullCheck(document.getElementById("e20").value),
            WHO_Phy: this.nullCheck(document.getElementById("e21").value),
            WHO_Psy: this.nullCheck(document.getElementById("e22").value),
            BP_S_D: this.nullCheck(document.getElementById("e23").value),
            BP_S_S: this.nullCheck(document.getElementById("e24").value),
            BP_W_D: this.nullCheck(document.getElementById("e25").value),
            BP_W_S: this.nullCheck(document.getElementById("e26").value),
            SleepQuality: this.nullCheck(document.getElementById("e27").value),
        };
        this.setState({inputReportData: inputReportData}, () => {
            // 更新資料庫
            console.log(this.props.RID);
            inputReportData['RID'] = this.props.RID;
            let updateEPartReportUrl = this.props.apiURL + "/updateEPartReport";
            postJsonAPI(updateEPartReportUrl, inputReportData, (xhttp) => {
                console.log(xhttp.responseText);
            });
        });
    }

    // 輸入資料與CPart欄位連動
    waistUpdate(){
        let waist = document.getElementById("e12").value;
        document.getElementById("c11").textContent = waist;
        
    }
    hipUpdate(){
        let hip = document.getElementById("e13").value;
        document.getElementById("c12").textContent = hip;
    }

    render(){
        
        const rpd = this.props.reportData;

        return(
            <div>
                {/* Patient Information */}
                <div style={{width:"100%", fontSize:"20px"}}>
                    <div style={{width:"1000px", margin:"0px auto"}}>
                        <span style={{fontWeight:"bold"}}>Patient Information: </span>
                        <div style={{float:"right"}}>
                            <span style={{fontWeight:"bold"}}>Study Date: </span>
                            <input id="e1" className="upperInput" readOnly="readonly" defaultValue={rpd.StudyDate}/>
                            <span style={{fontWeight:"bold", marginLeft:"20px"}}>單號: </span>
                            <input id="e2" className="upperInput write" defaultValue={rpd.CaseID} style={{position:"relative", bottom:"3px", width:"200px", textAlign:"center"}} onChange={e => {this.databaseUpdate(e, 'CaseID')}}/>
                        </div>
                    </div>
                </div>
                
                
                <div style={{fontSize:"18px", fontWeight:"500"}}>
                    <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px", whiteSpace: "nowrap"}}>
                        <tbody>
                            <tr>
                                <td colSpan="4" width="20%">Name：<span id="e3">{rpd.Name}</span></td>
                                <td colSpan="4" width="20%">Age：<span id="e4">{rpd.Age}</span></td>
                                <td colSpan="4" width="20%">Patient ID：<span id="e5">{rpd.PatientID.split(':')[0]}</span></td>
                                <td colSpan="4" width="20%">Sex：<span id="e6">{rpd.Sex}</span></td>
                                <td colSpan="4" width="20%">DOB：<span id="e7">{rpd.DOB}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{fontSize:"18px", fontWeight:"500", position:"relative", top:"-2px"}}>
                    <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px", whiteSpace: "nowrap"}}>
                        <tbody>
                            <tr>
                                <td colSpan="4" width="20%">Height(cm)：<span id="e8">{rpd.Height}</span></td>
                                <td colSpan="4" width="20%">Weight(kg)：<span id="e9">{rpd.Weight}</span></td>
                                <td colSpan="3" width="15%">BMI：<span id="e10">{rpd.BMI}</span></td>
                                <td colSpan="3" width="15%">Neck(cm)：<span id="e11">{rpd.Neck}</span></td>
                                <td colSpan="3" width="15%"><div style={{overflow:"hidden"}}>Waist(cm)：<input id="e12" className="myInput write" defaultValue={rpd.Waist} style={{width:"47px", textAlign:"center"}} onChange={e => {this.waistUpdate(); this.databaseUpdate(e, 'Waist')}}/></div></td>
                                <td colSpan="3" width="15%"><div style={{overflow:"hidden"}}>Hip(cm)：<input id="e13" className="myInput write" defaultValue={rpd.Hip} style={{width:"60px", textAlign:"center"}} onChange={e => {this.hipUpdate(); this.databaseUpdate(e, 'Hip')}}/></div></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{fontSize:"18px", fontWeight:"500", position:"relative", top:"-4px"}}>
                    <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px", whiteSpace: "nowrap"}}>
                        <tbody>
                            <tr>
                                <td colSpan="4" width="20%"><div style={{overflow:"hidden"}}>HADS(A/D)：<input id="e14" className="myInput write" defaultValue={rpd.HADS_A} style={{width:"30px", textAlign:"center"}} onChange={e => {this.databaseUpdate(e, 'HADS_A')}}/> / <input id="e15" className="myInput write" defaultValue={rpd.HADS_D} style={{width:"30px", textAlign:"center"}} onChange={e => {this.databaseUpdate(e, 'HADS_D')}}/></div></td>
                                <td colSpan="4" width="20%"><div style={{overflow:"hidden"}}>ESS：<input id="e16" className="myInput write" defaultValue={rpd.ESS} style={{width:"140px", textAlign:"center"}} onChange={e => {this.databaseUpdate(e, 'ESS')}}/></div></td>
                                <td colSpan="3" width="15%"><div style={{overflow:"hidden"}}>PSQI：<input id="e17" className="myInput write" defaultValue={rpd.PSQI} style={{width:"83px", textAlign:"center"}} onChange={e => {this.databaseUpdate(e, 'PSQI')}}/></div></td>
                                <td colSpan="3" width="15%"><div style={{overflow:"hidden"}}>SOS：<input id="e18" className="myInput write" defaultValue={rpd.SOS} style={{width:"90px", textAlign:"center"}} onChange={e => {this.databaseUpdate(e, 'SOS')}}/></div></td>
                                <td colSpan="3" width="15%"><div style={{overflow:"hidden"}}>THI：<input id="e19" className="myInput write" defaultValue={rpd.THI}  style={{width:"90px", textAlign:"center"}} onChange={e => {this.databaseUpdate(e, 'THI')}}/></div></td>
                                <td colSpan="3" width="15%"><div style={{overflow:"hidden"}}>GERD-Q：<input id="e20" className="myInput write" defaultValue={rpd.GERD_Q} style={{width:"54px", textAlign:"center"}} onChange={e => {this.databaseUpdate(e, 'GERD_Q')}}/></div></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{fontSize:"18px", fontWeight:"500", position:"relative", top:"-6px"}}>
                    <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px", whiteSpace: "nowrap"}}>
                        <tbody>
                            <tr>
                                <td colSpan="5" width="25%"><div style={{overflow:"hidden"}}>WHO(Phy/Psy)：<input id="e21" className="myInput write" defaultValue={rpd.WHO_Phy} style={{width:"43px", textAlign:"center"}} onChange={e => {this.databaseUpdate(e, 'WHO_Phy')}}/> / <input id="e22" className="myInput write" defaultValue={rpd.WHO_Psy} style={{width:"43px", textAlign:"center"}} onChange={e => {this.databaseUpdate(e, 'WHO_Psy')}}/></div></td>
                                <td colSpan="5" width="25%"><div style={{overflow:"hidden"}}>BP(S)(mmHg)：<input id="e23" className="myInput write" defaultValue={rpd.BP_S_D} style={{width:"50px", textAlign:"center"}} onChange={e => {this.databaseUpdate(e, 'BP_S_D')}}/> / <input id="e24" className="myInput write" defaultValue={rpd.BP_S_S} style={{width:"50px", textAlign:"center"}} onChange={e => {this.databaseUpdate(e, 'BP_S_S')}}/></div></td>
                                <td colSpan="5" width="25%"><div style={{overflow:"hidden"}}>BP(W)(mmHg)：<input id="e25" className="myInput write" defaultValue={rpd.BP_W_D} style={{width:"45px", textAlign:"center"}} onChange={e => {this.databaseUpdate(e, 'BP_W_D')}}/> / <input id="e26" className="myInput write" defaultValue={rpd.BP_W_S} style={{width:"45px", textAlign:"center"}} onChange={e => {this.databaseUpdate(e, 'BP_W_S')}}/></div></td>
                                <td colSpan="5" width="25%"><div style={{overflow:"hidden"}}>Subjective sleep quality：<input id="e27" className="myInput write" defaultValue={rpd.SleepQuality} style={{width:"50px", textAlign:"center"}} onChange={e => {this.databaseUpdate(e, 'SleepQuality')}}/></div></td>
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
                                <td width="25%">AHI：<span id="e28">{rpd.AHI}</span></td>
                                <td width="25%">AI：<span id="e29">{rpd.AI}</span></td>
                                <td width="25%">HI：<span id="e30">{rpd.HI}</span></td>
                                <td width="25%">OI：<span id="e31">{rpd.OI}</span></td>
                            </tr>
                            <tr>
                                <td>CI：<span id="e32">{rpd.CI}</span></td>
                                <td>MI：<span id="e33">{rpd.MI}</span></td>
                                <td>AHI(Supine)：<span id="e34"></span>{rpd.AHI_Supine}</td>
                                <td>AHI(NSupine)：<span id="e35"></span>{rpd.AHI_NSupine}</td>
                            </tr>
                            <tr>
                                <td>AHI(REM)：<span id="e36"></span>{rpd.AHI_REM}</td>
                                <td>AHI(NREM)：<span id="e37"></span>{rpd.AHI_NREM}</td>
                                <td>AHI(Left)：<span id="e38"></span>{rpd.AHI_Left}</td>
                                <td>AHI(Right)：<span id="e39"></span>{rpd.AHI_Right}</td>
                            </tr>
                            <tr>
                                <td colSpan="2">AHI(REM-Supine)：<span id="e40"></span>{rpd.AHI_REM_Supine}</td>
                                <td colSpan="2">AHI(REM-NSupine)：<span id="e41"></span>{rpd.AHI_REM_NSupine === 'NaN' ? '0' : rpd.AHI_REM_NSupine}</td>
                            </tr>
                            <tr>
                                <td colSpan="2">AHI(NREM-Supine)：<span id="e42"></span>{rpd.AHI_NREM_Supine}</td>
                                <td colSpan="2">AHI(NREM-NSupine)：<span id="e43"></span>{rpd.AHI_NREM_NSupine}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Sleep Stage */}
                <br/>
                <div style={{width:"100%", fontSize:"20px"}}>
                    <div style={{width:"1000px", margin:"0px auto"}}>
                        <span style={{fontWeight:"bold"}}>Sleep Stage：</span>
                        <span>Start time at <span id="e44">{rpd.StartTime}</span> ; End time at <span id="e45">{rpd.EndTime}</span></span>
                    </div>
                </div>

                <div style={{fontSize:"18px", fontWeight:"500"}}>
                    <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px", whiteSpace: "nowrap"}}>
                        <tbody>
                            <tr>
                                <td width="50%">Total record time(min)：<span id="e46">{rpd.TotalRecordTime}</span></td>
                                <td width="50%">Total sleep period(min)：<span id="e47">{rpd.TotalSleepPeriod}</span></td>
                            </tr>
                            <tr>
                                <td>Total sleep time(min)：<span id="e48">{rpd.TotalSleepTime}</span></td>
                                <td>Awake time(min)：<span id="e49">{rpd.AwakeTime}</span></td>
                            </tr>
                            <tr>
                                <td>Stage 1 (%)：<span id="e50">{rpd.Stage1}</span></td>
                                <td>REM (%)：<span id="e51">{rpd.REM}</span></td>
                            </tr>
                            <tr>
                                <td>Stage 2 (%)：<span id="e52">{rpd.Stage2}</span></td>
                                <td>Sleep Latency：<span id="e53">{rpd.SleepLatency}</span></td>
                            </tr>
                            <tr>
                                <td>Stage 3 (%)：<span id="e54">{rpd.Stage3}</span></td>
                                <td>Efficiency (%)：<span id="e55">{rpd.Efficiency}</span></td>
                            </tr>
                            <tr>
                                <td>Arousal Index (/h)：<span id="e56">{rpd.ArousalIndex}</span></td>
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
                                <td width="50%">Obstructive apnea (counts)：<span id="e57">{rpd.OA}</span></td>
                                <td width="50%">Total duration (min)：<span id="e58">{rpd.OAT}</span></td>
                            </tr>
                            <tr>
                                <td>Central apnea (counts)：<span id="e59">{rpd.CA}</span></td>
                                <td>Total duration (min)：<span id="e60">{rpd.CAT}</span></td>
                            </tr>
                            <tr>
                                <td>Mixed apnea (counts)：<span id="e61">{rpd.MA}</span></td>
                                <td>Total duration (min)：<span id="e62">{rpd.MAT}</span></td>
                            </tr>
                            <tr>
                                <td>Hypopnea (counts)：<span id="e63">{rpd.HA}</span></td>
                                <td>Total duration (min)：<span id="e64">{rpd.HAT}</span></td>
                            </tr>
                            <tr>
                                <td>Longest apnea (sec)：<span id="e65">{rpd.LA}</span></td>
                                <td>Longest hypopnea (sec)：<span id="e66">{rpd.LH}</span></td>
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
                                <td width="50%">Mean SpO2 (%)：<span id="e67">{rpd.MeanSpO2}</span></td>
                                <td width="50%">Mean desaturation (%)：<span id="e68">{rpd.MeanDesat}</span></td>
                            </tr>
                            <tr>
                                <td>Minimum SpO2 (%)：<span id="e69">{rpd.MinSpO2}</span></td>
                                <td>ODI (/h)：<span id="e70">{rpd.ODI}</span></td>
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
                                <td width="50%">Total (counts)：<span id="e71">{rpd.Snore}</span></td>
                                <td width="50%">Snore Index (/h)：<span id="e72">{rpd.SnoreIndex}</span></td>
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
                                <td><span id="e73"></span>{rpd.MS}</td>
                                <td><span id="e74"></span>{rpd.MR}</td>
                                <td><span id="e75"></span>{rpd.MN}</td>
                            </tr>
                            <tr>
                                <td>Lowest heart rate</td>
                                <td><span id="e76"></span>{rpd.LS}</td>
                                <td><span id="e77"></span>{rpd.LR}</td>
                                <td><span id="e78"></span>{rpd.LN}</td>
                            </tr>
                            <tr>
                                <td>Hightest heart rate</td>
                                <td><span id="e79"></span>{rpd.HS}</td>
                                <td><span id="e80"></span>{rpd.HR}</td>
                                <td><span id="e81"></span>{rpd.HN}</td>
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
                                <td width="50%">Mean Heart Rate：<span id="e82">{rpd.MeanHR}</span></td>
                                <td width="50%">Minimum Heart Rate：<span id="e83">{rpd.MinHR}</span></td>
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
                                <td width="20%">REM：<span id="e84"></span>{rpd.LM_R}</td>
                                <td width="20%">NREM：<span id="e85"></span>{rpd.LM_N}</td>
                                <td width="20%">Total：<span id="e86"></span>{rpd.LM_T}</td>
                            </tr>
                            <tr>
                                <td>Number of Periodic Leg Movements(PLM)</td>
                                <td>REM：<span id="e87"></span>{rpd.PLM_R}</td>
                                <td>NREM：<span id="e88"></span>{rpd.PLM_N}</td>
                                <td>Total：<span id="e89"></span>{rpd.PLM_T}</td>
                            </tr>
                            <tr>
                                <td>PLM Index</td>
                                <td>REM：<span id="e90"></span>{rpd.PLMI_R}</td>
                                <td>NREM：<span id="e91"></span>{rpd.PLMI_N}</td>
                                <td>Total：<span id="e92"></span>{rpd.PLMI_T}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default EPart;