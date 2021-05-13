import React from 'react';
import '../css/header.css';
import Report from './Report';
import Search from './Search';
import ChooseFile from './ChooseFile';

// 網頁header
class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nowPage: 0,
        };
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
                <ChooseFile display={this.state.nowPage?'none':'block'} />
                <Report display={this.state.nowPage?'none':'block'} />
                <Search display={this.state.nowPage?'block':'none'} />
            </div>
            
        );
    }
}

export default Header;