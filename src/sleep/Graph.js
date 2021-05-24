import React from 'react';
import '../css/graph.css';


// Report繪圖
class Graph extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        };
    }

    // component掛載完成後繪製
    // 左邊為Label，右邊根據時間劃分區間
    componentDidUpdate(){

        // 1.                  
        // baseline繪製 (100*800)
        //                     
        let bHeight = 100;
        let bWidth = 800;
		let bCanvas = document.getElementById("bCanvas");
        bCanvas.height = bHeight;
        bCanvas.width = bWidth;
        let bCTX = bCanvas.getContext("2d");
        // 左側Label
        bCTX.font = "14px Arial";
        bCTX.fillText("Time", 5, 15);
        bCTX.fillText("Hrs", 5, 40);
        bCTX.fillText("Epoch", 5, 65);
        // 畫橫時間軸
        bCTX.beginPath();
        bCTX.moveTo(100, 25);
        bCTX.lineTo(bWidth, 25);
        bCTX.strokeStyle = 'black';
        bCTX.lineWidth = "1";
        bCTX.stroke();
        // 畫Block刻度
        
        let blockNum = Math.ceil(this.props.epochNum / 120);
        let blockWidth = Math.floor((bWidth - 110) / blockNum);
        for(let i=0; i<=blockNum; i++){
            bCTX.beginPath();
            bCTX.moveTo(100 + blockWidth*i, 25);
            bCTX.lineTo(100 + blockWidth*i, 30);
            bCTX.strokeStyle = "black";
            bCTX.lineWidth = "1";
            bCTX.stroke();
            bCTX.font = "14px Arial";
            bCTX.textAlign = "center";
            bCTX.fillText(i, (100 + blockWidth*i), 44);
            bCTX.fillText((i*120 + 1), 100 + (blockWidth*i), 65);
        }
        // 畫時間刻度
        let startTimeSplit = this.props.startTime.split(':');
        let startHour = Number(startTimeSplit[0]);
        let delaySec = Number(startTimeSplit[1])*60 + Number(startTimeSplit[2]);
        let clockWidth = (delaySec * blockWidth) / 3600;
        console.log(delaySec);
        for(let i=1; i<=blockNum; i++){
            startHour += 1;
            let printHour = startHour;
            if(printHour > 24) printHour -= 24;
            if(printHour > 12) printHour = String(printHour - 12) + 'PM';
            else printHour = String(printHour) + 'AM';
            
            bCTX.beginPath();
            bCTX.moveTo(100 + blockWidth*i - clockWidth, 25);
            bCTX.lineTo(100 + blockWidth*i - clockWidth, 20);
            bCTX.strokeStyle = "black";
            bCTX.lineWidth = "1";
            bCTX.stroke();
            bCTX.font = "12px Arial";
            bCTX.textAlign = "center";
            bCTX.fillText(printHour, (100 + blockWidth*i - clockWidth), 14);
        }
        // 印開始和結束時間
        bCTX.font = "12px Arial";
        bCTX.textAlign = "start";
        bCTX.fillText(this.props.startTime, 100-4, 85);
        bCTX.textAlign = "end";
        bCTX.fillText(this.props.endTime, bWidth, 85);

        // 2.                  
        // Hypnogram繪製 (100*800)
        //
        let hHeight = 100;
        let hWidth = 800;
		let hCanvas = document.getElementById("hCanvas");
        hCanvas.height = hHeight;
        hCanvas.width = hWidth;
        let hCTX = hCanvas.getContext("2d");
        // 左側Label
        hCTX.font = "14px Arial";
        hCTX.textAlign = "end";
        hCTX.fillStyle = "#AA0000";
        hCTX.fillText("R", 85, 15);
        hCTX.fillStyle = "black";
        hCTX.fillText("W", 85, 30);
        hCTX.fillStyle = "#CCAA00";
        hCTX.fillText("N1", 85, 45);
        hCTX.fillStyle = "green";
        hCTX.fillText("N2", 85, 60);
        hCTX.fillStyle = "blue";
        hCTX.fillText("N3", 85, 75);
        // 畫橫時間軸
        hCTX.beginPath();
        hCTX.moveTo(100, 25);
        hCTX.lineTo(hWidth, 25);
        hCTX.strokeStyle = 'gray';
        hCTX.lineWidth = "1";
        hCTX.stroke();
        // 畫Block刻度
        for(let i=1; i<blockNum; i++){
            hCTX.beginPath();
            hCTX.moveTo(100 + blockWidth*i, 0);
            hCTX.lineTo(100 + blockWidth*i, 85);
            hCTX.strokeStyle = "gray";
            hCTX.lineWidth = "1";
            hCTX.stroke();

        }
        // 畫階段圖，因canvas最小單位為1px，採平均隨機抽樣
        let sleepStage = this.props.sleepStage;
        let stageLength = Math.ceil(((hWidth - 100) * sleepStage.length)/ (blockNum * 120));
        let randomStage = Array.from(sleepStage);
        console.log(randomStage);
        let deleteNum = sleepStage.length - stageLength;
        console.log(deleteNum);
        if(deleteNum > 0){
            let deleteSpace = Math.floor(sleepStage.length / deleteNum);
            console.log(deleteSpace);
            // 從尾部平均刪除
            for(let i=deleteNum-1; i>=0; i--){
                randomStage.splice(i*deleteSpace, 1);
            }                                                                                                                                                                                         
        }
        console.log(stageLength, randomStage.length);

        for(let i=0; i<stageLength; i++){
            
            if(randomStage[i] === 5){
                hCTX.fillStyle = "#AA0000";
                hCTX.fillRect(100+i, 10, 1, 15);
                hCTX.stroke();
            }
            else{
                if(randomStage[i] === 3){
                    hCTX.fillStyle = "blue";
                    hCTX.fillRect(100+i, 25, 1, 45);
                    hCTX.stroke();
                }
                if(randomStage[i] === 2){
                    hCTX.fillStyle = "green";
                    hCTX.fillRect(100+i, 25, 1, 30);
                    hCTX.stroke();
                }
                if(randomStage[i] === 1){
                    hCTX.fillStyle = "#EEEE00";
                    hCTX.fillRect(100+i, 25, 1, 15);
                    hCTX.stroke();
                }
            } 
        }
	}

    render(){
        return(
            <div style={{width:"100%", fontSize:"20px"}}>
                <div style={{width:"1000px", margin:"0px auto", fontWeight:"bold", textAlign: "center"}}>
                    Graphic summary：
                </div>
                <div style={{width:"1000px", margin:"0px auto", fontWeight:"bold"}}>
                    Baseline
                    <div style={{width:"100%"}}>
                        <canvas id = "bCanvas" width = "800px" height = "100px" style={{display:"block", margin:"0px auto"}}/>
                    </div>
                </div>
                <div style={{width:"1000px", margin:"0px auto", fontWeight:"bold"}}>
                    Hypnogram
                    <div style={{width:"100%"}}>
                        <canvas id = "hCanvas" width = "800px" height = "100px" style={{display:"block", margin:"0px auto"}}/>
                    </div>
                </div>
                <div style={{width:"1000px", margin:"0px auto", fontWeight:"bold"}}>
                    Respiratory Event Graph
                    <div style={{width:"100%"}}>
                        <canvas id = "regCanvas" width = "800px" height = "100px" style={{display:"block", margin:"0px auto"}}/>
                    </div>
                </div>
                <div style={{width:"1000px", margin:"0px auto", fontWeight:"bold"}}>
                    Body Position
                    <div style={{width:"100%"}}>
                        <canvas id = "bpCanvas" width = "800px" height = "100px" style={{display:"block", margin:"0px auto"}}/>
                    </div>
                </div>
                <div style={{width:"1000px", margin:"0px auto", fontWeight:"bold"}}>
                    Heart Rate(BPM)
                    <div style={{width:"100%"}}>
                        <canvas id = "hrCanvas" width = "800px" height = "100px" style={{display:"block", margin:"0px auto"}}/>
                    </div>
                </div>
                <div style={{width:"1000px", margin:"0px auto", fontWeight:"bold"}}>
                    SaO2 Min/Max Graph
                    <div style={{width:"100%"}}>
                        <canvas id = "smgCanvas" width = "800px" height = "100px" style={{display:"block", margin:"0px auto"}}/>
                    </div>
                </div>
                <div style={{width:"1000px", margin:"0px auto", fontWeight:"bold"}}>
                    Sound
                    <div style={{width:"100%"}}>
                        <canvas id = "sCanvas" width = "800px" height = "100px" style={{display:"block", margin:"0px auto"}}/>
                    </div>
                </div>
                <div style={{width:"1000px", margin:"0px auto", fontWeight:"bold"}}>
                    PLM
                    <div style={{width:"100%"}}>
                        <canvas id = "plmCanvas" width = "800px" height = "100px" style={{display:"block", margin:"0px auto"}}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Graph;