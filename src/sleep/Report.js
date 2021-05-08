import React from 'react';
import '../css/report.css';
//import {getAPI, postAPI} from './API.js';

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
            <div className="reportBlock">
                <input className = "reportTitle" type = "text" defaultValue = "國立成功大學附設醫院" />
                <input className = "reportTitle" type = "text" defaultValue = "多頻睡眠生理檢查報告" />
                <input className = "reportSubtitle" type = "text" defaultValue = "《依據2020年美國睡眠醫學學會判讀標準》" />
                <br/>
                <br/>

                {/*雙層div置中，寬度1000px對齊patient table寬度*/}
                <div style={{width:"100%"}}>
                    <div style={{width:"1000px", margin:"0px auto"}}>
                        <span>Patient Information: </span>
                        <span>Study Date: </span><input type="text"/>
                        <span>單號: </span><input type="text"/>
                    </div>
                </div>
                
                
                <div>
                    <table border="1" cellSpacing="0" cellPadding="0" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
                        <tbody>
                            <tr>
                                <td colSpan="4" width="20%">Name：</td>
                                <td colSpan="4" width="20%">Age：</td>
                                <td colSpan="4" width="20%">Patient ID：</td>
                                <td colSpan="4" width="20%">Sex：</td>
                                <td colSpan="4" width="20%">DOB：</td>
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
                                <td colSpan="5" width="25%">WHO(Phy/Psy)：</td>
                                <td colSpan="5" width="25%">BP(S)：</td>
                                <td colSpan="5" width="25%">BP(W)：</td>
                                <td colSpan="5" width="25%">Subjective sleep quality：</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </div>
        );
    }
}

export default Report;