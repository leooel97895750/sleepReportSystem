import React from 'react';
import '../css/graph.css';


// Report繪圖
class Graph extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        };
    }
    componentDidMount(){
        this.updateCanvas();
    }
    componentDidUpdate(){
        this.updateCanvas();
    }
    // 左邊為Label，右邊根據時間劃分區間
    updateCanvas(){

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
        //console.log(delaySec);
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
        //console.log(randomStage);
        let stageDeleteNum = sleepStage.length - stageLength;
        //console.log(deleteNum);
        if(stageDeleteNum > 0){
            let deleteSpace = Math.floor(sleepStage.length / stageDeleteNum);
            //console.log(deleteSpace);
            // 從尾部平均刪除
            for(let i=stageDeleteNum-1; i>=0; i--){
                randomStage.splice(i*deleteSpace, 1);
            }                                                                                                                                                                                         
        }
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

        // 3.                  
        // Respiratory Event Graph繪製 (100*800)
        //

        let rHeight = 300;
        let rWidth = 800;
		let rCanvas = document.getElementById("rCanvas");
        rCanvas.height = rHeight;
        rCanvas.width = rWidth;
        let rCTX = rCanvas.getContext("2d");
        // 左側Label
        rCTX.font = "16px Arial";
        rCTX.fillStyle = "black";
        rCTX.textAlign = "start";
        rCTX.fillText("Cn.A", 5, 30);
        rCTX.fillText("Ob.A", 5, 65);
        rCTX.fillText("Mx.A", 5, 100);
        rCTX.fillText("Hyp", 5, 135);
        rCTX.fillText("Uns", 5, 170);
        rCTX.fillText("RERA", 5, 205);
        rCTX.fillText("Period", 5, 240);
        rCTX.fillText("Para", 5, 275);
        // 畫Block刻度
        rCTX.beginPath();
        rCTX.moveTo(100, 12);
        rCTX.lineTo(100, 35);
        rCTX.moveTo(100, 47);
        rCTX.lineTo(100, 70);
        rCTX.moveTo(100, 82);
        rCTX.lineTo(100, 105);
        rCTX.moveTo(100, 117);
        rCTX.lineTo(100, 140);
        rCTX.moveTo(100, 152);
        rCTX.lineTo(100, 175);
        rCTX.moveTo(100, 187);
        rCTX.lineTo(100, 210);
        rCTX.moveTo(100, 222);
        rCTX.lineTo(100, 245);
        rCTX.moveTo(100, 257);
        rCTX.lineTo(100, 280);


        rCTX.strokeStyle = "black";
        rCTX.lineWidth = "0.5";
        rCTX.stroke();
        for(let i=1; i<blockNum; i++){
            rCTX.beginPath();
            rCTX.moveTo(100 + blockWidth*i, 10);
            rCTX.lineTo(100 + blockWidth*i, 290);
            rCTX.strokeStyle = "gray";
            rCTX.lineWidth = "1";
            rCTX.stroke();
        }

        // 4.
        // Body Position
        //
        let bpHeight = 100;
        let bpWidth = 800;
		let bpCanvas = document.getElementById("bpCanvas");
        bpCanvas.height = bpHeight;
        bpCanvas.width = bpWidth;
        let bpCTX = bpCanvas.getContext("2d");
        // 左側Label
        bpCTX.font = "15px Arial";
        bpCTX.textAlign = "end";
        bpCTX.fillStyle = "#AA0000";
        bpCTX.fillText("R", 85, 15);
        bpCTX.fillStyle = "black";
        bpCTX.fillText("B", 85, 32);
        bpCTX.fillStyle = "green";
        bpCTX.fillText("L", 85, 49);
        bpCTX.fillStyle = "deeppink";
        bpCTX.fillText("F", 85, 66);
        bpCTX.fillStyle = "brown";
        bpCTX.fillText("U", 85, 83);
        // 畫Block刻度
        bpCTX.strokeStyle = "black";
        bpCTX.lineWidth = "0.5";
        bpCTX.stroke();
        for(let i=0; i<blockNum; i++){
            bpCTX.beginPath();
            bpCTX.moveTo(100 + blockWidth*i, 0);
            bpCTX.lineTo(100 + blockWidth*i, 85);
            bpCTX.strokeStyle = "gray";
            bpCTX.lineWidth = "1";
            bpCTX.stroke();
        }
        let position = this.props.position;
        let randomPosition = [];
        let chooseSpace = Math.floor(position.length / 700);
        for(let i=0; i<700; i++){
            randomPosition.push(position[i*chooseSpace]);
        }
        //console.log(randomPosition);
        // R:nul(0), B:soh(1), L:stx(2), F:etx(3), U:eot(4)
        let lastx = 100;
        let lasty = 0;
        if(randomPosition[0] === 0) lasty = 9;
        else if(randomPosition[0] === 1) lasty = 26;
        else if(randomPosition[0] === 1) lasty = 43;

        for(let i=0; i<randomPosition.length; i++){

            
            if(randomPosition[i] === 0){
                bpCTX.beginPath();
                bpCTX.moveTo(lastx, lasty);
                bpCTX.lineTo(101 + i, 9);
                bpCTX.strokeStyle = "red";
                bpCTX.lineWidth = 1;
                bpCTX.stroke();
                lastx = 101 + i;
                lasty = 9;
            }
            else if(randomPosition[i] === 1){
                bpCTX.beginPath();
                bpCTX.moveTo(lastx, lasty);
                bpCTX.lineTo(101 + i, 26);
                bpCTX.strokeStyle = "blue";
                bpCTX.lineWidth = 1;
                bpCTX.stroke();
                lastx = 101 + i;
                lasty = 26;
            }
            else if(randomPosition[i] === 2){
                bpCTX.beginPath();
                bpCTX.moveTo(lastx, lasty);
                bpCTX.lineTo(101 + i, 43);
                bpCTX.strokeStyle = "green";
                bpCTX.lineWidth = 1;
                bpCTX.stroke();
                lastx = 101 + i;
                lasty = 43;
            }
            else if(randomPosition[i] === 3){
                bpCTX.beginPath();
                bpCTX.moveTo(lastx, lasty);
                bpCTX.lineTo(101 + i, 66);
                bpCTX.strokeStyle = "deeppink";
                bpCTX.lineWidth = 1;
                bpCTX.stroke();
                lastx = 101 + i;
                lasty = 66;
            }
            else if(randomPosition[i] === 4){
                bpCTX.beginPath();
                bpCTX.moveTo(lastx, lasty);
                bpCTX.lineTo(101 + i, 83);
                bpCTX.strokeStyle = "brown";
                bpCTX.lineWidth = 1;
                bpCTX.stroke();
                lastx = 101 + i;
                lasty = 83;
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
                        <canvas id = "rCanvas" width = "800px" height = "100px" style={{display:"block", margin:"0px auto"}}/>
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