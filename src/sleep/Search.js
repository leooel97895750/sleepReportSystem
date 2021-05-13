import React from 'react';
import '../css/search.css';

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
                <p>查詢</p>
            </div>
        );
    }
}

export default Search;