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
            nowDiagnosis: "",
            nowTreatment: "",
        };
        this.diagnosisBox = this.diagnosisBox.bind(this);
        this.diagnosisBoxClose = this.diagnosisBoxClose.bind(this);
        this.insertToSelected = this.insertToSelected.bind(this);
        this.deleteFromSelected = this.deleteFromSelected.bind(this);
    }
    
    // 將報告資料傳回Report
    componentDidUpdate(prevProps){
        if(prevProps.getDiagnosisData === 0 && this.props.getDiagnosisData === 1){
            let DiagnosisData = {
                FriedmanStage: document.getElementById("d1").value,
                TonsilSize: document.getElementById("d2").value,
                FriedmanTonguePosition: document.getElementById("d3").value,

                Technician: document.getElementById("d4").value,
                TechnicianDate: document.getElementById("d5").textContent,

                Physician: document.getElementById("d6").value,
                PhysicianDate: document.getElementById("d7").textContent,
                Disease: this.state.nowDiagnosis,
                Treatment: this.state.nowTreatment,
            };
            this.props.updateDiagnosisData(DiagnosisData);
        }
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

    // 根據age AHI來給予相對應的嚴重程度與治療手段
    ageAHIcondition(dText, dchangeLine, tText, tchangeLine, str0, str1, str2, str3, treat1, treat2, treat3){
        if(this.props.age <= 12){
            if(this.props.AHI <= 1) alert(str0);
            else if(this.props.AHI <= 5){
                dText.value = dText.value + dchangeLine + str1;
                tText.value = tText.value + tchangeLine + treat1;
            } 
            else if(this.props.AHI <= 10){
                dText.value = dText.value + dchangeLine + str2;
                tText.value = tText.value + tchangeLine + treat2;
            } 
            else{
                dText.value = dText.value + dchangeLine + str3;
                tText.value = tText.value + tchangeLine + treat3;
            } 
        }
        else{
            if(this.props.AHI <= 5) alert(str0);
            else if(this.props.AHI <= 15){
                dText.value = dText.value + dchangeLine + str1;
                tText.value = tText.value + tchangeLine + treat1;
            } 
            else if(this.props.AHI <= 30){
                dText.value = dText.value + dchangeLine + str2;
                tText.value = tText.value + tchangeLine + treat2;
            } 
            else{
                dText.value = dText.value + dchangeLine + str3;
                tText.value = tText.value + tchangeLine + treat3;
            } 
        }
    }

    // 編號 縮排 副標題代換
    reportFormReplace(){
        // #:編號、@:縮排、^:手動縮排、`:編號縮排、|:縮兩排
        let tText = document.getElementById("treatmentTextarea");
        let treatmentLines = tText.value.split('\n');
        tText.value = "";

        let number = 1;
        let lastSignal = "";
        for(let i=0; i<treatmentLines.length; i++){
            let tLine = treatmentLines[i];
            let signal = tLine[0];
            
            tLine = tLine.replace("#", " " + (number < 10 ? number + ".  " : number + "."));
            tLine = tLine.replace("`", " " + (number < 10 ? number + ".  " : number + "."));
            tLine = tLine.replace("@", "      ");
            tLine = tLine.replace("|", "           ");
            tLine = tLine.replace("^", lastSignal);

            if(signal === "#" || signal === "`") number++;

            if(signal === "-") lastSignal = "   ";
            else if(signal === "#") lastSignal = "      ";
            else if(signal === "`") lastSignal = "            ";
            else if(signal === "@") lastSignal = "            ";
            else if(signal === "|") lastSignal = "                  ";

            tText.value = tText.value + tLine + "\n";
        }
    }

    // 將疾病程度與診斷內容依nowDisease加入報告或移除報告
    // #:編號、@:縮排，^:手動縮排
    insertToReport(){
        
        let nowDisease = this.state.nowDisease;
        let dText = document.getElementById("diagnosisTextarea");
        let tText = document.getElementById("treatmentTextarea");
        dText.value = "";
        tText.value = "";

        // 加入Diagnosis
        // 加入Suggestive Treatment and Planning
        for(let i=0; i<nowDisease.length; i++){
            let number = nowDisease[i];
            let dchangeLine = (dText.value === "") ? "" : "\n";
            let tchangeLine = (tText.value === "") ? "" : "\n";

            // Sleep-disordered breathing (G47.8)
            if(number === "1"){
                dText.value = dText.value + dchangeLine + "Sleep-disordered breathing (G47.8).";
                tText.value = tText.value + tchangeLine + 
                "-- Sleep-disordered breathing (G47.8):\n" +
                "# Obstructive sleep apnea is not likely.";
            } 
            // Snoring (R06.83)
            else if(number === "2"){
                dText.value = dText.value + dchangeLine + "Snoring (R06.83).";
                tText.value = tText.value + tchangeLine + 
                "-- Snoring (R06.83):\n" +
                "# Obstructive sleep apnea hypopnea is not likely. \n" +
                "# Body weight control.\n" +
                "# Further treatment with mandibular advancement device or surgery may be considered, if the patient is concerned about snoring.";
            } 
            // Obstructive sleep hypopnea (G47.33)
            else if(number === "3"){
                let treat1 = "-- Obstructive sleep hypopnea (Mild) (G47.33):\n" +
                             "# Body weight control.\n" +
                             "# Further treatment of mandibular advancement device or myofunctional therapy or surgery may be considered.\n" +
                             "# AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.\n" +
                             "# AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.";
                let treat2 = "-- Obstructive sleep hypopnea (Moderate) (G47.33):\n" +
                             "# Body weight control.\n" +
                             "# Further treatment of CPAP or mandibular advancement device or myofunctional therapy or surgery may be considered.\n" +
                             "# AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.\n" +
                             "# AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.";
                let treat3 = "-- Obstructive sleep hypopnea (Severe) (G47.33):\n" +
                             "# Body weight control.\n" +
                             "# Further treatment of CPAP or surgery may be considered.\n" +
                             "# AHI > 60, AHI (REM / Non-REM) < 2, limited surgical improvement can be predicted.\n" +
                             "# AHI (Supine / Non-supine) < 2, limited body position therapy can be predicted.";

                this.ageAHIcondition(
                    dText, dchangeLine, tText, tchangeLine,
                    "AHI為正常值，無Obstructive sleep hypopnea (G47.33).", 
                    "Obstructive sleep hypopnea (Mild) (G47.33).", 
                    "Obstructive sleep hypopnea (Moderate) (G47.33).", 
                    "Obstructive sleep hypopnea (Severe) (G47.33).",
                    treat1, treat2, treat3
                );
            }
            // Obstructive sleep apnea hypopnea (G47.33)
            else if(number === "4"){
                let treat1 = "-- Obstructive sleep apnea hypopnea (Mild) (G47.33):\n" +
                             "# Body weight control.\n" +
                             "# Further treatment of mandibular advancement device or myofunctional therapy or surgery may be considered.\n" +
                             "# AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.\n" +
                             "# AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.";
                let treat2 = "-- Obstructive sleep apnea hypopnea (Moderate) (G47.33):\n" +
                             "# Body weight control.\n" +
                             "# Further treatment of CPAP or mandibular advancement device or myofunctional therapy or surgery may be considered.\n" +
                             "# AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.\n" +
                             "# AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.";
                let treat3 = "-- Obstructive sleep apnea hypopnea (Severe) (G47.33):\n" +
                             "# Body weight control.\n" +
                             "# Further treatment of CPAP or surgery may be considered.\n" +
                             "# AHI > 60, AHI (REM / Non-REM) < 2, limited surgical improvement can be predicted.\n" +
                             "# AHI (Supine / Non-supine) < 2, limited body position therapy can be predicted.";

                this.ageAHIcondition(
                    dText, dchangeLine, tText, tchangeLine,
                    "AHI為正常值，無Obstructive sleep apnea hypopnea (G47.33).",
                    "Obstructive sleep apnea hypopnea (Mild) (G47.33).",
                    "Obstructive sleep apnea hypopnea (Moderate) (G47.33).",
                    "Obstructive sleep apnea hypopnea (Severe) (G47.33).",
                    treat1, treat2, treat3
                );
            }
            // Mixed sleep hypopnea (G47.33, G47.37)
            else if(number === "5"){
                let treat1 = "-- Mixed sleep hypopnea (Mild) (G47.33, G47.37):\n" +
                             "# Body weight control.\n" +
                             "# Further treatment of mandibular advancement device or myofunctional therapy or surgery may be considered.\n" +
                             "# AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.\n" +
                             "# AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.\n" +
                             "# The possible etiologies of central sleep apnea include \n" +
                             "@ (a) congestive heart failure, \n" +
                             "@ (b) hypothyroid disease, \n" +
                             "@ (c) renal failure, \n" +
                             "@ (d) neurological disease (parkinson's dz, alzheimer's dz), \n" +
                             "@ (e) stroke, encephalitis, head injury,\n" +
                             "@ (f) medication (opioids), \n" +
                             "@ (g) unknown.";
                let treat2 = "-- Obstructive sleep apnea hypopnea (Moderate) (G47.33):\n" +
                             "# Body weight control.\n" +
                             "# Further treatment of CPAP or mandibular advancement device or myofunctional therapy or surgery may be considered.\n" +
                             "# AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.\n" +
                             "# AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.\n" +
                             "# The possible etiologies of central sleep apnea include \n" +
                             "@ (a) congestive heart failure, \n" +
                             "@ (b) hypothyroid disease, \n" +
                             "@ (c) renal failure, \n" +
                             "@ (d) neurological disease (parkinson's dz, alzheimer's dz), \n" +
                             "@ (e) stroke, encephalitis, head injury,\n" +
                             "@ (f) medication (opioids), \n" +
                             "@ (g) unknown.";
                let treat3 = "-- Obstructive sleep apnea hypopnea (Severe) (G47.33):\n" +
                             "# Body weight control.\n" +
                             "# Further treatment of CPAP or surgery may be considered.\n" +
                             "# AHI > 60, AHI (REM / Non-REM) < 2, limited surgical improvement can be predicted.\n" +
                             "# AHI (Supine / Non-supine) < 2, limited body position therapy can be predicted.\n" +
                             "# The possible etiologies of central sleep apnea include \n" +
                             "@ (a) congestive heart failure, \n" +
                             "@ (b) hypothyroid disease, \n" +
                             "@ (c) renal failure, \n" +
                             "@ (d) neurological disease (parkinson's dz, alzheimer's dz), \n" +
                             "@ (e) stroke, encephalitis, head injury,\n" +
                             "@ (f) medication (opioids), \n" +
                             "@ (g) unknown.";

                this.ageAHIcondition(
                    dText, dchangeLine, tText, tchangeLine,
                    "AHI為正常值，無Mixed sleep hypopnea (G47.33, G47.37).",
                    "Mixed sleep hypopnea (Mild) (G47.33, G47.37).",
                    "Mixed sleep hypopnea (Moderate) (G47.33, G47.37).",
                    "Mixed sleep hypopnea (Severe) (G47.33, G47.37).",
                    treat1, treat2, treat3
                );
            }
            // Mixed sleep apnea hypopnea (G47.33, G47.37)
            else if(number === "6"){
                let treat1 = "-- Mixed sleep apnea hypopnea (Mild) (G47.33, G47.37):\n" +
                             "# Body weight control.\n" +
                             "# Further treatment of mandibular advancement device or myofunctional therapy or surgery may be considered.\n" +
                             "# AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.\n" +
                             "# AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.\n" +
                             "# The possible etiologies of central sleep apnea include \n" +
                             "@ (a) congestive heart failure, \n" +
                             "@ (b) hypothyroid disease, \n" +
                             "@ (c) renal failure, \n" +
                             "@ (d) neurological disease (parkinson's dz, alzheimer's dz), \n" +
                             "@ (e) stroke, encephalitis, head injury,\n" +
                             "@ (f) medication (opioids), \n" +
                             "@ (g) unknown.";
                let treat2 = "-- Mixed sleep apnea hypopnea (Moderate) (G47.33, G47.37):\n" +
                             "# Body weight control.\n" +
                             "# Further treatment of CPAP or mandibular advancement device or myofunctional therapy or surgery may be considered.\n" +
                             "# AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.\n" +
                             "# AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.\n" +
                             "# The possible etiologies of central sleep apnea include \n" +
                             "@ (a) congestive heart failure, \n" +
                             "@ (b) hypothyroid disease, \n" +
                             "@ (c) renal failure, \n" +
                             "@ (d) neurological disease (parkinson's dz, alzheimer's dz), \n" +
                             "@ (e) stroke, encephalitis, head injury,\n" +
                             "@ (f) medication (opioids), \n" +
                             "@ (g) unknown.";
                let treat3 = "-- Mixed sleep apnea hypopnea (Severe) (G47.33, G47.37):\n" +
                             "# Body weight control.\n" +
                             "# Further treatment of CPAP or surgery may be considered.\n" +
                             "# AHI > 60, AHI (REM / Non-REM) < 2, limited surgical improvement can be predicted.\n" +
                             "# AHI (Supine / Non-supine) < 2, limited body position therapy can be predicted.\n" +
                             "# The possible etiologies of central sleep apnea include \n" +
                             "@ (a) congestive heart failure, \n" +
                             "@ (b) hypothyroid disease, \n" +
                             "@ (c) renal failure, \n" +
                             "@ (d) neurological disease (parkinson's dz, alzheimer's dz), \n" +
                             "@ (e) stroke, encephalitis, head injury,\n" +
                             "@ (f) medication (opioids), \n" +
                             "@ (g) unknown.";

                this.ageAHIcondition(
                    dText, dchangeLine, tText, tchangeLine,
                    "AHI為正常值，無Mixed sleep apnea hypopnea (G47.33, G47.37).",
                    "Mixed sleep apnea hypopnea (Mild) (G47.33, G47.37).",
                    "Mixed sleep apnea hypopnea (Moderate) (G47.33, G47.37).",
                    "Mixed sleep apnea hypopnea (Severe) (G47.33, G47.37).",
                    treat1, treat2, treat3
                );
            }
            // Central sleep hypopnea (G47.37)
            else if(number === "7"){
                let treat1 = "-- Central sleep hypopnea (Mild) (G47.37):\n" +
                             "# Obstructive sleep apnea hypopnea is not likely.\n" +
                             "# The possible etiologies of central sleep hypopnea include \n" +
                             "@ (a) congestive heart failure, \n" +
                             "@ (b) hypothyroid disease, \n" +
                             "@ (c) renal failure, \n" +
                             "@ (d) neurological disease (parkinson's dz, alzheimer's dz), \n" +
                             "@ (e) stroke, encephalitis, head injury,\n" +
                             "@ (f) medication (opioids), \n" +
                             "@ (g) unknown.";
                let treat2 = "-- Central sleep hypopnea (Mild) (G47.37):\n" +
                             "# Obstructive sleep apnea hypopnea is not likely.\n" +
                             "# The possible etiologies of central sleep hypopnea include \n" +
                             "@ (a) congestive heart failure, \n" +
                             "@ (b) hypothyroid disease, \n" +
                             "@ (c) renal failure, \n" +
                             "@ (d) neurological disease (parkinson's dz, alzheimer's dz), \n" +
                             "@ (e) stroke, encephalitis, head injury,\n" +
                             "@ (f) medication (opioids), \n" +
                             "@ (g) unknown.";
                let treat3 = "-- Central sleep hypopnea (Severe) (G47.37):\n" +
                             "# Obstructive sleep apnea hypopnea is not likely.\n" +
                             "# The possible etiologies of central sleep hypopnea include \n" +
                             "@ (a) congestive heart failure, \n" +
                             "@ (b) hypothyroid disease, \n" +
                             "@ (c) renal failure, \n" +
                             "@ (d) neurological disease (parkinson's dz, alzheimer's dz), \n" +
                             "@ (e) stroke, encephalitis, head injury,\n" +
                             "@ (f) medication (opioids), \n" +
                             "@ (g) unknown.";

                this.ageAHIcondition(
                    dText, dchangeLine, tText, tchangeLine,
                    "AHI為正常值，無Central sleep hypopnea (G47.37).",
                    "Central sleep hypopnea (Mild) (G47.37).",
                    "Central sleep hypopnea (Moderate) (G47.37).",
                    "Central sleep hypopnea (Severe) (G47.37).",
                    treat1, treat2, treat3
                );
            }
            // Central sleep apnea hypopnea (G47.37)
            else if(number === "8"){
                let treat1 = "-- Central sleep apnea hypopnea (Mild) (G47.37):\n" +
                             "# Obstructive sleep apnea hypopnea is not likely.\n" +
                             "# The possible etiologies of central sleep apnea include \n" +
                             "@ (a) congestive heart failure, \n" +
                             "@ (b) hypothyroid disease, \n" +
                             "@ (c) renal failure, \n" +
                             "@ (d) neurological disease (parkinson's dz, alzheimer's dz), \n" +
                             "@ (e) stroke, encephalitis, head injury,\n" +
                             "@ (f) medication (opioids), \n" +
                             "@ (g) unknown.";
                let treat2 = "-- Central sleep apnea hypopnea (Moderate) (G47.37):\n" +
                             "# Obstructive sleep apnea hypopnea is not likely.\n" +
                             "# The possible etiologies of central sleep apnea include \n" +
                             "@ (a) congestive heart failure, \n" +
                             "@ (b) hypothyroid disease, \n" +
                             "@ (c) renal failure, \n" +
                             "@ (d) neurological disease (parkinson's dz, alzheimer's dz), \n" +
                             "@ (e) stroke, encephalitis, head injury,\n" +
                             "@ (f) medication (opioids), \n" +
                             "@ (g) unknown.";
                let treat3 = "-- Central sleep apnea hypopnea (Severe) (G47.37):\n" +
                             "# Obstructive sleep apnea hypopnea is not likely.\n" +
                             "# The possible etiologies of central sleep apnea include \n" +
                             "@ (a) congestive heart failure, \n" +
                             "@ (b) hypothyroid disease, \n" +
                             "@ (c) renal failure, \n" +
                             "@ (d) neurological disease (parkinson's dz, alzheimer's dz), \n" +
                             "@ (e) stroke, encephalitis, head injury,\n" +
                             "@ (f) medication (opioids), \n" +
                             "@ (g) unknown.";

                this.ageAHIcondition(
                    dText, dchangeLine, tText, tchangeLine,
                    "AHI為正常值，無Central sleep apnea hypopnea (G47.37).",
                    "Central sleep apnea hypopnea (Mild) (G47.37).",
                    "Central sleep apnea hypopnea (Moderate) (G47.37).",
                    "Central sleep apnea hypopnea (Severe) (G47.37).",
                    treat1, treat2, treat3
                );
            }
            // Obstructive sleep hypopnea, treated (G47.33)
            else if(number === "9"){
                let treat1 = "-- Obstructive sleep hypopnea, treated (Mild) (G47.33):\n" +
                             "# Compared with pre-Tx PSG report, OSA severity is improved obviously.\n" +
                             "# Body weight control.\n" +
                             "# Further treatment of mandibular advancement device or myofunctional therapy or surgery may be considered.\n" +
                             "# AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.\n" +
                             "# AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.";
                let treat2 = "-- Obstructive sleep hypopnea, treated (Moderate) (G47.33):\n" +
                             "# Compared with pre-Tx PSG report, OSA severity is improved limitedly.\n" +
                             "# Body weight control.\n" +
                             "# Further treatment of CPAP or mandibular advancement device or myofunctional therapy or surgery may be considered.\n" +
                             "# AHI (REM / Non-REM) < 2, limited surgical improvement can be predicted.\n" +
                             "# AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.";
                let treat3 = "-- Obstructive sleep hypopnea, treated (Severe) (G47.33):\n" +
                             "# Compared with pre-Tx PSG report, OSA severity is improved limitedly.\n" +
                             "# Body weight control.\n" +
                             "# Further treatment of CPAP or surgery may be considered.\n" +
                             "# AHI > 60, AHI (REM / Non-REM) < 2, limited surgical improvement can be predicted.\n" +
                             "# AHI (Supine / Non-supine) < 2, limited body position therapy can be predicted.";

                this.ageAHIcondition(
                    dText, dchangeLine, tText, tchangeLine,
                    "AHI為正常值，無Obstructive sleep hypopnea, treated (G47.33).",
                    "Obstructive sleep hypopnea, treated (Mild) (G47.33).",
                    "Obstructive sleep hypopnea, treated (Moderate) (G47.33).",
                    "Obstructive sleep hypopnea, treated (Severe) (G47.33).",
                    treat1, treat2, treat3
                );
            }
            // Obstructive sleep apnea hypopnea, treated (G47.33)
            else if(number === "10"){
                let treat1 = "-- Obstructive sleep apnea hypopnea, treated (Mild) (G47.33):\n" +
                             "# Compared with pre-Tx PSG report, OSA severity is improved obviously.\n" +
                             "# Body weight control.\n" +
                             "# Further treatment of mandibular advancement device or myofunctional therapy or surgery may be considered.\n" +
                             "# AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.\n" +
                             "# AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.";
                let treat2 = "-- Obstructive sleep apnea hypopnea, treated (Moderate) (G47.33):\n" +
                             "# Compared with pre-Tx PSG report, OSA severity is improved limitedly.\n" +
                             "# Body weight control.\n" +
                             "# Further treatment of CPAP or mandibular advancement device or myofunctional therapy or surgery may be considered.\n" +
                             "# AHI (REM / Non-REM) < 2, limited surgical improvement can be predicted.\n" +
                             "# AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.";
                let treat3 = "-- Obstructive sleep apnea hypopnea, treated (Severe) (G47.33):\n" +
                             "# Compared with pre-Tx PSG report, OSA severity is improved limitedly.\n" +
                             "# Body weight control.\n" +
                             "# Further treatment of CPAP or surgery may be considered.\n" +
                             "# AHI > 60, AHI (REM / Non-REM) < 2, limited surgical improvement can be predicted.\n" +
                             "# AHI (Supine / Non-supine) < 2, limited body position therapy can be predicted.";

                this.ageAHIcondition(
                    dText, dchangeLine, tText, tchangeLine,
                    "AHI為正常值，無Obstructive sleep apnea hypopnea, treated (G47.33).",
                    "Obstructive sleep apnea hypopnea, treated (Mild) (G47.33).",
                    "Obstructive sleep apnea hypopnea, treated (Moderate) (G47.33).",
                    "Obstructive sleep apnea hypopnea, treated (Severe) (G47.33).",
                    treat1, treat2, treat3
                );
            }
            // Mixed sleep apnea hypopnea, treated (G47.33, G47.37)
            else if(number === "11"){
                let treat1 = "-- Mixed sleep apnea hypopnea, treated (Mild) (G47.33, G47.37):\n" +
                             "# Compared with pre-Tx PSG report, OSA severity is improved obviously.\n" +
                             "# Body weight control.\n" +
                             "# Further treatment of mandibular advancement device or myofunctional therapy or surgery may be considered.\n" +
                             "# AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.\n" +
                             "# AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.\n" +
                             "# The possible etiologies of central sleep apnea include \n" +
                             "@ (a) congestive heart failure, \n" +
                             "@ (b) hypothyroid disease, \n" +
                             "@ (c) renal failure, \n" +
                             "@ (d) neurological disease (parkinson's dz, alzheimer's dz), \n" +
                             "@ (e) stroke, encephalitis, head injury,\n" +
                             "@ (f) medication (opioids), \n" +
                             "@ (g) unknown.";
                let treat2 = "-- Mixed sleep apnea hypopnea, treated (Moderate) (G47.33, G47.37):\n" +
                             "# Compared with pre-Tx PSG report, OSA severity is improved limitedly.\n" +
                             "# Body weight control.\n" +
                             "# Further treatment of CPAP or mandibular advancement device or myofunctional therapy or surgery may be considered.\n" +
                             "# AHI (REM / Non-REM) < 2, limited surgical improvement can be predicted.\n" +
                             "# AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.\n" +
                             "# The possible etiologies of central sleep apnea include \n" +
                             "@ (a) congestive heart failure, \n" +
                             "@ (b) hypothyroid disease, \n" +
                             "@ (c) renal failure, \n" +
                             "@ (d) neurological disease (parkinson's dz, alzheimer's dz), \n" +
                             "@ (e) stroke, encephalitis, head injury,\n" +
                             "@ (f) medication (opioids), \n" +
                             "@ (g) unknown.";
                let treat3 = "-- Mixed sleep apnea hypopnea, treated (Severe) (G47.33, G47.37):\n" +
                             "# Compared with pre-Tx PSG report, OSA severity is improved limitedly.\n" +
                             "# Body weight control.\n" +
                             "# Further treatment of CPAP or surgery may be considered.\n" +
                             "# AHI > 60, AHI (REM / Non-REM) < 2, limited surgical improvement can be predicted.\n" +
                             "# AHI (Supine / Non-supine) < 2, limited body position therapy can be predicted.\n" +
                             "# The possible etiologies of central sleep apnea include \n" +
                             "@ (a) congestive heart failure, \n" +
                             "@ (b) hypothyroid disease, \n" +
                             "@ (c) renal failure, \n" +
                             "@ (d) neurological disease (parkinson's dz, alzheimer's dz), \n" +
                             "@ (e) stroke, encephalitis, head injury,\n" +
                             "@ (f) medication (opioids), \n" +
                             "@ (g) unknown.";

                this.ageAHIcondition(
                    dText, dchangeLine, tText, tchangeLine,
                    "AHI為正常值，無Mixed sleep apnea hypopnea, treated (Mild) (G47.33, G47.37).",
                    "Mixed sleep apnea hypopnea, treated (Mild) (G47.33, G47.37).",
                    "Mixed sleep apnea hypopnea, treated (Moderate) (G47.33, G47.37).",
                    "Mixed sleep apnea hypopnea, treated (Severe) (G47.33, G47.37).",
                    treat1, treat2, treat3
                );
            }
            // Poor sleep efficiency (G47.8)
            else if(number === "12"){
                dText.value = dText.value + dchangeLine + "Poor sleep efficiency (G47.8).";
                // Sleep latency、Awake time、Total sleep time、Sleep efficiency
                tText.value = tText.value + tchangeLine + 
                "-- Poor sleep efficiency (G47.8):\n" +
                "# Sleep latency " + (this.props.sot / 2).toFixed(1) + " min; Awake time " + ((this.props.wake - this.props.sot) / 2).toFixed(1) + " min; Total sleep time " + ((this.props.epochNum - this.props.wake) / 2).toFixed(1) + " min; Sleep efficiency " + (((this.props.epochNum - this.props.wake) /this.props.epochNum) * 100).toFixed(1) + " %; the representation of \n" +
                "^ this PSG report is limited.";
            }
            // Under treatment of CPAP
            else if(number === "13"){
                dText.value = dText.value + dchangeLine + "Under treatment of CPAP.";
                tText.value = tText.value + tchangeLine + 
                "-- Under treatment of CPAP:\n" +
                "# With the use of CPAP (15 cmH2O), OSA severity was improved significantly.";
            }
            // Under treatment of oral appliance
            else if(number === "14"){
                dText.value = dText.value + dchangeLine + "Under treatment of oral appliance.";
                tText.value = tText.value + tchangeLine + 
                "-- Under treatment of oral appliance:\n" +
                "# With the use of oral appliance, OSA severity was improved partially.";
            }
            // Treatment of myofunctional therapy
            else if(number === "15"){
                dText.value = dText.value + dchangeLine + "Treatment of myofunctional therapy.";
                tText.value = tText.value + tchangeLine + 
                "-- Treatment of myofunctional therapy:\n" +
                "# Compared with pre-Tx PSG report, OSA severity is improved partially.";
            }
            // Treatment of body-weight control
            else if(number === "16"){
                dText.value = dText.value + dchangeLine + "Treatment of body-weight control.";
                tText.value = tText.value + tchangeLine + 
                "-- Treatment of body-weight control:\n" +
                "# Compared with pre-Tx PSG report, OSA severity is improved partially.";
            }
            // Suspect periodic limb movement (G47.61)
            else if(number === "17"){
                dText.value = dText.value + dchangeLine + "Suspect periodic limb movement (G47.61).";
                tText.value = tText.value + tchangeLine + 
                "-- Suspect periodic limb movement (G47.61):\n" +
                "# PLM index ≦ 15; further evaluation of periodic leg movement may be considered, if the clinical symptoms / signs are \n" +
                "^ correlated. ";
            }
            // Periodic limb movement (G47.61)
            else if(number === "18"){
                dText.value = dText.value + dchangeLine + "Periodic limb movement (G47.61).";
                tText.value = tText.value + tchangeLine + 
                "-- Periodic limb movement (G47.61):\n" +
                "# PLM index > 15; further evaluation of periodic leg movement may be considered, if the clinical symptoms / signs are \n" +
                "^ correlated. \n" +
                "` (a) Periodic limb movement disorder can be primary or secondary. \n" +
                "@ (b) Secondary PLMD has many different causes, including the following: DM, Iron deficiency, Anemia, Uremia, Spinal \n" +
                "^ cord tumor / injury, OSA, Narcolepsy, Medication (Neuroleptics, antidopaminergic agents, tricyclic antidepressants), \n" +
                "^ Withdrawal from sedative medications. \n" +
                "@ (c) Lab tests: CBC, Hb, BUN, Crea, GOT, GPT, Glucose, Ca, Na, K, serum iron & TIBC, ferritin, folate, Vit. B12, TSH, \n" +
                "^ T3, T4.\n" +
                "@ (d) Benzodiazepines (eg. Clonazepam, Rivotril) is probably the most widely used drug to treat PLMD. In fact, medical therapy \n" +
                "^ does not cure PLMD but relieves symptoms.";
            }
            // Suspect autonomic dysfunction (F41.9)
            else if(number === "19"){
                dText.value = dText.value + dchangeLine + "Suspect autonomic dysfunction (F41.9).";
                tText.value = tText.value + tchangeLine + 
                "-- Suspect autonomic dysfunction (F41.9):\n" +
                "# According the patient's history, further evaluation of autonomic function is suggested.";
            }
            // Suspect poor quality of life
            else if(number === "20"){
                dText.value = dText.value + dchangeLine + "Suspect poor quality of life.";
                tText.value = tText.value + tchangeLine + 
                "-- Suspect poor quality of life:\n" +
                "# Further evaluation and improvement of quality of life may be considered, if the clinical findings are correlated.";
            }
            // Suspect tinnitus (H93.19)
            else if(number === "21"){
                dText.value = dText.value + dchangeLine + "Suspect tinnitus (H93.19).";
                tText.value = tText.value + tchangeLine + 
                "-- Suspect tinnitus (H93.19):\n" +
                "# Further evaluation and treatment of tinnitus may be considered, if the clinical symptoms / signs are correlated.";
            }
            // Suspect Gastro-Esophageal reflux disease (GERD) (K21.0)
            else if(number === "22"){
                dText.value = dText.value + dchangeLine + "Suspect Gastro-Esophageal reflux disease (GERD) (K21.0).";
                tText.value = tText.value + tchangeLine + 
                "-- Suspect Gastro-Esophageal reflux disease (GERD) (K21.0):\n" +
                "# Further evaluation of GERD may be considered, if the clinical symptoms / signs are correlated.";
            }
            // Suspect cardiac arrhythmia (I49.9)
            else if(number === "23"){
                dText.value = dText.value + dchangeLine + "Suspect cardiac arrhythmia (I49.9).";
                tText.value = tText.value + tchangeLine + 
                "-- Suspect cardiac arrhythmia (I49.9):\n" +
                "# Further evaluation of cardiac arrhythmia may be considered, if the clinical symptoms / signs are correlated.";
            }
            // Sleep bruxism (G47.63)
            else if(number === "24"){
                dText.value = dText.value + dchangeLine + "Sleep bruxism (G47.63).";
                tText.value = tText.value + tchangeLine + 
                "-- Sleep bruxism (G47.63):\n" +
                "# Due to sleep bruxism, further dental evaluation and management may be considered.";
            }
            // Alpha sleep
            else if(number === "25"){
                dText.value = dText.value + dchangeLine + "Alpha sleep.";
                tText.value = tText.value + tchangeLine + 
                "-- Alpha sleep:\n" +
                "# According the patient's history, further evaluation of alpha sleep is suggested.";
            }
            // Suspect REM behavior disorder (G47.52)
            else if(number === "26"){
                dText.value = dText.value + dchangeLine + "Suspect REM behavior disorder (G47.52).";
                tText.value = tText.value + tchangeLine + 
                "-- Suspect REM behavior disorder (G47.52):\n" +
                "# REM behavior disorder often may be associated with medication (such as antidepressant, Beta-blockers, anticholinesterase \n" +
                "^ inhibitors) or other neurological conditions (such as, dementia, Parkinson's disease, multiple system atrophy). Further \n" +
                "^ diagnosis and management by psychiatrist or neurologist may be considered.";
            }
            // Suspect REM behavior disorder, provisionally (G47.52)
            else if(number === "27"){
                dText.value = dText.value + dchangeLine + "Suspect REM behavior disorder, provisionally (G47.52).";
                tText.value = tText.value + tchangeLine + 
                "-- Suspect REM behavior disorder, provisionally (G47.52):\n" +
                "# REM behavior disorder often may be associated with medication (such as antidepressant, Beta-blockers, anticholinesterase \n" +
                "^ inhibitors) or other neurological conditions (such as, dementia, Parkinson's disease, multiple system atrophy). Further \n" +
                "^ diagnosis and management by psychiatrist or neurologist may be considered.";
            }
            // Subclinical REM behavior disorder (G47.52)
            else if(number === "28"){
                dText.value = dText.value + dchangeLine + "Subclinical REM behavior disorder (G47.52).";
                tText.value = tText.value + tchangeLine + 
                "-- Subclinical REM behavior disorder (G47.52):\n" +
                "# Further clinical observation about dream-enacting behaviors should be followed. \n" +
                "# REM sleep behavior without atonia (RSWA) often may be associated with medication (such as antidepressant, Beta-blockers, \n" +
                "^ anticholinesterase inhibitors) or predisposing factors of other neurological conditions (such as, dementia, Parkinson's disease, \n" +
                "^ multiple system atrophy). Further diagnosis and management by psychiatrist or neurologist may be considered.";
            }
            // Suspect idiopathic REM behavior disorder (G47.52)
            else if(number === "29"){
                dText.value = dText.value + dchangeLine + "Suspect idiopathic REM behavior disorder (G47.52).";
                tText.value = tText.value + tchangeLine + 
                "-- Suspect idiopathic REM behavior disorder (G47.52):\n" +
                "# REM sleep behavior without atonia (RSWA) often may be associated with medication (such as antidepressant, Beta-blockers, \n" +
                "^ anticholinesterase inhibitors) or predisposing factors of other neurological conditions (such as, dementia, Parkinson's disease, \n" +
                "^ multiple system atrophy). Further diagnosis and management by psychiatrist or neurologist may be considered.";
            }
            // Suspect nocturia (R35.1)
            else if(number === "30"){
                dText.value = dText.value + dchangeLine + "Suspect nocturia (R35.1).";
                tText.value = tText.value + tchangeLine + 
                "-- Suspect nocturia (R35.1):\n" +
                "# Further evaluation of nocturia may be considered, if the clinical symptoms / signs are correlated.";
            }
            // Sleep related groaning (G47.8)
            else if(number === "31"){
                dText.value = dText.value + dchangeLine + "Sleep related groaning (G47.8).";
                tText.value = tText.value + tchangeLine + 
                "-- Sleep related groaning (G47.8):\n" +
                "# According the patient's history, further evaluation of sleep related groaning is suggested.";
            }
            // Suspect disorder of arousal from NREM Sleep
            else if(number === "32"){
                dText.value = dText.value + dchangeLine + "Suspect disorder of arousal from NREM Sleep.";
                tText.value = tText.value + tchangeLine + 
                "-- Suspect disorder of arousal from NREM Sleep:\n" +
                "` (a) Disorders of arousal from NREM sleep include confusional arousals, sleep walking and sleep terrors. However, other \n" +
                "^ conditions that mimic the disorders of arousal should be ruled-out, such as:\n" +
                "| (i)   Neurologic condition (Seizures, Cluster headaches)\n" +
                "| (ii)  Medical condition (Obstructive sleep apnea, Gastroesophageal reflux) \n" +
                "| (iii) Behavioral/Psychiatric condition (Conditioned arousals, Post-traumatic stress disorder, Nocturnal dissociative state, \n" +
                "^ Nocturnal panic)\n" +
                "| (iv) Other sleep condition (Nightmares, Rhythmic movements of sleep, Rapid eye movement sleep behavior disorders, \n" +
                "^ Periodic movements of sleep, Sleep deprivation, Irregular sleep-wake schedule)\n" +
                "| (v)  Evaluate the complete sleep history, arrange home videotapes, expanded EEG montage with continuous audiovisual \n" +
                "^ monitoring and multiple night studies could be considered.\n" +
                "` (b) The treatment in disorders of arousal from NREM sleep is often not necessary. Reassurance of their typically benign \n" +
                "^ nature, lack of psychological significance, and the tendency to diminish over time, is often sufficient.\n" +
                "` (c) Pharmacologic treatment such as tricyclic antidepressants and benzodiazepines may be effective, and they should be \n" +
                "^ administered if the activity is dangerous to person or property or extremely disruptive to family members.\n" +
                "` (d) Nonpharmacologic treatment such as psychotherapy, progressive relaxation, or hypnosis is recommended for long-term \n" +
                "^ management. Sleep hygiene such as the avoidance of precipitants such as drugs and sleep deprivation is also important.";
            }
            // Suspected sleep-related hypoventilation disorder (G47.36)
            else if(number === "33"){
                dText.value = dText.value + dchangeLine + "Suspected sleep-related hypoventilation disorder (G47.36).";
                tText.value = tText.value + tchangeLine + 
                "-- Suspected sleep-related hypoventilation disorder (G47.36):\n" +
                "# Classification of hypoventilation disorders: Primary (Congenital central alveolar hypoventilation syndrome, Idiopathic \n" +
                "^ central alveolar hypoventilation); Secondary (Sleep-related hypoventilation due to a medication or substance, Sleep-related \n" +
                "^ hypoventilation due to a medical disorder, Obesity hypoventilation syndrome, Late-onset central hypoventilation with \n" +
                "^ hypothalamic dysfunction).\n" +
                "@ (a) Chronic hypoventilation criteria: hypercapnia in wakefulness and sleep (PaCO2, Arterial carbon dioxide level ≧ 45 \n" +
                "^ mmHg).\n" +
                "@ (b) Obstructive lung diseases (Asthma, COPD) should be excluded by pulmonary function test.\n" +
                "@ (c) Obesity-hypoventilation syndrome is most prevalent and treatable.\n" +
                "@ (d) Other subtypes share common features and underlying disorders with central sleep apnea.\n" +
                "@ (e) Body weight control and BiPAP are mainstay treatment. Respiratory stimulants like acetazolamide, medroxyprogesterone \n" +
                "^ and theophylline could be considered.";
            }
            // Suspect Cheyne-Stokes Breathing
            else if(number === "34"){
                dText.value = dText.value + dchangeLine + "Suspect Cheyne-Stokes Breathing.";
                tText.value = tText.value + tchangeLine + 
                "-- Suspect Cheyne-Stokes Breathing:\n" +
                "# Treatment of positive airway pressure device / Adaptive Supportive Ventilation with suitable pressure is benefit for the \n" +
                "^ patient's quality of life.";
            }
        }

        // 在state中存一份未編號未縮排，將傳至server生成word
        this.setState({
            nowDiagnosis: dText.value,
            nowTreatment: tText.value,
        });

        // 縮排、排版、編號
        this.reportFormReplace();
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
                                <td width="15%"><input id="d1" className="myInput write"/></td>
                                <td width="15%">Tonsil size: </td>
                                <td width="10%"><input id="d2" className="myInput write"/></td>
                                <td colSpan="2" width="25%">Friedman tongue position: </td>
                                <td width="15%"><input id="d3" className="myInput write"/></td>
                            </tr>
                            <tr>
                                <td colSpan="7"><textarea style={{width:"968px", height:"300px", padding:"10px", fontSize:"18px" ,fontFamily:"Times New Roman, DFKai-sb, sans-serif"}}/></td>
                            </tr>
                            <tr>
                                <td colSpan="4"></td>
                                <td width="15%">Technician: </td>
                                <td width="15%"><input id="d4" className="myInput write"/></td>
                                <td width="15%"><span id="d5"></span></td>
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
                                <td colSpan="4"><textarea id="treatmentTextarea" style={{width:"968px", height:"300px", padding:"10px", fontSize:"18px" ,fontFamily:"Times New Roman, DFKai-sb, sans-serif"}}/></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td width="15%">Physician: </td>
                                <td width="15%"><input id="d6" className="myInput write"/></td>
                                <td width="15%"><span id="d7"></span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Diagnosis;