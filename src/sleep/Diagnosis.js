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

        console.log(diseaseList.selectedOptions);
        let selectedDisease = diseaseList.selectedOptions;

        let nowDisease = this.state.nowDisease;
        for(let i=0; i<selectedDisease.length; i++){
            if(nowDisease.includes(selectedDisease[i].value)){
                alert("已經加入過\n" + selectedDisease[i].text);
            }
            else{
                nowDisease.push(selectedDisease[i].value);
                var option = document.createElement("option");
                option.text = selectedDisease[i].text;
                option.value = selectedDisease[i].value;
                myDisease.add(option);
            }
        }
        this.setState({
            nowDisease: nowDisease,
        });
    }

    // 將疾病程度與診斷內容加入報告中
    insertToReport(){

    }

    // 移除病歷
    deleteFromSelected(){

    }

    // 將疾病程度與診斷內容從報告中移除
    deleteFromReport(){

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
                                <td colSpan="4"><textarea style={{width:"968px", height:"300px", padding:"10px"}}/></td>
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
                                    <option value="2" onDoubleClick={this.insertToSelected}>Primary snoring (R06.83)</option>
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
                                    <option value="23" onDoubleClick={this.insertToSelected}>Suspect bruxism (G47.63)</option>
                                    <option value="24" onDoubleClick={this.insertToSelected}>Alpha sleep</option>
                                    <option value="25" onDoubleClick={this.insertToSelected}>Suspect REM behavior disorder (G47.52)</option>
                                    <option value="26" onDoubleClick={this.insertToSelected}>Suspect REM behavior disorder, provisionally (G47.52)</option>
                                    <option value="27" onDoubleClick={this.insertToSelected}>SubClinical REM behavior disorder (G47.52)</option>
                                    <option value="28" onDoubleClick={this.insertToSelected}>Suspect sleep enuresis (G47.8)</option>
                                    <option value="29" onDoubleClick={this.insertToSelected}>Sleep related groaning (G47.8)</option>
                                    <option value="30" onDoubleClick={this.insertToSelected}>Suspect disorder of arousal from NREM Sleep</option>
                                    <option value="31" onDoubleClick={this.insertToSelected}>Suspected sleep-related hypoventilation disorder (G47.36)</option>
                                    <option value="32" onDoubleClick={this.insertToSelected}>Suspect Cheyne-Stokes Breathing</option>
                                </select>
                            </div>
                            <div className="insertBlock">
                                <label>
                                    <span style={{fontSize:'20px', color:'white'}}>Insert</span>
                                    <button 
                                        onClick={this.insertToSelected}
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
                                <td colSpan="4"><textarea style={{width:"968px", height:"300px", padding:"10px"}}/></td>
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