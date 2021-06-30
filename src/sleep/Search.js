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
            <div className="searchBlock" style={{display: this.props.display}}>
                <div style={{margin:"20px"}}>
                    <input type="text" placeholder="輸入查詢關鍵字" style={{border:"0px", outline:"none", fontSize:"20px", borderBottom:"3px gray solid", width:"90%"}}/>
                    <img src={search} alt="search" style={{height:"40px", width:"40px", position:"relative", top:"15px", left:"10px"}}></img>
                </div>
                
            </div>
        );
    }
}

export default Search;