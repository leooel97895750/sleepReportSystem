import React from 'react';
import '../css/diagnosis.css';
import Treatment from './Treatment';
import close from '../image/close.png';
import quill from '../image/quill.png';
import {postJsonAPI} from './functions/API.js';


class Diagnosis extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isDiagnosisBox: 'none',
            nowDisease: [],
            nowDiagnosis: "",
            nowTreatment: "",
            firstRender: 0,
        };
        this.diagnosisBox = this.diagnosisBox.bind(this);
        this.diagnosisBoxClose = this.diagnosisBoxClose.bind(this);
        this.insertToSelected = this.insertToSelected.bind(this);
        this.deleteFromSelected = this.deleteFromSelected.bind(this);
        this.deleteFromSelectedByTreatment = this.deleteFromSelectedByTreatment.bind(this);
    }

    // 當抓到資料庫的疾病陣列資料後渲染
    isNull(value){
        return value === null ? [] : value;
    }
    componentDidUpdate(){
        if(this.state.firstRender === 0 && this.isNull(this.props.reportData.DiseaseList).length !== 0){
            console.log(this.props.reportData.DiseaseList);
            let nowDisease = this.props.reportData.DiseaseList.split(',');
            this.setState({
                nowDisease: nowDisease,
                firstRender: 1,
            }, () => {
                let myDisease = document.getElementById("myDisease");
                for(let i=0; i<nowDisease.length; i++){
                    let number = nowDisease[i];
                    let option = document.createElement("option");
                    option.ondblclick = this.deleteFromSelected;
                    for(let j=0; j<document.getElementById('disease').childNodes.length; j++){
                        if(document.getElementById('disease').childNodes[j].value === number){
                            option.text = document.getElementById('disease').childNodes[j].text;
                        }
                    }
                    option.value = number;
                    myDisease.add(option);
                }
            });
        }
    }
    
    // 是否是該是null
    nullCheck(str){
        return str === "" ? null : str; 
    }
    
    // 當input欄位改變時更新資料庫
    databaseUpdate(e, key){
        let inputReportData = {
            FriedmanStage: this.nullCheck(document.getElementById("d1").value),
            TonsilSize: this.nullCheck(document.getElementById("d2").value),
            FriedmanTonguePosition: this.nullCheck(document.getElementById("d3").value),
            Technician: this.nullCheck(document.getElementById("d4").value),
            TechnicianDate: this.nullCheck(document.getElementById("d5").textContent),
            Physician: this.nullCheck(document.getElementById("d6").value),
            PhysicianDate: this.nullCheck(document.getElementById("d7").textContent),
            Comment: this.nullCheck(document.getElementById("comment").value),
            ExtraTreatment: this.nullCheck(document.getElementById("extraTreatment").value),
            DiseaseList: this.nullCheck(this.state.nowDisease.join()),
        };

        this.setState({inputReportData: inputReportData}, () => {
            // 更新資料庫
            inputReportData['RID'] = this.props.RID;
            let updateDiagnosisReport = "http://140.116.245.43:3000/updateDiagnosisReport";
            postJsonAPI(updateDiagnosisReport, inputReportData, (xhttp) => {
                console.log(xhttp.responseText);
            });
        });
    }

    diagnosisBox(){
        this.setState({isDiagnosisBox: 'block'});
    }
    diagnosisBoxClose(e){
        if(e.target.className === "diagnosisBackground" || e.target.className === "closeImg"){
            this.setState({isDiagnosisBox: 'none'});
        }
    }

    // 將選擇的疾病加入病歷中
    insertToSelected(){
        let diseaseList = document.getElementById("disease");
        let myDisease = document.getElementById("myDisease");
        let selectedDisease = diseaseList.selectedOptions;

        // 將選取的疾病加入Selected，並檢查有無重複
        let nowDisease = this.state.nowDisease;
        for(let i=0; i<selectedDisease.length; i++){
            let number = selectedDisease[i].value;
            if(nowDisease.includes(number)){
                alert("已經加入過\n" + selectedDisease[i].text);
            }
            else{
                nowDisease.push(number);
                let option = document.createElement("option");
                option.ondblclick = this.deleteFromSelected;
                option.text = selectedDisease[i].text;
                option.value = number;
                myDisease.add(option);
            }
        }
        this.setState({nowDisease: nowDisease}, () => {this.databaseUpdate()});
    }

    // 移除病歷
    deleteFromSelected(){
        let myDisease = document.getElementById("myDisease");
        let selectedDisease = myDisease.selectedOptions;

        // 將選取的疾病移出Selected
        let nowDisease = this.state.nowDisease;
        for(let i=selectedDisease.length-1; i>=0; i--){
            let number = selectedDisease[i].value;     
            nowDisease.splice(nowDisease.indexOf(number), 1);
            myDisease.remove(selectedDisease[i].index);
        }
        this.setState({nowDisease: nowDisease}, () => {this.databaseUpdate()});
    }

    // 由treatment移除病例
    deleteFromSelectedByTreatment(number){
        let myDisease = document.getElementById("myDisease");
        let nowDisease = this.state.nowDisease;  
        nowDisease.splice(nowDisease.indexOf(number), 1);
        for(let i=0; i<myDisease.length; i++){
            if(myDisease[i].value === number) myDisease.remove(i);
        }
        this.setState({nowDisease: nowDisease}, () => {this.databaseUpdate()});
    }

    // 自動填入技師日期(js月是0~11)
    technicianDate(){
        let tDate = document.getElementById("d5");
        let today = new Date();
        let month = today.getMonth() + 1;
        tDate.textContent = today.getFullYear() + '/' + month + '/' + today.getDate();
    }

    // 自動填入醫師日期
    physicianDate(){
        let pDate = document.getElementById("d7");
        let today = new Date();
        let month = today.getMonth() + 1;
        pDate.textContent = today.getFullYear() + '/' + month + '/' + today.getDate();
    }

    render(){

        const rpd = this.props.reportData;

        return(
            <div>
                {/* Findings and Comments */}
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
                                <td width="15%">
                                    <input id="d1" list="friedmanStage" className="myInput write" defaultValue={rpd.FriedmanStage} onChange={e => {this.databaseUpdate(e, 'FriedmanStage')}}/>
                                    <datalist id="friedmanStage">
                                        <option value="Ⅰ"/>
                                        <option value="Ⅱ"/>
                                        <option value="Ⅲ"/>
                                        <option value="Ⅳ"/>
                                        <option value="缺"/>
                                    </datalist>
                                </td>
                                <td width="15%">Tonsil size: </td>
                                <td width="10%">
                                    <input id="d2" list="tonsilSize" className="myInput write" defaultValue={rpd.TonsilSize} onChange={e => {this.databaseUpdate(e, 'TonsilSize')}}/>
                                    <datalist id="tonsilSize">
                                        <option value="0"/>
                                        <option value="1"/>
                                        <option value="2"/>
                                        <option value="3"/>
                                        <option value="4"/>
                                        <option value="缺"/>
                                    </datalist>
                                </td>
                                <td colSpan="2" width="25%">Friedman tongue position: </td>
                                <td width="15%">
                                    <input id="d3" list="friedmanTonguePosition" className="myInput write" defaultValue={rpd.FriedmanTonguePosition} onChange={e => {this.databaseUpdate(e, 'FriedmanTonguePosition')}}/>
                                    <datalist id="friedmanTonguePosition">
                                        <option value="Ⅰ"/>
                                        <option value="Ⅱa"/>
                                        <option value="Ⅱb"/>
                                        <option value="Ⅲ"/>
                                        <option value="Ⅳ"/>
                                        <option value="缺"/>
                                    </datalist>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="7"><textarea id="comment" defaultValue={rpd.Comment} onInput={e => {this.databaseUpdate(e, 'Comment')}} style={{width:"968px", height:"300px", padding:"10px", fontSize:"18px" ,fontFamily:"Times New Roman, DFKai-sb, sans-serif"}}/></td>
                            </tr>
                            <tr>
                                <td colSpan="4"></td>
                                <td width="15%">Technician: </td>
                                <td width="15%">
                                    <input id="d4" list="technician" className="myInput write" defaultValue={rpd.Technician} onChange={e => {this.technicianDate(); this.databaseUpdate(e, 'Technician')}}/>
                                    <datalist id="technician">
                                        <option value="林文貴"/>
                                        <option value="林麗真"/>
                                        <option value="林怡君"/>
                                        <option value="侯幸汝"/>
                                        <option value="廖芙欣"/>
                                    </datalist>
                                </td>
                                <td width="15%"><span id="d5">{rpd.TechnicianDate}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Diagnosis */}
                <br/>
                <div style={{width:"100%", fontSize:"20px"}}>
                    <div onClick={this.diagnosisBox} style={{width:"1000px", margin:"0px auto"}}>
                        <img src={quill} alt="diagnosis" style={{width:'30px', height:'30px', marginRight:'5px'}}/>
                        <span style={{fontWeight:"bold"}}>Diagnosis：</span>
                    </div>
                </div>
                <div style={{fontSize:"18px", fontWeight:"500"}}>
                    <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
                        <tbody>
                            <tr>
                                <td colSpan="4"><textarea id="diagnosisTextarea" style={{width:"968px", height:"300px", padding:"10px", fontSize:"18px", fontFamily:"Times New Roman, DFKai-sb, sans-serif"}}/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* diagnosis box */}
                <div className="diagnosisBackground" style={{display: this.state.isDiagnosisBox}} onClick={this.diagnosisBoxClose}>
                    <div className="diagnosisBox">
                        <img className="closeImg" src={close} alt="close" onClick={this.diagnosisBoxClose} style={{zIndex:'10', position:'absolute', right:'10px', top:'10px', width:'28px', height:'28px', opacity:'0.7'}}/>
                        {/* 左框 */}
                        <div style={{textAlign:'center', position:'absolute'}}>
                            <b style={{fontSize:'18px'}}>Disease list</b>
                            <div className="diseaseListBlock">
                                <select className="diseaseList" id="disease" name="disease" multiple>
                                    <option value="1" onDoubleClick={this.insertToSelected}>Sleep-disordered breathing (G47.8)</option>
                                    <option value="2" onDoubleClick={this.insertToSelected}>Snoring (R06.83)</option>
                                    <option value="3" onDoubleClick={this.insertToSelected}>Obstructive Sleep hypopnea (G47.33)</option>
                                    <option value="4" onDoubleClick={this.insertToSelected}>Obstructive Sleep apnea hypopnea (G47.33)</option>
                                    <option value="5" onDoubleClick={this.insertToSelected}>Mixed sleep hypopnea (G47.33, G47.37)</option>
                                    <option value="6" onDoubleClick={this.insertToSelected}>Mixed sleep apnea hypopnea (G47.33, G47.37)</option>
                                    <option value="7" onDoubleClick={this.insertToSelected}>Central sleep hypopnea (G47.37)</option>
                                    <option value="8" onDoubleClick={this.insertToSelected}>Central sleep apnea hypopnea (G47.37)</option>
                                    <option value="9" onDoubleClick={this.insertToSelected}>Obstructive sleep hypopnea, treated (G47.33)</option>
                                    <option value="10" onDoubleClick={this.insertToSelected}>Obstructive sleep apnea hypopnea, treated (G47.33)</option>
                                    <option value="11" onDoubleClick={this.insertToSelected}>Mixed sleep apnea hypopnea, treated (G47.33, G47.37)</option>
                                    <option value="12" onDoubleClick={this.insertToSelected}>Poor sleep efficiency (G47.8)</option>
                                    <option value="13" onDoubleClick={this.insertToSelected}>Under treatment of CPAP</option>
                                    <option value="14" onDoubleClick={this.insertToSelected}>Under treatment of oral appliance</option>
                                    <option value="15" onDoubleClick={this.insertToSelected}>Treatment of myofunctional therapy</option>
                                    <option value="16" onDoubleClick={this.insertToSelected}>Treatment of body-weight control</option>
                                    <option value="17" onDoubleClick={this.insertToSelected}>Suspect periodic limb movement (G47.61)</option>
                                    <option value="18" onDoubleClick={this.insertToSelected}>Periodic limb movement (G47.61)</option>
                                    <option value="19" onDoubleClick={this.insertToSelected}>Suspect autonomic dysfunction (F41.9)</option>
                                    <option value="20" onDoubleClick={this.insertToSelected}>Suspect poor quality of life</option>
                                    <option value="21" onDoubleClick={this.insertToSelected}>Suspect tinnitus (H93.19)</option>
                                    <option value="22" onDoubleClick={this.insertToSelected}>Suspect Gastro-Esophageal reflux disease (GERD)(K21.0)</option>
                                    <option value="23" onDoubleClick={this.insertToSelected}>Suspect cardiac arrhythmia (I49.9)</option>
                                    <option value="24" onDoubleClick={this.insertToSelected}>Suspect bruxism (G47.63)</option>
                                    <option value="25" onDoubleClick={this.insertToSelected}>Alpha sleep</option>
                                    <option value="26" onDoubleClick={this.insertToSelected}>Suspect REM behavior disorder (G47.52)</option>
                                    <option value="27" onDoubleClick={this.insertToSelected}>Suspect REM behavior disorder, provisionally (G47.52)</option>
                                    <option value="28" onDoubleClick={this.insertToSelected}>SubClinical REM behavior disorder (G47.52)</option>
                                    <option value="29" onDoubleClick={this.insertToSelected}>Suspect idiopathic REM behavior disorder (G47.52)</option>
                                    <option value="30" onDoubleClick={this.insertToSelected}>Suspect nocturia (R35.1)</option>
                                    <option value="31" onDoubleClick={this.insertToSelected}>Sleep related groaning (G47.8)</option>
                                    <option value="32" onDoubleClick={this.insertToSelected}>Suspect disorder of arousal from NREM Sleep</option>
                                    <option value="33" onDoubleClick={this.insertToSelected}>Suspected sleep-related hypoventilation disorder (G47.36)</option>
                                    <option value="34" onDoubleClick={this.insertToSelected}>Suspect Cheyne-Stokes Breathing</option>
                                </select>
                            </div>
                            <div className="insertBlock">
                                <label>
                                    <span style={{fontSize:'20px', color:'white'}}>Insert</span>
                                    <button 
                                        onClick = {this.insertToSelected}
                                        style = {{display: 'none'}}
                                    />
                                </label>
                            </div>
                        </div>

                        {/* 右框 */}
                        <div style={{textAlign:'center', position:'absolute', right:'30px'}}>
                            <b style={{fontSize:'18px'}}>Selected diseases</b>
                            <div className="diseaseListBlock">
                                <select className="diseaseList" id="myDisease" name="myDisease" multiple>
                                    
                                </select>
                            </div>
                            <div className="deleteBlock">
                                <label>
                                    <span style={{fontSize:'20px', color:'white'}}>Delete</span>
                                    <button 
                                        onClick = {this.deleteFromSelected}
                                        style = {{display: 'none'}}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Suggestive Treatment and Planning */}
                <br/>
                <div style={{width:"100%", fontSize:"20px"}}>
                    <div onClick={this.diagnosisBox} style={{width:"1000px", margin:"0px auto"}}>
                        <img src={quill} alt="diagnosis" style={{width:'30px', height:'30px', marginRight:'5px'}}/>
                        <span style={{fontWeight:"bold"}}>Suggestive Treatment and Planning：</span>
                    </div>
                </div>
                <div style={{fontSize:"18px", fontWeight:"500"}}>
                    <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
                        <tbody>
                            <tr>
                                <td colSpan="4">
                                    <Treatment
                                        deleteFromSelectedByTreatment = {this.deleteFromSelectedByTreatment}
                                        nowDisease = {this.state.nowDisease}
                                        age = {this.props.age}
                                        AHI = {this.props.AHI}
                                        awakeTime = {this.props.awakeTime}
                                        sleepLatency = {this.props.sleepLatency}
                                        totalSleepTime = {this.props.totalSleepTime}
                                        SE = {this.props.SE}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4"><textarea id="extraTreatment" defaultValue={rpd.ExtraTreatment} onInput={e => {this.databaseUpdate(e, 'ExtraTreatment')}} placeholder="額外補充..." style={{width:"968px", height:"100px", padding:"10px", fontSize:"18px" ,fontFamily:"Times New Roman, DFKai-sb, sans-serif"}}/></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td width="15%">Physician: </td>
                                <td width="15%">
                                    <input id="d6" list="physician" className="myInput write" defaultValue={rpd.Physician} onChange={e => {this.physicianDate(); this.databaseUpdate(e, 'Physician')}}/>
                                    <datalist id="physician">
                                        <option value="林政佑 醫師"/>
                                        <option value="張展旗 醫師"/>
                                        <option value="蘇柏嵐 醫師"/>
                                        <option value="廖信閔 醫師"/>
                                        <option value="呂宗樺 醫師"/>
                                        <option value="洪煒斌 醫師"/>
                                        <option value="陳致嘉 醫師"/>
                                        <option value="鄭翔如 醫師"/>
                                    </datalist>
                                </td>
                                <td width="15%"><span id="d7">{rpd.PhysicianDate}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Diagnosis;