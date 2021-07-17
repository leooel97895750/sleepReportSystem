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

        const rpd = this.props.reportData;

        return(
            <div>
                {/* 基本資料 */}
                <div style={{width:"100%", fontSize:"20px"}}>
                    <div style={{width:"1000px", margin:"0px auto"}}>
                        <span style={{fontWeight:"bold"}}>基本資料：</span>
                        <div style={{float:"right"}}>
                            <span style={{fontWeight:"bold", marginLeft:"20px"}}>紀錄時間: </span>
                            <span id="c1">{rpd.StudyDate}</span>
                        </div>
                    </div>
                </div>
                
                
                <div style={{fontSize:"18px", fontWeight:"500"}}>
                    <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px", whiteSpace: "nowrap"}}>
                        <tbody>
                            <tr>
                                <td width="20%">姓名：<span id="c2">{rpd.Name}</span></td>
                                <td width="20%">年齡：<span id="c3">{rpd.Age}</span></td>
                                <td width="20%">病歷號：<span id="c4">{rpd.CaseID}</span></td>
                                <td width="20%">性別：<span id="c5">{rpd.Sex === 'Male' ? '男' : '女'}</span></td>
                                <td width="20%">生日：<span id="c6">{rpd.DOB}</span></td>
                            </tr>
                            <tr>
                                <td>身高：<span id="c7">{rpd.Height}</span></td>
                                <td>體重：<span id="c8">{rpd.Weight}</span></td>
                                <td>體質量指數：<span id="c9">{rpd.BMI}</span></td>
                                <td>頸圍：<span id="c10">{rpd.Neck}</span></td>
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
                                <td colSpan="2" width="40%">呼吸中止和淺呼吸指數：<span id="c13">{rpd.AHI}</span></td>
                                <td colSpan="2" width="30%">呼吸中止指數：<span id="c14">{rpd.AI}</span></td>
                                <td colSpan="2" width="30%">淺呼吸指數：<span id="c15">{rpd.HI}</span></td>
                            </tr>
                            <tr>
                                <td colSpan="2">阻塞型呼吸中止指數：<span id="c16">{rpd.OA}</span></td>
                                <td colSpan="2">中樞型呼吸中止指數：<span id="c17">{rpd.CA}</span></td>
                                <td colSpan="2">混和型呼吸中止指數：<span id="c18">{rpd.MA}</span></td>                           
                            </tr>
                            <tr>
                                <td colSpan="6">呼吸中止和淺呼吸指數(快速動眼期/非快速動眼期)：<span id="c19">{rpd.AHI_REM}</span>/小時 / <span id="c20">{rpd.AHI_NREM}</span>/小時</td>
                            </tr>
                            <tr>
                                <td colSpan="6">呼吸中止和淺呼吸指數(平躺/非平躺)：<span id="c21">{rpd.AHI_Supine}</span>/小時 / <span id="c22">{rpd.AHI_NSupine}</span>/小時</td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                {/* 睡眠分期 */}
                <br/>
                <div style={{width:"100%", fontSize:"20px"}}>
                    <div style={{width:"1000px", margin:"0px auto"}}>
                        <span style={{fontWeight:"bold"}}>睡眠分期：</span>
                        <span>開始記錄時間 <span id="c23">{rpd.StartTime}</span> ; 結束紀錄時間 <span id="c24">{rpd.EndTime}</span></span>
                    </div>
                </div>

                <div style={{fontSize:"18px", fontWeight:"500"}}>
                    <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
                        <tbody>
                            <tr>
                                <td width="20%">全部記錄時間(分鐘)：</td>
                                <td width="30%"><span id="c25">{rpd.TotalRecordTime}</span></td>
                                <td width="20%">睡眠時間(分鐘)：</td>
                                <td width="30%"><span id="c26">{rpd.TotalSleepPeriod}</span></td>
                            </tr>
                            <tr>
                                <td>全部睡眠時間(分鐘)：</td>
                                <td><span id="c27">{rpd.TotalSleepTime}</span></td>
                                <td>清醒時間(分鐘)：</td>
                                <td><span id="c28">{rpd.AwakeTime}</span></td>
                            </tr>
                            <tr>
                                <td>睡眠第一期(%)：</td>
                                <td><span id="c29">{rpd.Stage1}</span></td>
                                <td>快速動眼期(%)：</td>
                                <td><span id="c30">{rpd.REM}</span></td>
                            </tr>
                            <tr>
                                <td>睡眠第二期(%)：</td>
                                <td><span id="c31">{rpd.Stage2}</span></td>
                                <td>入睡時間(分鐘)：</td>
                                <td><span id="c32">{rpd.SleepLatency}</span></td>
                            </tr>
                            <tr>
                                <td>睡眠第三期(%)：</td>
                                <td><span id="c33">{rpd.Stage3}</span></td>
                                <td>睡眠效率(%)：</td>
                                <td><span id="c34">{rpd.Efficiency}</span></td>
                            </tr>
                            <tr>
                                <td>覺醒指數(/小時)：</td>
                                <td><span id="c35">{rpd.ArousalIndex}</span></td>
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
                                <td width="30%"><span id="c36">{rpd.OA}</span></td>
                                <td width="20%">總發生時間：</td>
                                <td width="30%"><span id="c37">{rpd.OAT}</span></td>
                            </tr>
                            <tr>
                                <td>中樞型呼吸中止：</td>
                                <td><span id="c38">{rpd.CA}</span></td>
                                <td>總發生時間：</td>
                                <td><span id="c39">{rpd.CAT}</span></td>
                            </tr>
                            <tr>
                                <td>混和型呼吸中止：</td>
                                <td><span id="c40">{rpd.MA}</span></td>
                                <td>總發生時間：</td>
                                <td><span id="c41">{rpd.MAT}</span></td>
                            </tr>
                            <tr>
                                <td>淺呼吸：</td>
                                <td><span id="c42">{rpd.HA}</span></td>
                                <td>總發生時間：</td>
                                <td><span id="c43">{rpd.HAT}</span></td>
                            </tr>
                            <tr>
                                <td>最長的呼吸中止：</td>
                                <td><span id="c44">{rpd.LA}</span></td>
                                <td>最長的淺呼吸：</td>
                                <td><span id="c45">{rpd.LH}</span></td>
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
                                <td width="30%"><span id="c46">{rpd.MeanSpO2}</span></td>
                                <td width="20%">血氧平均下降幅度：</td>
                                <td width="30%"><span id="c47">{rpd.MeanDesat}</span></td>
                            </tr>
                            <tr>
                                <td>最低氧氣飽和度：</td>
                                <td><span id="c48">{rpd.MinSpO2}</span></td>
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
                                <td width="30%"><span id="c50">{rpd.Snore}</span></td>
                                <td width="20%">打鼾指數 (/小時)：</td>
                                <td width="30%"><span id="c51">{rpd.SnoreIndex}</span></td>
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