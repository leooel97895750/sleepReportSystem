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
    componentDidMount() {

        // baseline繪製
		let bCanvas = document.getElementById("bCanvas");
        let bCTX = bCanvas.getContext("2d");
        bCTX.font = "14px Arial";
        bCTX.fillText("Time", 5, 20);
        bCTX.fillText("Hrs", 5, 45);
        bCTX.fillText("Epoch", 5, 70);
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