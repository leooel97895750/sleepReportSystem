import React from 'react';
import '../css/report.css';

class EPart extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    
    componentDidUpdate(prevProps){
        if(prevProps.getEPartData === 0 && this.props.getEPartData === 1){
            // 將報告資料傳回Report
            let EPartData = {
                StudyDate: document.getElementById("e1").value,
                CaseNumber: document.getElementById("e2").value,
                Name: document.getElementById("e3").textContent,
                Age: document.getElementById("e4").textContent,
                PatientID: document.getElementById("e5").textContent,
                Sex: document.getElementById("e6").textContent,
                DOB: document.getElementById("e7").textContent,
                Height: document.getElementById("e8").textContent,
                Weight: document.getElementById("e9").textContent,
                BMI: document.getElementById("e10").textContent,
                Neck: document.getElementById("e11").textContent,
                Waist: document.getElementById("e12").value,
                Hip: document.getElementById("e13").value,
                HADS: document.getElementById("e14").value,
                ESS: document.getElementById("e15").value,
                PSQI: document.getElementById("e16").value,
                SOS: document.getElementById("e17").value,
                THI: document.getElementById("e18").value,
                GERD_Q: document.getElementById("e19").value,
                WHO: document.getElementById("e20").value,
                BP_S: document.getElementById("e21").value,
                BP_W: document.getElementById("e22").value,
                SleepQuality: document.getElementById("e23").value,

                AHI: document.getElementById("e24").textContent,
                AI: document.getElementById("e25").textContent,
                HI: document.getElementById("e26").textContent,
                OI: document.getElementById("e27").textContent,
                CI: document.getElementById("e28").textContent,
                MI: document.getElementById("e29").textContent,
                AHI_Supine: document.getElementById("e30").textContent,
                AHI_NSupine: document.getElementById("e31").textContent,
                AHI_REM: document.getElementById("e32").textContent,
                AHI_NREM: document.getElementById("e33").textContent,
                AHI_Left: document.getElementById("e34").textContent,
                AHI_Right: document.getElementById("e35").textContent,
                AHI_REM_Supine: document.getElementById("e36").textContent,
                AHI_REM_NSupine: document.getElementById("e37").textContent,
                AHI_NREM_Supine: document.getElementById("e38").textContent,
                AHI_NREM_NSupine: document.getElementById("e39").textContent,

                StartTime: document.getElementById("e40").textContent,
                EndTime: document.getElementById("e41").textContent,
                TotalRecordTime: document.getElementById("e42").textContent,
                TotalSleepPeriod: document.getElementById("e43").textContent,
                TotalSleepTime: document.getElementById("e44").textContent,
                AwakeTime: document.getElementById("e45").textContent,
                Stage1: document.getElementById("e46").textContent,
                REM: document.getElementById("e47").textContent,
                Stage2: document.getElementById("e48").textContent,
                SleepLatency: document.getElementById("e49").textContent,
                Stage3: document.getElementById("e50").textContent,
                Efficiency: document.getElementById("e51").textContent,
                ArousalIndex: document.getElementById("e52").textContent,

                OA: document.getElementById("e53").textContent,
                OAT: document.getElementById("e54").textContent,
                CA: document.getElementById("e55").textContent,
                CAT: document.getElementById("e56").textContent,
                MA: document.getElementById("e57").textContent,
                MAT: document.getElementById("e58").textContent,
                HA: document.getElementById("e59").textContent,
                HAT: document.getElementById("e60").textContent,
                LA: document.getElementById("e61").textContent,
                LH: document.getElementById("e62").textContent,

                MeanSpO2: document.getElementById("e63").textContent,
                MeanDesat: document.getElementById("e64").textContent,
                MinSpO2: document.getElementById("e65").textContent,
                ODI: document.getElementById("e66").textContent,

                Snore: document.getElementById("e67").textContent,
                SnoreIndex: document.getElementById("e68").textContent,

                MS: document.getElementById("e69").textContent,
                MR: document.getElementById("e70").textContent,
                MN: document.getElementById("e71").textContent,
                LS: document.getElementById("e72").textContent,
                LR: document.getElementById("e73").textContent,
                LN: document.getElementById("e74").textContent,
                HS: document.getElementById("e75").textContent,
                HR: document.getElementById("e76").textContent,
                HN: document.getElementById("e77").textContent,

                MeanHR: document.getElementById("e78").textContent,
                MinHR: document.getElementById("e79").textContent,

                LM_R: document.getElementById("e80").textContent,
                LM_N: document.getElementById("e81").textContent,
                LM_T: document.getElementById("e82").textContent,
                PLM_R: document.getElementById("e83").textContent,
                PLM_N: document.getElementById("e84").textContent,
                PLM_T: document.getElementById("e85").textContent,
                PLMI_R: document.getElementById("e86").textContent,
                PLMI_N: document.getElementById("e87").textContent,
                PLMI_T: document.getElementById("e88").textContent,
            };
            this.props.updateEPartData(EPartData);
        }
    }

    render(){
        let evn = this.props.eventsCount;
        return(
            <div>
                {/* Patient Information */}
                <div style={{width:"100%", fontSize:"20px"}}>
                    <div style={{width:"1000px", margin:"0px auto"}}>
                        <span style={{fontWeight:"bold"}}>Patient Information: </span>
                        <div style={{float:"right"}}>
                            <span style={{fontWeight:"bold"}}>Study Date: </span>
                            <input id="e1" className="upperInput" readOnly="readonly" defaultValue={this.props.cfg.startDate}/>
                            <span style={{fontWeight:"bold", marginLeft:"20px"}}>單號: </span>
                            <input id="e2" className="upperInput write" style={{position:"relative", bottom:"3px"}}/>
                        </div>
                    </div>
                </div>
                
                
                <div style={{fontSize:"18px", fontWeight:"500"}}>
                    <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px", whiteSpace: "nowrap"}}>
                        <tbody>
                            <tr>
                                <td colSpan="4" width="20%">Name：<span id="e3">{this.props.cfg.name}</span></td>
                                <td colSpan="4" width="20%">Age：<span id="e4">{this.props.cfg.age}</span></td>
                                <td colSpan="4" width="20%">Patient ID：<span id="e5">{this.props.cfg.patientID}</span></td>
                                <td colSpan="4" width="20%">Sex：<span id="e6">{this.props.cfg.sex}</span></td>
                                <td colSpan="4" width="20%">DOB：<span id="e7">{this.props.cfg.dob}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{fontSize:"18px", fontWeight:"500", position:"relative", top:"-2px"}}>
                    <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px", whiteSpace: "nowrap"}}>
                        <tbody>
                            <tr>
                                <td colSpan="4" width="20%">Height(cm)：<span id="e8">{this.props.cfg.height}</span></td>
                                <td colSpan="4" width="20%">Weight(kg)：<span id="e9">{this.props.cfg.weight}</span></td>
                                <td colSpan="3" width="15%">BMI：<span id="e10">{this.props.cfg.bmi}</span></td>
                                <td colSpan="3" width="15%">Neck(cm)：<span id="e11">{this.props.cfg.neck}</span></td>
                                <td colSpan="3" width="15%"><div style={{overflow:"hidden"}}>Waist(cm)：<input id="e12" className="myInput write"/></div></td>
                                <td colSpan="3" width="15%"><div style={{overflow:"hidden"}}>Hip(cm)：<input id="e13" className="myInput write"/></div></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{fontSize:"18px", fontWeight:"500", position:"relative", top:"-4px"}}>
                    <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px", whiteSpace: "nowrap"}}>
                        <tbody>
                            <tr>
                                <td colSpan="4" width="20%"><div style={{overflow:"hidden"}}>HADS(A/D)：<input id="e14" className="myInput write"/></div></td>
                                <td colSpan="4" width="20%"><div style={{overflow:"hidden"}}>ESS：<input id="e15" className="myInput write"/></div></td>
                                <td colSpan="3" width="15%"><div style={{overflow:"hidden"}}>PSQI：<input id="e16" className="myInput write"/></div></td>
                                <td colSpan="3" width="15%"><div style={{overflow:"hidden"}}>SOS：<input id="e17" className="myInput write"/></div></td>
                                <td colSpan="3" width="15%"><div style={{overflow:"hidden"}}>THI：<input id="e18" className="myInput write"/></div></td>
                                <td colSpan="3" width="15%"><div style={{overflow:"hidden"}}>GERD-Q：<input id="e19" className="myInput write"/></div></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{fontSize:"18px", fontWeight:"500", position:"relative", top:"-6px"}}>
                    <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px", whiteSpace: "nowrap"}}>
                        <tbody>
                            <tr>
                                <td colSpan="5" width="25%"><div style={{overflow:"hidden"}}>WHO(Phy/Psy)：<input id="e20" className="myInput write"/></div></td>
                                <td colSpan="5" width="25%"><div style={{overflow:"hidden"}}>BP(S)(mmHg)：<input id="e21" className="myInput write"/></div></td>
                                <td colSpan="5" width="25%"><div style={{overflow:"hidden"}}>BP(W)(mmHg)：<input id="e22" className="myInput write"/></div></td>
                                <td colSpan="5" width="25%"><div style={{overflow:"hidden"}}>Subjective sleep quality：<input id="e23" className="myInput write"/></div></td>
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
                                <td width="25%">AHI：<span id="e24">{(((evn.CA + evn.MA + evn.OA + evn.OH) / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1))}</span></td>
                                <td width="25%">AI：<span id="e25">{((evn.CA + evn.MA + evn.OA) / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
                                <td width="25%">HI：<span id="e26">{(evn.OH / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
                                <td width="25%">OI：<span id="e27">{(evn.OA / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
                            </tr>
                            <tr>
                                <td>CI：<span id="e28">{(evn.CA / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
                                <td>MI：<span id="e29">{(evn.MA / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
                                <td>AHI(Supine)：<span id="e30"></span></td>
                                <td>AHI(NSupine)：<span id="e31"></span></td>
                            </tr>
                            <tr>
                                <td>AHI(REM)：<span id="e32"></span></td>
                                <td>AHI(NREM)：<span id="e33"></span></td>
                                <td>AHI(Left)：<span id="e34"></span></td>
                                <td>AHI(Right)：<span id="e35"></span></td>
                            </tr>
                            <tr>
                                <td colSpan="2">AHI(REM-Supine)：<span id="e36"></span></td>
                                <td colSpan="2">AHI(REM-NSupine)：<span id="e37"></span></td>
                            </tr>
                            <tr>
                                <td colSpan="2">AHI(NREM-Supine)：<span id="e38"></span></td>
                                <td colSpan="2">AHI(NREM-NSupine)：<span id="e39"></span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Sleep Stage */}
                <br/>
                <div style={{width:"100%", fontSize:"20px"}}>
                    <div style={{width:"1000px", margin:"0px auto"}}>
                        <span style={{fontWeight:"bold"}}>Sleep Stage：</span>
                        <span>Start time at <span id="e40">{this.props.cfg.startTime}</span> ; End time at <span id="e41">{this.props.cfg.endTime}</span></span>
                    </div>
                </div>

                <div style={{fontSize:"18px", fontWeight:"500"}}>
                    <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px", whiteSpace: "nowrap"}}>
                        <tbody>
                            <tr>
                                <td width="50%">Total record time(min)：<span id="e42">{this.props.cfg.totalRecordTime}</span></td>
                                <td width="50%">Total sleep period(min)：<span id="e43">{((this.props.epochNum - this.props.sot) / 2).toFixed(1)}</span></td>
                            </tr>
                            <tr>
                                <td>Total sleep time(min)：<span id="e44">{((this.props.epochNum - this.props.wake) / 2).toFixed(1)}</span></td>
                                <td>Awake time(min)：<span id="e45">{((this.props.wake - this.props.sot) / 2).toFixed(1)}</span></td>
                            </tr>
                            <tr>
                                <td>Stage 1 (%)：<span id="e46">{((this.props.n1 / (this.props.n1 + this.props.n2 + this.props.n3 + this.props.rem)) * 100).toFixed(1)}</span></td>
                                <td>REM (%)：<span id="e47">{((this.props.rem / (this.props.n1 + this.props.n2 + this.props.n3 + this.props.rem)) * 100).toFixed(1)}</span></td>
                            </tr>
                            <tr>
                                <td>Stage 2 (%)：<span id="e48">{((this.props.n2 / (this.props.n1 + this.props.n2 + this.props.n3 + this.props.rem)) * 100).toFixed(1)}</span></td>
                                <td>Sleep Latency：<span id="e49">{(this.props.sot / 2).toFixed(1)}</span></td>
                            </tr>
                            <tr>
                                <td>Stage 3 (%)：<span id="e50">{((this.props.n3 / (this.props.n1 + this.props.n2 + this.props.n3 + this.props.rem)) * 100).toFixed(1)}</span></td>
                                <td>Efficiency (%)：<span id="e51">{(((this.props.epochNum - this.props.wake) /this.props.epochNum) * 100).toFixed(1)}</span></td>
                            </tr>
                            <tr>
                                <td>Arousal Index (/h)：<span id="e52">{((evn.A1 + evn.A2 + evn.A3 + evn.A4) / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
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
                                <td width="50%">Obstructive apnea (counts)：<span id="e53">{evn.OA}</span></td>
                                <td width="50%">Total duration (min)：<span id="e54">{(evn.TOA / 60)}</span></td>
                            </tr>
                            <tr>
                                <td>Central apnea (counts)：<span id="e55">{evn.CA}</span></td>
                                <td>Total duration (min)：<span id="e56">{(evn.TCA / 60)}</span></td>
                            </tr>
                            <tr>
                                <td>Mixed apnea (counts)：<span id="e57">{evn.MA}</span></td>
                                <td>Total duration (min)：<span id="e58">{(evn.TMA / 60)}</span></td>
                            </tr>
                            <tr>
                                <td>Hypopnea (counts)：<span id="e59">{evn.OH}</span></td>
                                <td>Total duration (min)：<span id="e60">{(evn.TOH / 60)}</span></td>
                            </tr>
                            <tr>
                                <td>Longest apnea (sec)：<span id="e61">{evn.LA}</span></td>
                                <td>Longest hypopnea (sec)：<span id="e62">{evn.LH}</span></td>
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
                                <td width="50%">Mean SpO2 (%)：<span id="e63">{(evn.SPDS / evn.SPD).toFixed(1)}</span></td>
                                <td width="50%">Mean desaturation (%)：<span id="e64">{(evn.SD / evn.SPD).toFixed(1)}</span></td>
                            </tr>
                            <tr>
                                <td>Minimum SpO2 (%)：<span id="e65">{evn.MSPD}</span></td>
                                <td>ODI (/h)：<span id="e66">{((evn.SPD) / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
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
                                <td width="50%">Total (counts)：<span id="e67">{evn.SNORE}</span></td>
                                <td width="50%">Snore Index (/h)：<span id="e68">{((evn.SNORE) / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
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
                                <td><span id="e69"></span></td>
                                <td><span id="e70"></span></td>
                                <td><span id="e71"></span></td>
                            </tr>
                            <tr>
                                <td>Lowest heart rate</td>
                                <td><span id="e72"></span></td>
                                <td><span id="e73"></span></td>
                                <td><span id="e74"></span></td>
                            </tr>
                            <tr>
                                <td>Hightest heart rate</td>
                                <td><span id="e75"></span></td>
                                <td><span id="e76"></span></td>
                                <td><span id="e77"></span></td>
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
                                <td width="50%">Mean Heart Rate：<span id="e78"></span></td>
                                <td width="50%">Minimum Heart Rate：<span id="e79"></span></td>
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
                                <td width="20%">REM：<span id="e80"></span></td>
                                <td width="20%">NREM：<span id="e81"></span></td>
                                <td width="20%">Total：<span id="e82"></span></td>
                            </tr>
                            <tr>
                                <td>Number of Periodic Leg Movements(PLM)</td>
                                <td>REM：<span id="e83"></span></td>
                                <td>NREM：<span id="e84"></span></td>
                                <td>Total：<span id="e85"></span></td>
                            </tr>
                            <tr>
                                <td>PLM Index</td>
                                <td>REM：<span id="e86"></span></td>
                                <td>NREM：<span id="e87"></span></td>
                                <td>Total：<span id="e88"></span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default EPart;