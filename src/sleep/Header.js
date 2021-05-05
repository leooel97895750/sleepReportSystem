import React from 'react';
import '../css/header.css';

// 此為網頁header
class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nowPage: 0,
        };
    }

    // 點擊切換報告系統、查詢系統
    changePage(pageNum){
        console.log(pageNum);
        this.setState({
            nowPage: pageNum,
        });
    }
    render(){
        return(
            <header>
                <span className="title">多頻睡眠生理檢查報告系統</span>
                <div className="navButton">
                    <span className="navSpan" style={{borderBottom: this.state.nowPage ? '0px' : '3px lightgray solid'}} onClick={() => this.changePage(0)}>報告系統</span>
                    <span className="navSpan" style={{borderBottom: this.state.nowPage ? '3px lightgray solid' : '0px'}} onClick={() => this.changePage(1)}>查詢系統</span>
                </div>
            </header>
        );
    }
    
}

export default Header;