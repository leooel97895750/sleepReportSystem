import React from 'react';
import '../css/search.css';
import search from '../image/search.png';

// 資料庫搜尋頁面
class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        return(
            <div style={{display: this.props.display}}>
                <div className="searchBlock">
                    <div style={{margin:"20px"}}>
                        <input type="text" placeholder="輸入查詢關鍵字" style={{border:"0px", outline:"none", fontSize:"20px", borderBottom:"3px gray solid", width:"90%"}}/>
                        <img src={search} alt="search" style={{height:"40px", width:"40px", position:"relative", top:"15px", left:"10px"}}></img>
                    </div>
                    
                </div>
                <footer style={{position: this.state.isLoad ? 'static' : 'fixed'}}>
                    <span>成大醫院睡眠中心 National Cheng Kung University Hospital</span><br/>
                    <span>成大資訊工程所 神經運算與腦機介面實驗室 National Cheng Kung University Department of Computer Science and Information Engineering NCBCI Lab</span>
                </footer>
            </div>
        );
    }
}

export default Search;