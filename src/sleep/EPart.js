import React from 'react';
import '../css/report.css';

class EPart extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
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
                            <input className="upperInput" defaultValue={this.props.cfg.startDate}/>
                            <span style={{fontWeight:"bold", marginLeft:"20px"}}>單號: </span>
                            <input className="upperInput"/>
                        </div>
                    </div>
                </div>
                
                
                <div style={{fontSize:"18px", fontWeight:"500"}}>
                    <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px", whiteSpace: "nowrap"}}>
                        <tbody>
                            <tr>
                                <td colSpan="4" width="20%">Name：<span>{this.props.cfg.name}</span></td>
                                <td colSpan="4" width="20%">Age：<span>{this.props.cfg.age}</span></td>
                                <td colSpan="4" width="20%">Patient ID：<span>{this.props.cfg.patientID}</span></td>
                                <td colSpan="4" width="20%">Sex：<span>{this.props.cfg.sex}</span></td>
                                <td colSpan="4" width="20%">DOB：<span>{this.props.cfg.dob}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{fontSize:"18px", fontWeight:"500", position:"relative", top:"-2px"}}>
                    <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px", whiteSpace: "nowrap"}}>
                        <tbody>
                            <tr>
                                <td colSpan="4" width="20%">Height(cm)：<span>{this.props.cfg.height}</span></td>
                                <td colSpan="4" width="20%">Weight(kg)：<span>{this.props.cfg.weight}</span></td>
                                <td colSpan="3" width="15%">BMI：<span>{this.props.cfg.bmi}</span></td>
                                <td colSpan="3" width="15%">Neck(cm)：<span>{this.props.cfg.neck}</span></td>
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
                        <span>Start time at {this.props.cfg.startTime} ; End time at {this.props.cfg.endTime}</span>
                    </div>
                </div>

                <div style={{fontSize:"18px", fontWeight:"500"}}>
                    <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px", whiteSpace: "nowrap"}}>
                        <tbody>
                            <tr>
                                <td width="50%">Total record time(min)：<span>{this.props.cfg.totalRecordTime}</span></td>
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
            </div>
        );
    }
}

export default EPart;