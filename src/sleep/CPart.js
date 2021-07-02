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
                            <span>{this.props.cfg.startDate}</span>
                            
                        </div>
                    </div>
                </div>
                
                
                <div style={{fontSize:"18px", fontWeight:"500"}}>
                    <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px", whiteSpace: "nowrap"}}>
                        <tbody>
                            <tr>
                                <td width="20%">姓名：<span>{this.props.cfg.name}</span></td>
                                <td width="20%">年齡：<span>{this.props.cfg.age}</span></td>
                                <td width="20%">病歷號：<span>{this.props.cfg.patientID}</span></td>
                                <td width="20%">性別：<span>{this.props.cfg.sex === 'Male'?'男':'女'}</span></td>
                                <td width="20%">生日：<span>{this.props.cfg.dob}</span></td>
                            </tr>
                            <tr>
                                <td>身高：<span>{this.props.cfg.height}</span></td>
                                <td>體重：<span>{this.props.cfg.weight}</span></td>
                                <td>體質量指數：<span>{this.props.cfg.bmi}</span></td>
                                <td>頸圍：<span>{this.props.cfg.neck}</span></td>
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
                        <span>開始記錄時間 {this.props.cfg.startTime} ; 結束紀錄時間 {this.props.cfg.endTime}</span>
                    </div>
                </div>

                <div style={{fontSize:"18px", fontWeight:"500"}}>
                    <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
                        <tbody>
                            <tr>
                                <td width="20%">全部記錄時間(分鐘)：</td>
                                <td width="30%"><span>{this.props.cfg.totalRecordTime}</span></td>
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
        );
    }
}

export default CPart;