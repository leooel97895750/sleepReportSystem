import React from 'react';
import '../css/header.css';
import Search from './Search';
import Dataflow from './Dataflow';


// 網頁header
class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            apiURL: "http://140.116.245.43:3000",
            nowPage: 0,
        };
    }
    componentDidMount(){
        this.isOnline(); 
    }
    isOnline = () => {
        try{
            let url = "http://192.168.100.101:3000/getIP";
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
                if(this.readyState === 4 && this.status === 200){
                    this.setState({
                        apiURL: "http://192.168.100.101:3000",
                    });
                }
            };
            xhttp.ontimeout = () => {
                console.log('timeout');
            };
            xhttp.onerror = () => {
                console.log('error');
            };
            xhttp.timeout = 2000;
            xhttp.open("GET", url, true);
            xhttp.send();
        }
        catch{
            console.log('false');
        }
    }
    
    // 點擊切換報告系統、查詢系統
    changePage(pageNum){
        this.setState({
            nowPage: pageNum,
        });
    }
    render(){
        return(
            <div>
                <header>
                    <span className="title">多頻睡眠生理檢查報告系統</span>
                    
                    <div className="navButton">
                        <span className="navSpan" style={{borderBottom: this.state.nowPage ? '0px' : '2px white solid'}} onClick={() => this.changePage(0)}>報告系統</span>
                        <span className="navSpan" style={{borderBottom: this.state.nowPage ? '2px white solid' : '0px'}} onClick={() => this.changePage(1)}>查詢系統</span>
                    </div>
                </header>
                <Dataflow
                    apiURL = {this.state.apiURL}
                    display = {this.state.nowPage?'none':'block'} 
                />
                <Search
                    apiURL = {this.state.apiURL}
                    display = {this.state.nowPage?'block':'none'}
                />
                
            </div>
            
        );
    }
}

export default Header;