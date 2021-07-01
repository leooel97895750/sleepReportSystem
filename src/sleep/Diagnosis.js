import React from 'react';
import '../css/diagnosis.css';
import close from '../image/close.png';
import quill from '../image/quill.png';


class Diagnosis extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isDiagnosisBox: 'none',
            nowDisease: [],
        };
        this.diagnosisBox = this.diagnosisBox.bind(this);
        this.diagnosisBoxClose = this.diagnosisBoxClose.bind(this);
        this.insertToSelected = this.insertToSelected.bind(this);
        this.deleteFromSelected = this.deleteFromSelected.bind(this);
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
                var option = document.createElement("option");
                option.ondblclick = this.deleteFromSelected;
                option.text = selectedDisease[i].text;
                option.value = number;
                myDisease.add(option);
            }
        }
        this.setState({
            nowDisease: nowDisease,
        });
        // 重洗textarea
        this.insertToReport();
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
        this.setState({
            nowDisease: nowDisease,
        });
        // 重洗textarea
        this.insertToReport();
    }

    ageAHIcondition(dText, changeLine, str1, str2, str3, str4){
        if(this.props.age < 12){
            if(this.props.AHI <= 1) alert(str1);
            else if(this.props.AHI <= 5) dText.value = dText.value + changeLine + str2;
            else if(this.props.AHI <= 10) dText.value = dText.value + changeLine + str3;
            else dText.value = dText.value + changeLine + str4;
        }
        else{
            if(this.props.AHI <= 5) alert(str1);
            else if(this.props.AHI <= 15) dText.value = dText.value + changeLine + str2;
            else if(this.props.AHI <= 30) dText.value = dText.value + changeLine + str3;
            else dText.value = dText.value + changeLine + str4;
        }
    }
    // 將疾病程度與診斷內容依nowDisease加入報告或移除報告
    insertToReport(){
        
        let nowDisease = this.state.nowDisease;
        let dText = document.getElementById("diagnosisTextarea");
        dText.value = "";

        // 加入Diagnosis
        // 加入Suggestive Treatment and Planning
        for(let i=0; i<nowDisease.length; i++){
            let number = nowDisease[i];
            let changeLine = (dText.value === "") ? "" : "\n";

            // Sleep-disordered breathing (G47.8)
            if(number === "1"){
                dText.value = dText.value + changeLine + "Sleep-disordered breathing (G47.8).";
            } 
            // Snoring (R06.83)
            else if(number === "2"){
                dText.value = dText.value + changeLine + "Snoring (R06.83).";
            } 
            // Obstructive sleep hypopnea (G47.33)
            else if(number === "3"){
                this.ageAHIcondition(
                    dText, changeLine,
                    "AHI為正常值，無Obstructive sleep hypopnea (G47.33).", 
                    "Obstructive sleep hypopnea (Mild) (G47.33).", 
                    "Obstructive sleep hypopnea (Moderate) (G47.33).", 
                    "Obstructive sleep hypopnea (Severe) (G47.33)."
                );
            }
            // Obstructive sleep apnea hypopnea (G47.33)
            else if(number === "4"){
                this.ageAHIcondition(
                    dText, changeLine,
                    "AHI為正常值，無Obstructive sleep apnea hypopnea (G47.33).",
                    "Obstructive sleep apnea hypopnea (Mild) (G47.33).",
                    "Obstructive sleep apnea hypopnea (Moderate) (G47.33).",
                    "Obstructive sleep apnea hypopnea (Severe) (G47.33)."
                );
            }
            // Mixed sleep hypopnea (G47.33, G47.37)
            else if(number === "5"){
                this.ageAHIcondition(
                    dText, changeLine,
                    "AHI為正常值，無Mixed sleep hypopnea (G47.33, G47.37).",
                    "Mixed sleep hypopnea (Mild) (G47.33, G47.37).",
                    "Mixed sleep hypopnea (Moderate) (G47.33, G47.37).",
                    "Mixed sleep hypopnea (Severe) (G47.33, G47.37)."
                );
            }
            // Mixed sleep apnea hypopnea (G47.33, G47.37)
            else if(number === "6"){
                this.ageAHIcondition(
                    dText, changeLine,
                    "AHI為正常值，無Mixed sleep apnea hypopnea (G47.33, G47.37).",
                    "Mixed sleep apnea hypopnea (Mild) (G47.33, G47.37).",
                    "Mixed sleep apnea hypopnea (Moderate) (G47.33, G47.37).",
                    "Mixed sleep apnea hypopnea (Severe) (G47.33, G47.37)."
                );
            }
            // Central sleep hypopnea (G47.37)
            else if(number === "7"){
                this.ageAHIcondition(
                    dText, changeLine,
                    "AHI為正常值，無Central sleep hypopnea (G47.37).",
                    "Central sleep hypopnea (Mild) (G47.37).",
                    "Central sleep hypopnea (Moderate) (G47.37).",
                    "Central sleep hypopnea (Severe) (G47.37)."
                );
            }
            // Central sleep apnea hypopnea (G47.37)
            else if(number === "8"){
                this.ageAHIcondition(
                    dText, changeLine,
                    "AHI為正常值，無Central sleep apnea hypopnea (G47.37).",
                    "Central sleep apnea hypopnea (Mild) (G47.37).",
                    "Central sleep apnea hypopnea (Moderate) (G47.37).",
                    "Central sleep apnea hypopnea (Severe) (G47.37)."
                );
            }
            // Obstructive sleep hypopnea, treated (G47.33)
            else if(number === "9"){
                this.ageAHIcondition(
                    dText, changeLine,
                    "AHI為正常值，無Obstructive sleep hypopnea, treated (G47.33).",
                    "Obstructive sleep hypopnea, treated (Mild) (G47.33).",
                    "Obstructive sleep hypopnea, treated (Moderate) (G47.33).",
                    "Obstructive sleep hypopnea, treated (Severe) (G47.33)."
                );
            }
            // Obstructive sleep apnea hypopnea, treated (G47.33)
            else if(number === "10"){
                this.ageAHIcondition(
                    dText, changeLine,
                    "AHI為正常值，無Obstructive sleep apnea hypopnea, treated (G47.33).",
                    "Obstructive sleep apnea hypopnea, treated (Mild) (G47.33).",
                    "Obstructive sleep apnea hypopnea, treated (Moderate) (G47.33).",
                    "Obstructive sleep apnea hypopnea, treated (Severe) (G47.33)."
                );
            }
            // Mixed sleep apnea hypopnea, treated (G47.33, G47.37)
            else if(number === "11"){
                this.ageAHIcondition(
                    dText, changeLine,
                    "AHI為正常值，無Mixed sleep apnea hypopnea, treated (Mild) (G47.33, G47.37).",
                    "Mixed sleep apnea hypopnea, treated (Mild) (G47.33, G47.37).",
                    "Mixed sleep apnea hypopnea, treated (Moderate) (G47.33, G47.37).",
                    "Mixed sleep apnea hypopnea, treated (Severe) (G47.33, G47.37)."
                );
            }
            // Poor sleep efficiency (G47.8)
            else if(number === "12"){
                dText.value = dText.value + changeLine + "Poor sleep efficiency (G47.8).";
            }
            // Under treatment of CPAP
            else if(number === "13"){
                dText.value = dText.value + changeLine + "Under treatment of CPAP.";
            }
            // Under treatment of oral appliance
            else if(number === "14"){
                dText.value = dText.value + changeLine + "Under treatment of oral appliance.";
            }
            // Treatment of myofunctional therapy
            else if(number === "15"){
                dText.value = dText.value + changeLine + "Treatment of myofunctional therapy.";
            }
            // Treatment of body-weight control
            else if(number === "16"){
                dText.value = dText.value + changeLine + "Treatment of body-weight control.";
            }
            // Suspect periodic limb movement (G47.61)
            else if(number === "17"){
                dText.value = dText.value + changeLine + "Suspect periodic limb movement (G47.61).";
            }
            // Periodic limb movement (G47.61)
            else if(number === "18"){
                dText.value = dText.value + changeLine + "Periodic limb movement (G47.61).";
            }
            // Suspect autonomic dysfunction (F41.9)
            else if(number === "19"){
                dText.value = dText.value + changeLine + "Suspect autonomic dysfunction (F41.9).";
            }
            // Suspect poor quality of life
            else if(number === "20"){
                dText.value = dText.value + changeLine + "Suspect poor quality of life.";
            }
            // Suspect tinnitus (H93.19)
            else if(number === "21"){
                dText.value = dText.value + changeLine + "Suspect tinnitus (H93.19).";
            }
            // Suspect Gastro-Esophageal reflux disease (GERD) (K21.0)
            else if(number === "22"){
                dText.value = dText.value + changeLine + "Suspect Gastro-Esophageal reflux disease (GERD) (K21.0).";
            }
            // Suspect cardiac arrhythmia (I49.9)
            else if(number === "23"){
                dText.value = dText.value + changeLine + "Suspect cardiac arrhythmia (I49.9).";
            }
            // Sleep bruxism (G47.63)
            else if(number === "24"){
                dText.value = dText.value + changeLine + "Sleep bruxism (G47.63).";
            }
            // Alpha sleep
            else if(number === "25"){
                dText.value = dText.value + changeLine + "Alpha sleep.";
            }
            // Suspect REM behavior disorder (G47.52)
            else if(number === "26"){
                dText.value = dText.value + changeLine + "Suspect REM behavior disorder (G47.52).";
            }
            // Suspect REM behavior disorder, provisionally (G47.52)
            else if(number === "27"){
                dText.value = dText.value + changeLine + "Suspect REM behavior disorder, provisionally (G47.52).";
            }
            // Subclinical REM behavior disorder (G47.52)
            else if(number === "28"){
                dText.value = dText.value + changeLine + "Subclinical REM behavior disorder (G47.52).";
            }
            // Suspect idiopathic REM behavior disorder (G47.52)
            else if(number === "29"){
                dText.value = dText.value + changeLine + "Suspect idiopathic REM behavior disorder (G47.52).";
            }
            // Suspect nocturia (R35.1)
            else if(number === "30"){
                dText.value = dText.value + changeLine + "Suspect nocturia (R35.1).";
            }
            // Sleep related groaning (G47.8)
            else if(number === "31"){
                dText.value = dText.value + changeLine + "Sleep related groaning (G47.8).";
            }
            // Suspect disorder of arousal from NREM Sleep
            else if(number === "32"){
                dText.value = dText.value + changeLine + "Suspect disorder of arousal from NREM Sleep.";
            }
            // Suspected sleep-related hypoventilation disorder (G47.36)
            else if(number === "33"){
                dText.value = dText.value + changeLine + "Suspected sleep-related hypoventilation disorder (G47.36).";
            }
            // Suspect Cheyne-Stokes Breathing
            else if(number === "34"){
                dText.value = dText.value + changeLine + "Suspect Cheyne-Stokes Breathing.";
            }
        }
    }

    render(){
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
                                <td width="15%"><input className="myInput"/></td>
                                <td width="15%">Tonsil size: </td>
                                <td width="10%"><input className="myInput"/></td>
                                <td colSpan="2" width="25%">Friedman tongue position: </td>
                                <td width="15%"><input className="myInput"/></td>
                            </tr>
                            <tr>
                                <td colSpan="7"><textarea style={{width:"968px", height:"300px", padding:"10px"}}/></td>
                            </tr>
                            <tr>
                                <td colSpan="4"></td>
                                <td width="15%">Technician: </td>
                                <td width="15%"><input className="myInput"/></td>
                                <td width="15%"><input className="myInput"/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Diagnosis */}
                <br/>
                <div style={{width:"100%", fontSize:"20px"}}>
                    <div style={{width:"1000px", margin:"0px auto"}}>
                        <img src={quill} alt="diagnosis" onClick={this.diagnosisBox} style={{width:'30px', height:'30px', marginRight:'5px'}}/>
                        <span style={{fontWeight:"bold"}}>Diagnosis：</span>
                    </div>
                </div>
                <div style={{fontSize:"18px", fontWeight:"500"}}>
                    <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
                        <tbody>
                            <tr>
                                <td colSpan="4"><textarea id="diagnosisTextarea" style={{width:"968px", height:"300px", padding:"10px", fontSize:"16px"}}/></td>
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
                                    <option value="14" onDoubleClick={this.insertToSelected}>Under treatment od oral appliance</option>
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
                    <div style={{width:"1000px", margin:"0px auto"}}>
                        <img src={quill} alt="diagnosis" onClick={this.diagnosisBox} style={{width:'30px', height:'30px', marginRight:'5px'}}/>
                        <span style={{fontWeight:"bold"}}>Suggestive Treatment and Planning：</span>
                    </div>
                </div>
                <div style={{fontSize:"18px", fontWeight:"500"}}>
                    <table border="1" cellSpacing="0" cellPadding="3" style={{marginLeft:"auto", marginRight:"auto", width:"1000px"}}>
                        <tbody>
                            <tr>
                                <td colSpan="4"><textarea style={{width:"968px", height:"300px", padding:"10px", fontSize:"20px"}}/></td>
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
            </div>
        );
    }
}

export default Diagnosis;