import React from 'react';
import '../css/diagnosis.css';
import close from '../image/close.png';


class Diagnosis extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isDiagnosisBox: 'none',
        };
        this.diagnosisBox = this.diagnosisBox.bind(this);
        this.diagnosisBoxClose = this.diagnosisBoxClose.bind(this);
    }
        
    diagnosisBox(){
        this.setState({isDiagnosisBox: 'block'});
    }
    diagnosisBoxClose(e){
        if(e.target.className === "diagnosisBackground" || e.target.className === "closeImg"){
            this.setState({isDiagnosisBox: 'none'});
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
                        <span style={{fontWeight:"bold"}}>Diagnosis：</span>
                    </div>
                </div>
                <div style={{fontSize:"18px", fontWeight:"500"}} onClick={this.diagnosisBox}>
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
                        <img className="closeImg" src={close} onClick={this.diagnosisBoxClose} style={{zIndex:'10', position:'absolute', right:'0px', top:'0px', width:'28px', height:'28px', opacity:'0.7'}}/>
                        <div style={{textAlign:'center', position:'absolute'}}>
                            <b style={{fontSize:'18px'}}>Disease list</b>
                            <div className="diseaseListBlock">
                                <ul className="diseaseList">
                                    <li>Sleep-disordered breathing (G47.8)</li>
                                    <li>Primary snoring (R06.83)</li>
                                    <li>Obstructive Sleep hypopnea (G47.33)</li>
                                    <li>Obstructive Sleep apnea hypopnea (G47.33)</li>
                                    <li>Mixed sleep hypopnea (G47.33, G47.37)</li>
                                    <li>Mixed sleep apnea hypopnea (G47.33, G47.37)</li>
                                    <li>Central sleep hypopnea (G47.37)</li>
                                    <li>Central sleep apnea hypopnea (G47.37)</li>
                                    <li>Obstructive sleep hypopnea, treated (G47.33)</li>
                                    <li>Obstructive sleep apnea hypopnea, treated (G47.33)</li>
                                    <li>Mixed sleep apnea hypopnea, treated (G47.33, G47.37)</li>
                                    <li>Poor sleep efficiency (G47.8)</li>
                                    <li>Under treatment of CPAP</li>
                                    <li>Under treatment od oral appliance</li>
                                    <li>Treatment of myofunctional therapy</li>
                                    <li>Treatment of body-weight control</li>
                                    <li>Suspect periodic limb movement (G47.61)</li>
                                    <li>Periodic limb movement (G47.61)</li>
                                    <li>Suspect autonomic dysfunction (F41.9)</li>
                                    <li>Suspect poor quality of life</li>
                                    <li>Suspect tinnitus (H93.19)</li>
                                    <li>Suspect Gastro-Esophageal reflux disease (GERD)(K21.0)</li>
                                    <li>Suspect bruxism (G47.63)</li>
                                    <li>Alpha sleep</li>
                                    <li>Suspect REM behavior disorder (G47.52)</li>
                                    <li>Suspect REM behavior disorder, provisionally (G47.52)</li>
                                    <li>SubClinical REM behavior disorder (G47.52)</li>
                                    <li>Suspect sleep enuresis (G47.8)</li>
                                    <li>Sleep related groaning (G47.8)</li>
                                    <li>Suspect disorder of arousal from NREM Sleep</li>
                                    <li>Suspected sleep-related hypoventilation disorder (G47.36)</li>
                                    <li>Suspect Cheyne-Stokes Breathing</li>
                                </ul>
                            </div>
                        </div>
                        <div style={{textAlign:'center', position:'absolute', right:'10px'}}>
                            <b style={{fontSize:'18px'}}>Selected diseases</b>
                            <div className="diseaseListBlock">
                                <ul className="diseaseList">
                                    
                                </ul>
                            </div>
                        </div>
                        <div className="insertBlock">
                            <label>
                                <span style={{fontSize:'20px', color:'white'}}>Insert</span>
                                <button 
                                    
                                    style = {{display: 'none'}}
                                />
                            </label>
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

                {/* Suggestive Treatment and Planning */}
                <br/>
                <div style={{width:"100%", fontSize:"20px"}}>
                    <div style={{width:"1000px", margin:"0px auto"}}>
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