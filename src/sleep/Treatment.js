import React from 'react';
import ContentEditable from 'react-contenteditable'
import '../css/treatment.css';

class Treatment extends React.Component{
    constructor(props){
        super(props);
        this.contentEditable = React.createRef();
        this.state = {
            // html: "",
            htmltext: "",
            diseaseLength: 0,
        };
    }

    // 根據age AHI來給予相對應的嚴重程度與治療手段 c:兒童、a:成人、0~3為嚴重程度
    ageAHIcondition(){
        if(this.props.age <= 12){
            if(this.props.AHI <= 1) return "c0";
            else if(this.props.AHI <= 5) return "c1";
            else if(this.props.AHI <= 10) return "c2";
            else return "c3";
        }
        else{
            if(this.props.AHI <= 5) return "a0";
            else if(this.props.AHI <= 15) return "a1";
            else if(this.props.AHI <= 30) return "a2";
            else return "a3";
        }
    }

    // ol子元素掛載
    insertTreatment(parent, cType, cStyle, cText){
        let child = document.createElement(cType);
        child.setAttribute('style', cStyle);
        child.innerHTML = cText;
        parent.appendChild(child);
        return child;
    }

    componentDidUpdate(){

        // 疾病代號陣列改變時重新掛載li
        if(this.state.diseaseLength !== this.props.nowDisease.length){
            let ol = document.createElement('ol');
            ol.setAttribute('style', 'padding-left:30px');
            let titleStyle = "font-weight:bold";
            let liStyle = "";

            // 填寫疾病在diagnosis textarea
            let dText = document.getElementById("diagnosisTextarea");
            dText.value = "";
            let nowDisease = this.props.nowDisease;

            for(let i=0; i<nowDisease.length; i++){

                let dchangeLine = (dText.value === "") ? "" : "\n";

                if(nowDisease[i] === '1'){
                    dText.value = dText.value + dchangeLine + "Sleep-disordered breathing (G47.8).";
                    this.insertTreatment(ol, "span", titleStyle, "Sleep-disordered breathing (G47.8):");
                    this.insertTreatment(ol, "li", liStyle, "Obstructive sleep apnea is not likely.");
                }
                else if(nowDisease[i] === '2'){
                    dText.value = dText.value + dchangeLine + "Snoring (R06.83).";
                    this.insertTreatment(ol, "span", titleStyle, "Snoring (R06.83):");
                    this.insertTreatment(ol, "li", liStyle, "Obstructive sleep apnea hypopnea is not likely.");
                    this.insertTreatment(ol, "li", liStyle, "Body weight control.");
                    this.insertTreatment(ol, "li", liStyle, "Further treatment with mandibular advancement device or surgery may be considered, if the patient is concerned about snoring.");
                }
                else if(nowDisease[i] === '3'){
                    let condition = this.ageAHIcondition();
                    console.log(condition);
                    if(condition === "c0" || condition === "a0"){
                        alert("AHI為正常值，無Obstructive sleep hypopnea (G47.33).");
                        this.props.deleteFromSelectedByTreatment(nowDisease[i]);
                    } 
                    else if(condition === "c1" || condition === "a1"){
                        dText.value = dText.value + dchangeLine + "Obstructive sleep hypopnea (Mild) (G47.33).";
                        this.insertTreatment(ol, "span", titleStyle, "Obstructive sleep hypopnea (Mild) (G47.33):");
                        this.insertTreatment(ol, "li", liStyle, "Body weight control.");
                        this.insertTreatment(ol, "li", liStyle, "Further treatment of mandibular advancement device or myofunctional therapy or surgery may be considered.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.");
                    }
                    else if(condition === "c2" || condition === "a2"){
                        dText.value = dText.value + dchangeLine + "Obstructive sleep hypopnea (Moderate) (G47.33).";
                        this.insertTreatment(ol, "span", titleStyle, "Obstructive sleep hypopnea (Moderate) (G47.33):");
                        this.insertTreatment(ol, "li", liStyle, "Body weight control.");
                        this.insertTreatment(ol, "li", liStyle, "Further treatment of CPAP or mandibular advancement device or myofunctional therapy or surgery may be considered.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.");
                    }
                    else if(condition === "c3" || condition === "a3"){
                        dText.value = dText.value + dchangeLine + "Obstructive sleep hypopnea (Severe) (G47.33).";
                        this.insertTreatment(ol, "span", titleStyle, "Obstructive sleep hypopnea (Severe) (G47.33):");
                        this.insertTreatment(ol, "li", liStyle, "Body weight control.");
                        this.insertTreatment(ol, "li", liStyle, "Further treatment of CPAP or surgery may be considered.");
                        this.insertTreatment(ol, "li", liStyle, "AHI > 60, AHI (REM / Non-REM) < 2, limited surgical improvement can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (Supine / Non-supine) < 2, limited body position therapy can be predicted.");
                    }             
                }
                else if(nowDisease[i] === '4'){
                    let condition = this.ageAHIcondition();
                    if(condition === "c0" || condition === "a0"){
                        alert("AHI為正常值，無Obstructive sleep apnea hypopnea (G47.33).");
                        this.props.deleteFromSelectedByTreatment(nowDisease[i]);
                    } 
                    else if(condition === "c1" || condition === "a1"){
                        dText.value = dText.value + dchangeLine + "Obstructive sleep apnea hypopnea (Mild) (G47.33).";
                        this.insertTreatment(ol, "span", titleStyle, "Obstructive sleep apnea hypopnea (Mild) (G47.33):");
                        this.insertTreatment(ol, "li", liStyle, "Body weight control.");
                        this.insertTreatment(ol, "li", liStyle, "Further treatment of mandibular advancement device or myofunctional therapy or surgery may be considered.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.");
                    }
                    else if(condition === "c2" || condition === "a2"){
                        dText.value = dText.value + dchangeLine + "Obstructive sleep apnea hypopnea (Moderate) (G47.33).";
                        this.insertTreatment(ol, "span", titleStyle, "Obstructive sleep apnea hypopnea (Moderate) (G47.33):");
                        this.insertTreatment(ol, "li", liStyle, "Body weight control.");
                        this.insertTreatment(ol, "li", liStyle, "Further treatment of CPAP or mandibular advancement device or myofunctional therapy or surgery may be considered.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.");
                    }
                    else if(condition === "c3" || condition === "a3"){
                        dText.value = dText.value + dchangeLine + "Obstructive sleep apnea hypopnea (Severe) (G47.33).";
                        this.insertTreatment(ol, "span", titleStyle, "Obstructive sleep apnea hypopnea (Severe) (G47.33):");
                        this.insertTreatment(ol, "li", liStyle, "Body weight control.");
                        this.insertTreatment(ol, "li", liStyle, "Further treatment of CPAP or surgery may be considered.");
                        this.insertTreatment(ol, "li", liStyle, "AHI > 60, AHI (REM / Non-REM) < 2, limited surgical improvement can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (Supine / Non-supine) < 2, limited body position therapy can be predicted.");
                    }   
                }
                else if(nowDisease[i] === '5'){
                    let condition = this.ageAHIcondition();
                    if(condition === "c0" || condition === "a0"){
                        alert("AHI為正常值，無Mixed sleep hypopnea (G47.33, G47.37).");
                        this.props.deleteFromSelectedByTreatment(nowDisease[i]);
                    } 
                    else if(condition === "c1" || condition === "a1"){
                        dText.value = dText.value + dchangeLine + "Mixed sleep hypopnea (Mild) (G47.33, G47.37).";
                        this.insertTreatment(ol, "span", titleStyle, "Mixed sleep hypopnea (Mild) (G47.33, G47.37):");
                        this.insertTreatment(ol, "li", liStyle, "Body weight control.");
                        this.insertTreatment(ol, "li", liStyle, "Further treatment of mandibular advancement device or myofunctional therapy or surgery may be considered.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "The possible etiologies of central sleep apnea include");
                        let inner_ol = document.createElement('ol');
                        inner_ol.setAttribute('type', 'a');
                        inner_ol.setAttribute('style', 'padding-left:20px');
                        this.insertTreatment(inner_ol, "li", liStyle, "congestive heart failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "hypothyroid disease,");
                        this.insertTreatment(inner_ol, "li", liStyle, "renal failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "neurological disease (parkinson's dz, alzheimer's dz),");
                        this.insertTreatment(inner_ol, "li", liStyle, "stroke, encephalitis, head injury,");
                        this.insertTreatment(inner_ol, "li", liStyle, "medication (opioids),");
                        this.insertTreatment(inner_ol, "li", liStyle, "unknown.");
                        ol.appendChild(inner_ol);
                    }
                    else if(condition === "c2" || condition === "a2"){
                        dText.value = dText.value + dchangeLine + "Mixed sleep hypopnea (Moderate) (G47.33, G47.37).";
                        this.insertTreatment(ol, "span", titleStyle, "Mixed sleep hypopnea (Moderate) (G47.33, G47.37):");
                        this.insertTreatment(ol, "li", liStyle, "Body weight control.");
                        this.insertTreatment(ol, "li", liStyle, "Further treatment of CPAP or mandibular advancement device or myofunctional therapy or surgery may be considered.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "The possible etiologies of central sleep apnea include");
                        let inner_ol = document.createElement('ol');
                        inner_ol.setAttribute('type', 'a');
                        inner_ol.setAttribute('style', 'padding-left:20px');
                        this.insertTreatment(inner_ol, "li", liStyle, "congestive heart failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "hypothyroid disease,");
                        this.insertTreatment(inner_ol, "li", liStyle, "renal failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "neurological disease (parkinson's dz, alzheimer's dz),");
                        this.insertTreatment(inner_ol, "li", liStyle, "stroke, encephalitis, head injury,");
                        this.insertTreatment(inner_ol, "li", liStyle, "medication (opioids),");
                        this.insertTreatment(inner_ol, "li", liStyle, "unknown.");
                        ol.appendChild(inner_ol);
                    }
                    else if(condition === "c3" || condition === "a3"){
                        dText.value = dText.value + dchangeLine + "Mixed sleep hypopnea (Severe) (G47.33, G47.37).";
                        this.insertTreatment(ol, "span", titleStyle, "Mixed sleep hypopnea (Severe) (G47.33, G47.37):");
                        this.insertTreatment(ol, "li", liStyle, "Body weight control.");
                        this.insertTreatment(ol, "li", liStyle, "Further treatment of CPAP or surgery may be considered.");
                        this.insertTreatment(ol, "li", liStyle, "AHI > 60, AHI (REM / Non-REM) < 2, limited surgical improvement can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (Supine / Non-supine) < 2, limited body position therapy can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "The possible etiologies of central sleep apnea include");
                        let inner_ol = document.createElement('ol');
                        inner_ol.setAttribute('type', 'a');
                        inner_ol.setAttribute('style', 'padding-left:20px');
                        this.insertTreatment(inner_ol, "li", liStyle, "congestive heart failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "hypothyroid disease,");
                        this.insertTreatment(inner_ol, "li", liStyle, "renal failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "neurological disease (parkinson's dz, alzheimer's dz),");
                        this.insertTreatment(inner_ol, "li", liStyle, "stroke, encephalitis, head injury,");
                        this.insertTreatment(inner_ol, "li", liStyle, "medication (opioids),");
                        this.insertTreatment(inner_ol, "li", liStyle, "unknown.");
                        ol.appendChild(inner_ol);
                    }  
                }
                else if(nowDisease[i] === '6'){
                    let condition = this.ageAHIcondition();
                    if(condition === "c0" || condition === "a0"){
                        alert("AHI為正常值，無Mixed sleep apnea hypopnea (G47.33, G47.37).");
                        this.props.deleteFromSelectedByTreatment(nowDisease[i]);
                    } 
                    else if(condition === "c1" || condition === "a1"){
                        dText.value = dText.value + dchangeLine + "Mixed sleep apnea hypopnea (Mild) (G47.33, G47.37).";
                        this.insertTreatment(ol, "span", titleStyle, "Mixed sleep apnea hypopnea (Mild) (G47.33, G47.37):");
                        this.insertTreatment(ol, "li", liStyle, "Body weight control.");
                        this.insertTreatment(ol, "li", liStyle, "Further treatment of mandibular advancement device or myofunctional therapy or surgery may be considered.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "The possible etiologies of central sleep apnea include");
                        let inner_ol = document.createElement('ol');
                        inner_ol.setAttribute('type', 'a');
                        inner_ol.setAttribute('style', 'padding-left:20px');
                        this.insertTreatment(inner_ol, "li", liStyle, "congestive heart failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "hypothyroid disease,");
                        this.insertTreatment(inner_ol, "li", liStyle, "renal failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "neurological disease (parkinson's dz, alzheimer's dz),");
                        this.insertTreatment(inner_ol, "li", liStyle, "stroke, encephalitis, head injury,");
                        this.insertTreatment(inner_ol, "li", liStyle, "medication (opioids),");
                        this.insertTreatment(inner_ol, "li", liStyle, "unknown.");
                        ol.appendChild(inner_ol);
                    }
                    else if(condition === "c2" || condition === "a2"){
                        dText.value = dText.value + dchangeLine + "Mixed sleep apnea hypopnea (Moderate) (G47.33, G47.37).";
                        this.insertTreatment(ol, "span", titleStyle, "Mixed sleep apnea hypopnea (Moderate) (G47.33, G47.37):");
                        this.insertTreatment(ol, "li", liStyle, "Body weight control.");
                        this.insertTreatment(ol, "li", liStyle, "Further treatment of CPAP or mandibular advancement device or myofunctional therapy or surgery may be considered.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "The possible etiologies of central sleep apnea include");
                        let inner_ol = document.createElement('ol');
                        inner_ol.setAttribute('type', 'a');
                        inner_ol.setAttribute('style', 'padding-left:20px');
                        this.insertTreatment(inner_ol, "li", liStyle, "congestive heart failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "hypothyroid disease,");
                        this.insertTreatment(inner_ol, "li", liStyle, "renal failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "neurological disease (parkinson's dz, alzheimer's dz),");
                        this.insertTreatment(inner_ol, "li", liStyle, "stroke, encephalitis, head injury,");
                        this.insertTreatment(inner_ol, "li", liStyle, "medication (opioids),");
                        this.insertTreatment(inner_ol, "li", liStyle, "unknown.");
                        ol.appendChild(inner_ol);
                    }
                    else if(condition === "c3" || condition === "a3"){
                        dText.value = dText.value + dchangeLine + "Mixed sleep apnea hypopnea (Severe) (G47.33, G47.37).";
                        this.insertTreatment(ol, "span", titleStyle, "Mixed sleep apnea hypopnea (Severe) (G47.33, G47.37):");
                        this.insertTreatment(ol, "li", liStyle, "Body weight control.");
                        this.insertTreatment(ol, "li", liStyle, "Further treatment of CPAP or surgery may be considered.");
                        this.insertTreatment(ol, "li", liStyle, "AHI > 60, AHI (REM / Non-REM) < 2, limited surgical improvement can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (Supine / Non-supine) < 2, limited body position therapy can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "The possible etiologies of central sleep apnea include");
                        let inner_ol = document.createElement('ol');
                        inner_ol.setAttribute('type', 'a');
                        inner_ol.setAttribute('style', 'padding-left:20px');
                        this.insertTreatment(inner_ol, "li", liStyle, "congestive heart failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "hypothyroid disease,");
                        this.insertTreatment(inner_ol, "li", liStyle, "renal failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "neurological disease (parkinson's dz, alzheimer's dz),");
                        this.insertTreatment(inner_ol, "li", liStyle, "stroke, encephalitis, head injury,");
                        this.insertTreatment(inner_ol, "li", liStyle, "medication (opioids),");
                        this.insertTreatment(inner_ol, "li", liStyle, "unknown.");
                        ol.appendChild(inner_ol);
                    }
                }
                else if(nowDisease[i] === '7'){
                    let condition = this.ageAHIcondition();
                    if(condition === "c0" || condition === "a0"){
                        alert("AHI為正常值，無Central sleep hypopnea (G47.37).");
                        this.props.deleteFromSelectedByTreatment(nowDisease[i]);
                    } 
                    else if(condition === "c1" || condition === "a1"){
                        dText.value = dText.value + dchangeLine + "Central sleep hypopnea (Mild) (G47.37).";
                        this.insertTreatment(ol, "span", titleStyle, "Central sleep hypopnea (Mild) (G47.37):");
                        this.insertTreatment(ol, "li", liStyle, "Obstructive sleep apnea hypopnea is not likely.");
                        this.insertTreatment(ol, "li", liStyle, "The possible etiologies of central sleep hypopnea include");
                        let inner_ol = document.createElement('ol');
                        inner_ol.setAttribute('type', 'a');
                        inner_ol.setAttribute('style', 'padding-left:20px');
                        this.insertTreatment(inner_ol, "li", liStyle, "congestive heart failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "hypothyroid disease,");
                        this.insertTreatment(inner_ol, "li", liStyle, "renal failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "neurological disease (parkinson's dz, alzheimer's dz),");
                        this.insertTreatment(inner_ol, "li", liStyle, "stroke, encephalitis, head injury,");
                        this.insertTreatment(inner_ol, "li", liStyle, "medication (opioids),");
                        this.insertTreatment(inner_ol, "li", liStyle, "unknown.");
                        ol.appendChild(inner_ol);
                    }
                    else if(condition === "c2" || condition === "a2"){
                        dText.value = dText.value + dchangeLine + "Central sleep hypopnea (Moderate) (G47.37).";
                        this.insertTreatment(ol, "span", titleStyle, "Central sleep hypopnea (Moderate) (G47.37):");
                        this.insertTreatment(ol, "li", liStyle, "Obstructive sleep apnea hypopnea is not likely.");
                        this.insertTreatment(ol, "li", liStyle, "The possible etiologies of central sleep hypopnea include");
                        let inner_ol = document.createElement('ol');
                        inner_ol.setAttribute('type', 'a');
                        inner_ol.setAttribute('style', 'padding-left:20px');
                        this.insertTreatment(inner_ol, "li", liStyle, "congestive heart failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "hypothyroid disease,");
                        this.insertTreatment(inner_ol, "li", liStyle, "renal failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "neurological disease (parkinson's dz, alzheimer's dz),");
                        this.insertTreatment(inner_ol, "li", liStyle, "stroke, encephalitis, head injury,");
                        this.insertTreatment(inner_ol, "li", liStyle, "medication (opioids),");
                        this.insertTreatment(inner_ol, "li", liStyle, "unknown.");
                        ol.appendChild(inner_ol);
                    }
                    else if(condition === "c3" || condition === "a3"){
                        dText.value = dText.value + dchangeLine + "Central sleep hypopnea (Severe) (G47.37).";
                        this.insertTreatment(ol, "span", titleStyle, "Central sleep hypopnea (Severe) (G47.37):");
                        this.insertTreatment(ol, "li", liStyle, "Obstructive sleep apnea hypopnea is not likely.");
                        this.insertTreatment(ol, "li", liStyle, "The possible etiologies of central sleep hypopnea include");
                        let inner_ol = document.createElement('ol');
                        inner_ol.setAttribute('type', 'a');
                        inner_ol.setAttribute('style', 'padding-left:20px');
                        this.insertTreatment(inner_ol, "li", liStyle, "congestive heart failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "hypothyroid disease,");
                        this.insertTreatment(inner_ol, "li", liStyle, "renal failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "neurological disease (parkinson's dz, alzheimer's dz),");
                        this.insertTreatment(inner_ol, "li", liStyle, "stroke, encephalitis, head injury,");
                        this.insertTreatment(inner_ol, "li", liStyle, "medication (opioids),");
                        this.insertTreatment(inner_ol, "li", liStyle, "unknown.");
                        ol.appendChild(inner_ol);
                    }
                }
                else if(nowDisease[i] === '8'){
                    let condition = this.ageAHIcondition();
                    if(condition === "c0" || condition === "a0"){
                        alert("AHI為正常值，無Central sleep apnea hypopnea (G47.37).");
                        this.props.deleteFromSelectedByTreatment(nowDisease[i]);
                    } 
                    else if(condition === "c1" || condition === "a1"){
                        dText.value = dText.value + dchangeLine + "Central sleep apnea hypopnea (Mild) (G47.37).";
                        this.insertTreatment(ol, "span", titleStyle, "Central sleep apnea hypopnea (Mild) (G47.37):");
                        this.insertTreatment(ol, "li", liStyle, "Obstructive sleep apnea hypopnea is not likely.");
                        this.insertTreatment(ol, "li", liStyle, "The possible etiologies of central sleep apnea include");
                        let inner_ol = document.createElement('ol');
                        inner_ol.setAttribute('type', 'a');
                        inner_ol.setAttribute('style', 'padding-left:20px');
                        this.insertTreatment(inner_ol, "li", liStyle, "congestive heart failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "hypothyroid disease,");
                        this.insertTreatment(inner_ol, "li", liStyle, "renal failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "neurological disease (parkinson's dz, alzheimer's dz),");
                        this.insertTreatment(inner_ol, "li", liStyle, "stroke, encephalitis, head injury,");
                        this.insertTreatment(inner_ol, "li", liStyle, "medication (opioids),");
                        this.insertTreatment(inner_ol, "li", liStyle, "unknown.");
                        ol.appendChild(inner_ol);
                    }
                    else if(condition === "c2" || condition === "a2"){
                        dText.value = dText.value + dchangeLine + "Central sleep apnea hypopnea (Moderate) (G47.37).";
                        this.insertTreatment(ol, "span", titleStyle, "Central sleep apnea hypopnea (Moderate) (G47.37):");
                        this.insertTreatment(ol, "li", liStyle, "Obstructive sleep apnea hypopnea is not likely.");
                        this.insertTreatment(ol, "li", liStyle, "The possible etiologies of central sleep apnea include");
                        let inner_ol = document.createElement('ol');
                        inner_ol.setAttribute('type', 'a');
                        inner_ol.setAttribute('style', 'padding-left:20px');
                        this.insertTreatment(inner_ol, "li", liStyle, "congestive heart failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "hypothyroid disease,");
                        this.insertTreatment(inner_ol, "li", liStyle, "renal failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "neurological disease (parkinson's dz, alzheimer's dz),");
                        this.insertTreatment(inner_ol, "li", liStyle, "stroke, encephalitis, head injury,");
                        this.insertTreatment(inner_ol, "li", liStyle, "medication (opioids),");
                        this.insertTreatment(inner_ol, "li", liStyle, "unknown.");
                        ol.appendChild(inner_ol);
                    }
                    else if(condition === "c3" || condition === "a3"){
                        dText.value = dText.value + dchangeLine + "Central sleep apnea hypopnea (Severe) (G47.37).";
                        this.insertTreatment(ol, "span", titleStyle, "Central sleep apnea hypopnea (Severe) (G47.37):");
                        this.insertTreatment(ol, "li", liStyle, "Obstructive sleep apnea hypopnea is not likely.");
                        this.insertTreatment(ol, "li", liStyle, "The possible etiologies of central sleep apnea include");
                        let inner_ol = document.createElement('ol');
                        inner_ol.setAttribute('type', 'a');
                        inner_ol.setAttribute('style', 'padding-left:20px');
                        this.insertTreatment(inner_ol, "li", liStyle, "congestive heart failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "hypothyroid disease,");
                        this.insertTreatment(inner_ol, "li", liStyle, "renal failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "neurological disease (parkinson's dz, alzheimer's dz),");
                        this.insertTreatment(inner_ol, "li", liStyle, "stroke, encephalitis, head injury,");
                        this.insertTreatment(inner_ol, "li", liStyle, "medication (opioids),");
                        this.insertTreatment(inner_ol, "li", liStyle, "unknown.");
                        ol.appendChild(inner_ol);
                    }
                }
                else if(nowDisease[i] === '9'){
                    let condition = this.ageAHIcondition();
                    if(condition === "c0" || condition === "a0"){
                        alert("AHI為正常值，無Obstructive sleep hypopnea, treated (G47.33).");
                        this.props.deleteFromSelectedByTreatment(nowDisease[i]);
                    } 
                    else if(condition === "c1" || condition === "a1"){
                        dText.value = dText.value + dchangeLine + "Obstructive sleep hypopnea, treated (Mild) (G47.33).";
                        this.insertTreatment(ol, "span", titleStyle, "Obstructive sleep hypopnea, treated (Mild) (G47.33):");
                        this.insertTreatment(ol, "li", liStyle, "Compared with pre-Tx PSG report, OSA severity is improved obviously.");
                        this.insertTreatment(ol, "li", liStyle, "Body weight control.");
                        this.insertTreatment(ol, "li", liStyle, "Further treatment of mandibular advancement device or myofunctional therapy or surgery may be considered.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.");
                    }
                    else if(condition === "c2" || condition === "a2"){
                        dText.value = dText.value + dchangeLine + "Obstructive sleep hypopnea, treated (Moderate) (G47.33).";
                        this.insertTreatment(ol, "span", titleStyle, "Obstructive sleep hypopnea, treated (Moderate) (G47.33):");
                        this.insertTreatment(ol, "li", liStyle, "Compared with pre-Tx PSG report, OSA severity is improved limitedly.");
                        this.insertTreatment(ol, "li", liStyle, "Body weight control.");
                        this.insertTreatment(ol, "li", liStyle, "Further treatment of CPAP or mandibular advancement device or myofunctional therapy or surgery may be considered.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (REM / Non-REM) < 2, limited surgical improvement can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.");
                    }
                    else if(condition === "c3" || condition === "a3"){
                        dText.value = dText.value + dchangeLine + "Obstructive sleep hypopnea, treated (Severe) (G47.33).";
                        this.insertTreatment(ol, "span", titleStyle, "Obstructive sleep hypopnea, treated (Severe) (G47.33):");
                        this.insertTreatment(ol, "li", liStyle, "Compared with pre-Tx PSG report, OSA severity is improved limitedly.");
                        this.insertTreatment(ol, "li", liStyle, "Body weight control.");
                        this.insertTreatment(ol, "li", liStyle, "Further treatment of CPAP or surgery may be considered.");
                        this.insertTreatment(ol, "li", liStyle, "AHI > 60, AHI (REM / Non-REM) < 2, limited surgical improvement can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (Supine / Non-supine) < 2, limited body position therapy can be predicted.");
                    }
                }
                else if(nowDisease[i] === '10'){
                    let condition = this.ageAHIcondition();
                    if(condition === "c0" || condition === "a0"){
                        alert("AHI為正常值，無Obstructive sleep apnea hypopnea, treated (G47.33).");
                        this.props.deleteFromSelectedByTreatment(nowDisease[i]);
                    } 
                    else if(condition === "c1" || condition === "a1"){
                        dText.value = dText.value + dchangeLine + "Obstructive sleep apnea hypopnea, treated (Mild) (G47.33).";
                        this.insertTreatment(ol, "span", titleStyle, "Obstructive sleep apnea hypopnea, treated (Mild) (G47.33):");
                        this.insertTreatment(ol, "li", liStyle, "Compared with pre-Tx PSG report, OSA severity is improved obviously.");
                        this.insertTreatment(ol, "li", liStyle, "Body weight control.");
                        this.insertTreatment(ol, "li", liStyle, "Further treatment of mandibular advancement device or myofunctional therapy or surgery may be considered.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.");
                    }
                    else if(condition === "c2" || condition === "a2"){
                        dText.value = dText.value + dchangeLine + "Obstructive sleep apnea hypopnea, treated (Moderate) (G47.33).";
                        this.insertTreatment(ol, "span", titleStyle, "Obstructive sleep apnea hypopnea, treated (Moderate) (G47.33):");
                        this.insertTreatment(ol, "li", liStyle, "Compared with pre-Tx PSG report, OSA severity is improved limitedly.");
                        this.insertTreatment(ol, "li", liStyle, "Body weight control.");
                        this.insertTreatment(ol, "li", liStyle, "Further treatment of CPAP or mandibular advancement device or myofunctional therapy or surgery may be considered.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (REM / Non-REM) < 2, limited surgical improvement can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.");
                    }
                    else if(condition === "c3" || condition === "a3"){
                        dText.value = dText.value + dchangeLine + "Obstructive sleep apnea hypopnea, treated (Severe) (G47.33).";
                        this.insertTreatment(ol, "span", titleStyle, "Obstructive sleep apnea hypopnea, treated (Severe) (G47.33):");
                        this.insertTreatment(ol, "li", liStyle, "Compared with pre-Tx PSG report, OSA severity is improved limitedly.");
                        this.insertTreatment(ol, "li", liStyle, "Body weight control.");
                        this.insertTreatment(ol, "li", liStyle, "Further treatment of CPAP or surgery may be considered.");
                        this.insertTreatment(ol, "li", liStyle, "AHI > 60, AHI (REM / Non-REM) < 2, limited surgical improvement can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (Supine / Non-supine) < 2, limited body position therapy can be predicted.");
                    }
                }
                else if(nowDisease[i] === '11'){
                    let condition = this.ageAHIcondition();
                    if(condition === "c0" || condition === "a0"){
                        alert("AHI為正常值，無Mixed sleep apnea hypopnea, treated (G47.33, G47.37).");
                        this.props.deleteFromSelectedByTreatment(nowDisease[i]);
                    } 
                    else if(condition === "c1" || condition === "a1"){
                        dText.value = dText.value + dchangeLine + "Mixed sleep apnea hypopnea, treated (Mild) (G47.33, G47.37).";
                        this.insertTreatment(ol, "span", titleStyle, "Mixed sleep apnea hypopnea, treated (Mild) (G47.33, G47.37):");
                        this.insertTreatment(ol, "li", liStyle, "Compared with pre-Tx PSG report, OSA severity is improved obviously.");
                        this.insertTreatment(ol, "li", liStyle, "Body weight control.");
                        this.insertTreatment(ol, "li", liStyle, "Further treatment of mandibular advancement device or myofunctional therapy or surgery may be considered.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "The possible etiologies of central sleep apnea include");
                        let inner_ol = document.createElement('ol');
                        inner_ol.setAttribute('type', 'a');
                        inner_ol.setAttribute('style', 'padding-left:20px');
                        this.insertTreatment(inner_ol, "li", liStyle, "congestive heart failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "hypothyroid disease,");
                        this.insertTreatment(inner_ol, "li", liStyle, "renal failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "neurological disease (parkinson's dz, alzheimer's dz),");
                        this.insertTreatment(inner_ol, "li", liStyle, "stroke, encephalitis, head injury,");
                        this.insertTreatment(inner_ol, "li", liStyle, "medication (opioids),");
                        this.insertTreatment(inner_ol, "li", liStyle, "unknown.");
                        ol.appendChild(inner_ol);
                    }
                    else if(condition === "c2" || condition === "a2"){
                        dText.value = dText.value + dchangeLine + "Mixed sleep apnea hypopnea, treated (Moderate) (G47.33, G47.37).";
                        this.insertTreatment(ol, "span", titleStyle, "Mixed sleep apnea hypopnea, treated (Moderate) (G47.33, G47.37):");
                        this.insertTreatment(ol, "li", liStyle, "Compared with pre-Tx PSG report, OSA severity is improved limitedly.");
                        this.insertTreatment(ol, "li", liStyle, "Body weight control.");
                        this.insertTreatment(ol, "li", liStyle, "Further treatment of CPAP or mandibular advancement device or myofunctional therapy or surgery may be considered.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (REM / Non-REM) < 2, limited surgical improvement can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "The possible etiologies of central sleep apnea include");
                        let inner_ol = document.createElement('ol');
                        inner_ol.setAttribute('type', 'a');
                        inner_ol.setAttribute('style', 'padding-left:20px');
                        this.insertTreatment(inner_ol, "li", liStyle, "congestive heart failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "hypothyroid disease,");
                        this.insertTreatment(inner_ol, "li", liStyle, "renal failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "neurological disease (parkinson's dz, alzheimer's dz),");
                        this.insertTreatment(inner_ol, "li", liStyle, "stroke, encephalitis, head injury,");
                        this.insertTreatment(inner_ol, "li", liStyle, "medication (opioids),");
                        this.insertTreatment(inner_ol, "li", liStyle, "unknown.");
                        ol.appendChild(inner_ol);
                    }
                    else if(condition === "c3" || condition === "a3"){
                        dText.value = dText.value + dchangeLine + "Mixed sleep apnea hypopnea, treated (Severe) (G47.33, G47.37).";
                        this.insertTreatment(ol, "span", titleStyle, "Mixed sleep apnea hypopnea, treated (Severe) (G47.33, G47.37):");
                        this.insertTreatment(ol, "li", liStyle, "Compared with pre-Tx PSG report, OSA severity is improved limitedly.");
                        this.insertTreatment(ol, "li", liStyle, "Body weight control.");
                        this.insertTreatment(ol, "li", liStyle, "Further treatment of CPAP or surgery may be considered.");
                        this.insertTreatment(ol, "li", liStyle, "AHI > 60, AHI (REM / Non-REM) < 2, limited surgical improvement can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "AHI (Supine / Non-supine) < 2, limited body position therapy can be predicted.");
                        this.insertTreatment(ol, "li", liStyle, "The possible etiologies of central sleep apnea include");
                        let inner_ol = document.createElement('ol');
                        inner_ol.setAttribute('type', 'a');
                        inner_ol.setAttribute('style', 'padding-left:20px');
                        this.insertTreatment(inner_ol, "li", liStyle, "congestive heart failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "hypothyroid disease,");
                        this.insertTreatment(inner_ol, "li", liStyle, "renal failure,");
                        this.insertTreatment(inner_ol, "li", liStyle, "neurological disease (parkinson's dz, alzheimer's dz),");
                        this.insertTreatment(inner_ol, "li", liStyle, "stroke, encephalitis, head injury,");
                        this.insertTreatment(inner_ol, "li", liStyle, "medication (opioids),");
                        this.insertTreatment(inner_ol, "li", liStyle, "unknown.");
                        ol.appendChild(inner_ol);
                    }
                }
                else if(nowDisease[i] === '12'){
                    dText.value = dText.value + dchangeLine + "Poor sleep efficiency (G47.8).";
                    this.insertTreatment(ol, "span", titleStyle, "Poor sleep efficiency (G47.8):");
                    this.insertTreatment(ol, "li", liStyle, "Sleep latency " + this.props.sleepLatency + " min; Awake time " + this.props.awakeTime + " min; Total sleep time " + this.props.totalSleepTime + " min; Sleep efficiency " + this.props.SE + " %; the representation of this PSG report is limited.");
                }
                else if(nowDisease[i] === '13'){
                    dText.value = dText.value + dchangeLine + "Under treatment of CPAP.";
                    this.insertTreatment(ol, "span", titleStyle, "Under treatment of CPAP:");
                    this.insertTreatment(ol, "li", liStyle, "With the use of CPAP (15 cmH2O), OSA severity was improved significantly.");
                }
                else if(nowDisease[i] === '14'){
                    dText.value = dText.value + dchangeLine + "Under treatment of oral appliance.";
                    this.insertTreatment(ol, "span", titleStyle, "Under treatment of oral appliance:");
                    this.insertTreatment(ol, "li", liStyle, "With the use of oral appliance, OSA severity was improved partially.");
                }
                else if(nowDisease[i] === '15'){
                    dText.value = dText.value + dchangeLine + "Treatment of myofunctional therapy.";
                    this.insertTreatment(ol, "span", titleStyle, "Treatment of myofunctional therapy:");
                    this.insertTreatment(ol, "li", liStyle, "Compared with pre-Tx PSG report, OSA severity is improved partially.");
                }
                else if(nowDisease[i] === '16'){
                    dText.value = dText.value + dchangeLine + "Treatment of body-weight control.";
                    this.insertTreatment(ol, "span", titleStyle, "Treatment of body-weight control:");
                    this.insertTreatment(ol, "li", liStyle, "Compared with pre-Tx PSG report, OSA severity is improved partially.");
                }
                else if(nowDisease[i] === '17'){
                    dText.value = dText.value + dchangeLine + "Suspect periodic limb movement (G47.61).";
                    this.insertTreatment(ol, "span", titleStyle, "Suspect periodic limb movement (G47.61):");
                    this.insertTreatment(ol, "li", liStyle, "PLM index ≦ 15; further evaluation of periodic leg movement may be considered, if the clinical symptoms / signs are correlated.");
                }
                else if(nowDisease[i] === '18'){
                    dText.value = dText.value + dchangeLine + "Periodic limb movement (G47.61).";
                    this.insertTreatment(ol, "span", titleStyle, "Periodic limb movement (G47.61):");
                    this.insertTreatment(ol, "li", liStyle, "PLM index > 15; further evaluation of periodic leg movement may be considered, if the clinical symptoms / signs are correlated.");
                    let inner_ol = document.createElement('ol');
                    inner_ol.setAttribute('type', 'a');
                    inner_ol.setAttribute('style', 'padding-left:20px');
                    this.insertTreatment(inner_ol, "li", liStyle, "Periodic limb movement disorder can be primary or secondary.");
                    this.insertTreatment(inner_ol, "li", liStyle, "Secondary PLMD has many different causes, including the following: DM, Iron deficiency, Anemia, Uremia, Spinal cord tumor / injury, OSA, Narcolepsy, Medication (Neuroleptics, antidopaminergic agents, tricyclic antidepressants), Withdrawal from sedative medications.");
                    this.insertTreatment(inner_ol, "li", liStyle, "Lab tests: CBC, Hb, BUN, Crea, GOT, GPT, Glucose, Ca, Na, K, serum iron & TIBC, ferritin, folate, Vit. B12, TSH, T3, T4.");
                    this.insertTreatment(inner_ol, "li", liStyle, "Benzodiazepines (eg. Clonazepam, Rivotril) is probably the most widely used drug to treat PLMD. In fact, medical therapy does not cure PLMD but relieves symptoms.");
                    ol.appendChild(inner_ol);
                }
                else if(nowDisease[i] === '19'){
                    dText.value = dText.value + dchangeLine + "Suspect autonomic dysfunction (F41.9).";
                    this.insertTreatment(ol, "span", titleStyle, "Suspect autonomic dysfunction (F41.9):");
                    this.insertTreatment(ol, "li", liStyle, "According the patient's history, further evaluation of autonomic function is suggested.");
                }
                else if(nowDisease[i] === '20'){
                    dText.value = dText.value + dchangeLine + "Suspect poor quality of life.";
                    this.insertTreatment(ol, "span", titleStyle, "Suspect poor quality of life:");
                    this.insertTreatment(ol, "li", liStyle, "Further evaluation and improvement of quality of life may be considered, if the clinical findings are correlated.");
                }
                else if(nowDisease[i] === '21'){
                    dText.value = dText.value + dchangeLine + "Suspect tinnitus (H93.19).";
                    this.insertTreatment(ol, "span", titleStyle, "Suspect tinnitus (H93.19):");
                    this.insertTreatment(ol, "li", liStyle, "Further evaluation and treatment of tinnitus may be considered, if the clinical symptoms / signs are correlated.");
                }
                else if(nowDisease[i] === '22'){
                    dText.value = dText.value + dchangeLine + "Suspect Gastro-Esophageal reflux disease (GERD) (K21.0).";
                    this.insertTreatment(ol, "span", titleStyle, "Suspect Gastro-Esophageal reflux disease (GERD) (K21.0):");
                    this.insertTreatment(ol, "li", liStyle, "Further evaluation of GERD may be considered, if the clinical symptoms / signs are correlated.");
                }
                else if(nowDisease[i] === '23'){
                    dText.value = dText.value + dchangeLine + "Suspect cardiac arrhythmia (I49.9).";
                    this.insertTreatment(ol, "span", titleStyle, "Suspect cardiac arrhythmia (I49.9):");
                    this.insertTreatment(ol, "li", liStyle, "Further evaluation of cardiac arrhythmia may be considered, if the clinical symptoms / signs are correlated.");
                }
                else if(nowDisease[i] === '24'){
                    dText.value = dText.value + dchangeLine + "Sleep bruxism (G47.63).";
                    this.insertTreatment(ol, "span", titleStyle, "Sleep bruxism (G47.63):");
                    this.insertTreatment(ol, "li", liStyle, "Due to sleep bruxism, further dental evaluation and management may be considered.");
                }
                else if(nowDisease[i] === '25'){
                    dText.value = dText.value + dchangeLine + "Alpha sleep.";
                    this.insertTreatment(ol, "span", titleStyle, "Alpha sleep:");
                    this.insertTreatment(ol, "li", liStyle, "According the patient's history, further evaluation of alpha sleep is suggested.");
                }
                else if(nowDisease[i] === '26'){
                    dText.value = dText.value + dchangeLine + "Suspect REM behavior disorder (G47.52).";
                    this.insertTreatment(ol, "span", titleStyle, "Suspect REM behavior disorder (G47.52):");
                    this.insertTreatment(ol, "li", liStyle, "REM behavior disorder often may be associated with medication (such as antidepressant, Beta-blockers, anticholinesterase inhibitors) or other neurological conditions (such as, dementia, Parkinson's disease, multiple system atrophy). Further diagnosis and management by psychiatrist or neurologist may be considered.");
                }
                else if(nowDisease[i] === '27'){
                    dText.value = dText.value + dchangeLine + "Suspect REM behavior disorder, provisionally (G47.52).";
                    this.insertTreatment(ol, "span", titleStyle, "Suspect REM behavior disorder, provisionally (G47.52):");
                    this.insertTreatment(ol, "li", liStyle, "REM behavior disorder often may be associated with medication (such as antidepressant, Beta-blockers, anticholinesterase inhibitors) or other neurological conditions (such as, dementia, Parkinson's disease, multiple system atrophy). Further diagnosis and management by psychiatrist or neurologist may be considered.");
                }
                else if(nowDisease[i] === '28'){
                    dText.value = dText.value + dchangeLine + "Subclinical REM behavior disorder (G47.52).";
                    this.insertTreatment(ol, "span", titleStyle, "Subclinical REM behavior disorder (G47.52):");
                    this.insertTreatment(ol, "li", liStyle, "Further clinical observation about dream-enacting behaviors should be followed.");
                    this.insertTreatment(ol, "li", liStyle, "REM sleep behavior without atonia (RSWA) often may be associated with medication (such as antidepressant, Beta-blockers, anticholinesterase inhibitors) or predisposing factors of other neurological conditions (such as, dementia, Parkinson's disease, multiple system atrophy). Further diagnosis and management by psychiatrist or neurologist may be considered.");
                }
                else if(nowDisease[i] === '29'){
                    dText.value = dText.value + dchangeLine + "Suspect idiopathic REM behavior disorder (G47.52).";
                    this.insertTreatment(ol, "span", titleStyle, "Suspect idiopathic REM behavior disorder (G47.52):");
                    this.insertTreatment(ol, "li", liStyle, "REM sleep behavior without atonia (RSWA) often may be associated with medication (such as antidepressant, Beta-blockers, anticholinesterase inhibitors) or predisposing factors of other neurological conditions (such as, dementia, Parkinson's disease, multiple system atrophy). Further diagnosis and management by psychiatrist or neurologist may be considered.");
                }
                else if(nowDisease[i] === '30'){
                    dText.value = dText.value + dchangeLine + "Suspect nocturia (R35.1).";
                    this.insertTreatment(ol, "span", titleStyle, "Suspect nocturia (R35.1):");
                    this.insertTreatment(ol, "li", liStyle, "Further evaluation of nocturia may be considered, if the clinical symptoms / signs are correlated.");
                }
                else if(nowDisease[i] === '31'){
                    dText.value = dText.value + dchangeLine + "Sleep related groaning (G47.8).";
                    this.insertTreatment(ol, "span", titleStyle, "Sleep related groaning (G47.8):");
                    this.insertTreatment(ol, "li", liStyle, "According the patient's history, further evaluation of sleep related groaning is suggested.");
                }
                else if(nowDisease[i] === '32'){
                    dText.value = dText.value + dchangeLine + "Suspect disorder of arousal from NREM Sleep.";
                    this.insertTreatment(ol, "span", titleStyle, "Suspect disorder of arousal from NREM Sleep:");
                    this.insertTreatment(ol, "li", liStyle, " ");
                    let ol2 = document.createElement('ol');
                    ol2.setAttribute('type', 'a');
                    ol2.setAttribute('style', 'padding-left:20px');
                    this.insertTreatment(ol2, "li", liStyle, "Disorders of arousal from NREM sleep include confusional arousals, sleep walking and sleep terrors. However, other conditions that mimic the disorders of arousal should be ruled-out, such as:");
                    let ol3 = document.createElement('ol');
                    ol3.setAttribute('type', 'i');
                    ol3.setAttribute('style', 'padding-left:20px');
                    this.insertTreatment(ol3, "li", liStyle, "Neurologic condition (Seizures, Cluster headaches)");
                    this.insertTreatment(ol3, "li", liStyle, "Medical condition (Obstructive sleep apnea, Gastroesophageal reflux)");
                    this.insertTreatment(ol3, "li", liStyle, "Behavioral/Psychiatric condition (Conditioned arousals, Post-traumatic stress disorder, Nocturnal dissociative state, Nocturnal panic)");
                    this.insertTreatment(ol3, "li", liStyle, "Other sleep condition (Nightmares, Rhythmic movements of sleep, Rapid eye movement sleep behavior disorders, Periodic movements of sleep, Sleep deprivation, Irregular sleep-wake schedule)");
                    this.insertTreatment(ol3, "li", liStyle, "Evaluate the complete sleep history, arrange home videotapes, expanded EEG montage with continuous audiovisual monitoring and multiple night studies could be considered.");
                    ol2.appendChild(ol3);
                    this.insertTreatment(ol2, "li", liStyle, "The treatment in disorders of arousal from NREM sleep is often not necessary. Reassurance of their typically benign nature, lack of psychological significance, and the tendency to diminish over time, is often sufficient.");
                    this.insertTreatment(ol2, "li", liStyle, "Pharmacologic treatment such as tricyclic antidepressants and benzodiazepines may be effective, and they should be administered if the activity is dangerous to person or property or extremely disruptive to family members.");
                    this.insertTreatment(ol2, "li", liStyle, "Nonpharmacologic treatment such as psychotherapy, progressive relaxation, or hypnosis is recommended for long-term management. Sleep hygiene such as the avoidance of precipitants such as drugs and sleep deprivation is also important.");
                    ol.appendChild(ol2);
                }
                else if(nowDisease[i] === '33'){
                    dText.value = dText.value + dchangeLine + "Suspected sleep-related hypoventilation disorder (G47.36).";
                    this.insertTreatment(ol, "span", titleStyle, "Suspected sleep-related hypoventilation disorder (G47.36):");
                    this.insertTreatment(ol, "li", liStyle, "Classification of hypoventilation disorders: Primary (Congenital central alveolar hypoventilation syndrome, Idiopathic central alveolar hypoventilation); Secondary (Sleep-related hypoventilation due to a medication or substance, Sleep-related hypoventilation due to a medical disorder, Obesity hypoventilation syndrome, Late-onset central hypoventilation with hypothalamic dysfunction).");
                    let inner_ol = document.createElement('ol');
                    inner_ol.setAttribute('type', 'a');
                    inner_ol.setAttribute('style', 'padding-left:20px');
                    this.insertTreatment(inner_ol, "li", liStyle, "Chronic hypoventilation criteria: hypercapnia in wakefulness and sleep (PaCO2, Arterial carbon dioxide level ≧ 45 mmHg).");
                    this.insertTreatment(inner_ol, "li", liStyle, "Obstructive lung diseases (Asthma, COPD) should be excluded by pulmonary function test.");
                    this.insertTreatment(inner_ol, "li", liStyle, "Obesity-hypoventilation syndrome is most prevalent and treatable.");
                    this.insertTreatment(inner_ol, "li", liStyle, "Other subtypes share common features and underlying disorders with central sleep apnea.");
                    this.insertTreatment(inner_ol, "li", liStyle, "Body weight control and BiPAP are mainstay treatment. Respiratory stimulants like acetazolamide, medroxyprogesterone and theophylline could be considered.");
                    ol.appendChild(inner_ol);
                }
                else if(nowDisease[i] === '34'){
                    dText.value = dText.value + dchangeLine + "Suspect Cheyne-Stokes Breathing.";
                    this.insertTreatment(ol, "span", titleStyle, "Suspect Cheyne-Stokes Breathing:");
                    this.insertTreatment(ol, "li", liStyle, "Treatment of positive airway pressure device / Adaptive Supportive Ventilation with suitable pressure is benefit for the patient's quality of life.");
                }

                let br = document.createElement('br');
                ol.appendChild(br); 
            }

            this.setState({
                // html: ol,
                htmltext: ol.outerHTML,
                diseaseLength: this.props.nowDisease.length,
            });
        }
    }

    // 隨時更新修改的HTML內容
    handleChange = e => {
        // let parser = new DOMParser();
        // let html = parser.parseFromString(e.target.value, "text/html");
        this.setState({
            // html: html,
            htmltext: e.target.value,
        });
    };

    // 可修改的div
    render = () => {
        return <ContentEditable
            innerRef = {this.contentEditable}
            html = {this.state.htmltext}
            disabled = {false}
            onChange = {this.handleChange}
            style = {{width:"968px", height:"300px", overflowY:"scroll" ,padding:"10px", fontSize:"18px" ,fontFamily:"Times New Roman, DFKai-sb, sans-serif"}}
        />
    }
}

export default Treatment;