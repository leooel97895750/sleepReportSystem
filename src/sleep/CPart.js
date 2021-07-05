import React from 'react';
import '../css/report.css';

class CPart extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    // 將報告資料傳回Report
    componentDidUpdate(prevProps){
        if(prevProps.getCPartData === 0 && this.props.getCPartData === 1){
            let CPartData = {
                StudyDate: document.getElementById("c1").textContent,
                Name: document.getElementById("c2").textContent,
                Age: document.getElementById("c3").textContent,
                PatientID: document.getElementById("c4").textContent,
                Sex: document.getElementById("c5").textContent,
                DOB: document.getElementById("c6").textContent,
                Height: document.getElementById("c7").textContent,
                Weight: document.getElementById("c8").textContent,
                BMI: document.getElementById("c9").textContent,
                Neck: document.getElementById("c10").textContent,
                Waist: document.getElementById("c11").textContent,
                Hip: document.getElementById("c12").textContent,

                AHI: document.getElementById("c13").textContent,
                AI: document.getElementById("c14").textContent,
                HI: document.getElementById("c15").textContent,
                OI: document.getElementById("c16").textContent,
                CI: document.getElementById("c17").textContent,
                MI: document.getElementById("c18").textContent,
                AHI_REM: document.getElementById("c19").textContent,
                AHI_NREM: document.getElementById("c20").textContent,
                AHI_Supine: document.getElementById("c21").textContent,
                AHI_NSupine: document.getElementById("c22").textContent,

                StartTime: document.getElementById("c23").textContent,
                EndTime: document.getElementById("c24").textContent,
                TotalRecordTime: document.getElementById("c25").textContent,
                TotalSleepPeriod: document.getElementById("c26").textContent,
                TotalSleepTime: document.getElementById("c27").textContent,
                AwakeTime: document.getElementById("c28").textContent,
                Stage1: document.getElementById("c29").textContent,
                REM: document.getElementById("c30").textContent,
                Stage2: document.getElementById("c31").textContent,
                SleepLatency: document.getElementById("c32").textContent,
                Stage3: document.getElementById("c33").textContent,
                Efficiency: document.getElementById("c34").textContent,
                ArousalIndex: document.getElementById("c35").textContent,

                OA: document.getElementById("c36").textContent,
                OAT: document.getElementById("c37").textContent,
                CA: document.getElementById("c38").textContent,
                CAT: document.getElementById("c39").textContent,
                MA: document.getElementById("c40").textContent,
                MAT: document.getElementById("c41").textContent,
                HA: document.getElementById("c42").textContent,
                HAT: document.getElementById("c43").textContent,
                LA: document.getElementById("c44").textContent,
                LH: document.getElementById("c45").textContent,

                MeanSpO2: document.getElementById("c46").textContent,
                MeanDesat: document.getElementById("c47").textContent,
                MinSpO2: document.getElementById("c48").textContent,
                SpO2: document.getElementById("c49").textContent,

                Snore: document.getElementById("c50").textContent,
                SnoreIndex: document.getElementById("c51").textContent,

            };
            this.props.updateCPartData(CPartData);
        }
    }

    render(){
        let evn = this.props.eventsCount;
        return(
            <div>
                {/* 基本資料 */}
                <div style={{width:"100%", fontSize:"20px"}}>
                    <div style={{width:"1000px", margin:"0px auto"}}>
                        <span style={{fontWeight:"bold"}}>基本資料：</span>
                        <div style={{float:"right"}}>
                            <span style={{fontWeight:"bold", marginLeft:"20px"}}>紀錄時間: </span>
                            <span id="c1">{this.props.cfg.startDate}</span>
                        </div>
                    </div>
                </div>
                
                
                <div style={{fontSize:"18px", fontWeight:"500"}}>
                    <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px", whiteSpace: "nowrap"}}>
                        <tbody>
                            <tr>
                                <td width="20%">姓名：<span id="c2">{this.props.cfg.name}</span></td>
                                <td width="20%">年齡：<span id="c3">{this.props.cfg.age}</span></td>
                                <td width="20%">病歷號：<span id="c4">{this.props.cfg.patientID}</span></td>
                                <td width="20%">性別：<span id="c5">{this.props.cfg.sex === 'Male'?'男':'女'}</span></td>
                                <td width="20%">生日：<span id="c6">{this.props.cfg.dob}</span></td>
                            </tr>
                            <tr>
                                <td>身高：<span id="c7">{this.props.cfg.height}</span></td>
                                <td>體重：<span id="c8">{this.props.cfg.weight}</span></td>
                                <td>體質量指數：<span id="c9">{this.props.cfg.bmi}</span></td>
                                <td>頸圍：<span id="c10">{this.props.cfg.neck}</span></td>
                                <td>腰圍：<span id="c11"></span></td>
                                
                            </tr>
                            <tr>
                                <td>臀圍：<span id="c12"></span></td>
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
                                <td colSpan="2" width="40%">呼吸中止和淺呼吸指數：<span id="c13">{((evn.CA + evn.MA + evn.OA + evn.OH) / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
                                <td colSpan="2" width="30%">呼吸中止指數：<span id="c14">{((evn.CA + evn.MA + evn.OA) / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
                                <td colSpan="2" width="30%">淺呼吸指數：<span id="c15">{(evn.OH / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
                            </tr>
                            <tr>
                                <td colSpan="2">阻塞型呼吸中止指數：<span id="c16">{(evn.OA / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
                                <td colSpan="2">中樞型呼吸中止指數：<span id="c17">{(evn.CA / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
                                <td colSpan="2">混和型呼吸中止指數：<span id="c18">{(evn.MA / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>                           
                            </tr>
                            <tr>
                                <td colSpan="6">呼吸中止和淺呼吸指數(快速動眼期/非快速動眼期)：<span id="c19">1</span>/小時 / <span id="c20">1</span>/小時</td>
                            </tr>
                            <tr>
                                <td colSpan="6">呼吸中止和淺呼吸指數(平躺/非平躺)：<span id="c21">1</span>/小時 / <span id="c22">1</span>/小時</td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                {/* 睡眠分期 */}
                <br/>
                <div style={{width:"100%", fontSize:"20px"}}>
                    <div style={{width:"1000px", margin:"0px auto"}}>
                        <span style={{fontWeight:"bold"}}>睡眠分期：</span>
                        <span>開始記錄時間 <span id="c23">{this.props.cfg.startTime}</span> ; 結束紀錄時間 <span id="c24">{this.props.cfg.endTime}</span></span>
                    </div>
                </div>

                <div style={{fontSize:"18px", fontWeight:"500"}}>
                    <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
                        <tbody>
                            <tr>
                                <td width="20%">全部記錄時間(分鐘)：</td>
                                <td width="30%"><span id="c25">{this.props.cfg.totalRecordTime}</span></td>
                                <td width="20%">睡眠時間(分鐘)：</td>
                                <td width="30%"><span id="c26">{((this.props.epochNum - this.props.sot) / 2).toFixed(1)}</span></td>
                            </tr>
                            <tr>
                                <td>全部睡眠時間(分鐘)：</td>
                                <td><span id="c27">{((this.props.epochNum - this.props.wake) / 2).toFixed(1)}</span></td>
                                <td>清醒時間(分鐘)：</td>
                                <td><span id="c28">{((this.props.wake - this.props.sot) / 2).toFixed(1)}</span></td>
                            </tr>
                            <tr>
                                <td>睡眠第一期(%)：</td>
                                <td><span id="c29">{((this.props.n1 / (this.props.n1 + this.props.n2 + this.props.n3 + this.props.rem)) * 100).toFixed(1)}</span></td>
                                <td>快速動眼期(%)：</td>
                                <td><span id="c30">{((this.props.rem / (this.props.n1 + this.props.n2 + this.props.n3 + this.props.rem)) * 100).toFixed(1)}</span></td>
                            </tr>
                            <tr>
                                <td>睡眠第二期(%)：</td>
                                <td><span id="c31">{((this.props.n2 / (this.props.n1 + this.props.n2 + this.props.n3 + this.props.rem)) * 100).toFixed(1)}</span></td>
                                <td>入睡時間(分鐘)：</td>
                                <td><span id="c32">{(this.props.sot / 2).toFixed(1)}</span></td>
                            </tr>
                            <tr>
                                <td>睡眠第三期(%)：</td>
                                <td><span id="c33">{((this.props.n3 / (this.props.n1 + this.props.n2 + this.props.n3 + this.props.rem)) * 100).toFixed(1)}</span></td>
                                <td>睡眠效率(%)：</td>
                                <td><span id="c34">{(((this.props.epochNum - this.props.wake) /this.props.epochNum) * 100).toFixed(1)}</span></td>
                            </tr>
                            <tr>
                                <td>覺醒指數(/小時)：</td>
                                <td><span id="c35"></span></td>
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
                                <td width="30%"><span id="c36">{evn.OA}</span></td>
                                <td width="20%">總發生時間：</td>
                                <td width="30%"><span id="c37"></span></td>
                            </tr>
                            <tr>
                                <td>中樞型呼吸中止：</td>
                                <td><span id="c38">{evn.CA}</span></td>
                                <td>總發生時間：</td>
                                <td><span id="c39"></span></td>
                            </tr>
                            <tr>
                                <td>混和型呼吸中止：</td>
                                <td><span id="c40">{evn.MA}</span></td>
                                <td>總發生時間：</td>
                                <td><span id="c41"></span></td>
                            </tr>
                            <tr>
                                <td>淺呼吸：</td>
                                <td><span id="c42">{evn.OH}</span></td>
                                <td>總發生時間：</td>
                                <td><span id="c43"></span></td>
                            </tr>
                            <tr>
                                <td>最長的呼吸中止：</td>
                                <td><span id="c44"></span></td>
                                <td>最長的淺呼吸：</td>
                                <td><span id="c45"></span></td>
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
                                <td width="30%"><span id="c46"></span></td>
                                <td width="20%">血氧平均下降幅度：</td>
                                <td width="30%"><span id="c47"></span></td>
                            </tr>
                            <tr>
                                <td>最低氧氣飽和度：</td>
                                <td><span id="c48"></span></td>
                                <td>血氧下降總數：</td>
                                <td><span id="c49"></span></td>
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
                                <td width="30%"><span id="c50">{evn.SNORE}</span></td>
                                <td width="20%">打鼾指數 (/小時)：</td>
                                <td width="30%"><span id="c51">{((evn.SNORE) / ((this.props.epochNum - this.props.wake) / 2) * 60).toFixed(1)}</span></td>
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
        );
    }
}

export default CPart;