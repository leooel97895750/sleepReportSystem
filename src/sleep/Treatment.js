import React from 'react';
import ContentEditable from 'react-contenteditable'
import '../css/treatment.css';

class Treatment extends React.Component{
    constructor(props){
        super(props);
        this.contentEditable = React.createRef();
        this.state = {
            html: "",
            htmltext: "",
            diseaseLength: 0,
        };
    }

    // ol子元素掛載
    insertTreatment(parent, cType, cStyle, cText){
        let child = document.createElement(cType);
        child.setAttribute('style', cStyle);
        child.innerHTML = cText;
        parent.appendChild(child);
    }

    componentDidUpdate(){

        // 疾病代號陣列改變時重新掛載li
        if(this.state.diseaseLength !== this.props.nowDisease.length){
            let ol = document.createElement('ol');
            ol.setAttribute("margin", "0px");
            let titleStyle = "position: relative; left: -15px";
            let liStyle = "";

            let nowDisease = this.props.nowDisease;
            for(let i=0; i<nowDisease.length; i++){
                if(nowDisease[i] === '1'){
                    this.insertTreatment(ol, "div", titleStyle, "-- Sleep-disordered breathing (G47.8):");
                    this.insertTreatment(ol, "li", liStyle, "Obstructive sleep apnea is not likely.");
                }
                else if(nowDisease[i] === '2'){
                    this.insertTreatment(ol, "div", titleStyle, "-- Snoring (R06.83):");
                    this.insertTreatment(ol, "li", liStyle, "Obstructive sleep apnea hypopnea is not likely.");
                    this.insertTreatment(ol, "li", liStyle, "Body weight control.");
                    this.insertTreatment(ol, "li", liStyle, "Further treatment with mandibular advancement device or surgery may be considered, if the patient is concerned about snoring.");
                }
                else if(nowDisease[i] === '3'){
                    if(this.props.age <= 12){
                        if(this.props.AHI <= 1) alert(str0);
                        else if(this.props.AHI <= 5){
                            this.insertTreatment(ol, "div", titleStyle, "-- Obstructive sleep hypopnea (Mild) (G47.33):");
                            this.insertTreatment(ol, "li", liStyle, "Body weight control.");
                            this.insertTreatment(ol, "li", liStyle, "Further treatment of mandibular advancement device or myofunctional therapy or surgery may be considered.");
                            this.insertTreatment(ol, "li", liStyle, "AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.");
                            this.insertTreatment(ol, "li", liStyle, "AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.");
                        } 
                        else if(this.props.AHI <= 10){
                            this.insertTreatment(ol, "div", titleStyle, "-- Obstructive sleep hypopnea (Moderate) (G47.33):");
                            this.insertTreatment(ol, "li", liStyle, "Body weight control.");
                            this.insertTreatment(ol, "li", liStyle, "Further treatment of CPAP or mandibular advancement device or myofunctional therapy or surgery may be considered.");
                            this.insertTreatment(ol, "li", liStyle, "AHI (REM / Non-REM) > 2, good surgical improvement can be predicted.");
                            this.insertTreatment(ol, "li", liStyle, "AHI (Supine / Non-supine) > 2, good body position therapy can be predicted.");
                        } 
                        else{
                            this.insertTreatment(ol, "div", titleStyle, "-- Obstructive sleep hypopnea (Severe) (G47.33):");
                            this.insertTreatment(ol, "li", liStyle, "Body weight control.");
                            this.insertTreatment(ol, "li", liStyle, "Further treatment of CPAP or surgery may be considered.");
                            this.insertTreatment(ol, "li", liStyle, "AHI > 60, AHI (REM / Non-REM) < 2, limited surgical improvement can be predicted.");
                            this.insertTreatment(ol, "li", liStyle, "AHI (Supine / Non-supine) < 2, limited body position therapy can be predicted.");
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
                
            }

            this.setState({
                html: ol,
                htmltext: ol.outerHTML,
                diseaseLength: this.props.nowDisease.length,
            });
        }
    }

    // 隨時更新修改的HTML內容
    handleChange = e => {
        let parser = new DOMParser();
        let html = parser.parseFromString(e.target.value, "text/html");
        this.setState({
            html: html,
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
            style = {{width:"968px", height:"300px", padding:"10px", fontSize:"18px" ,fontFamily:"Times New Roman, DFKai-sb, sans-serif"}}
        />
    }
}

export default Treatment;