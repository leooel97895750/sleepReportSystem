import React from 'react';
import JsonTable from 'ts-react-json-table';
import '../css/search.css';
import question from '../image/question.png';
import {postJsonAPI} from './functions/API.js';

// 資料庫搜尋頁面
class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
        };
        this.sendQuery = this.sendQuery.bind(this);
        this.csvDownload = this.csvDownload.bind(this);
        this.jsonDownload = this.jsonDownload.bind(this);
    }

    selectBox(){
        alert('?');
    }

    // 送出查詢，並產生表格
    sendQuery(){
        let selectValue = document.getElementById("selectBox").value;
        let fromValue = document.getElementById("fromBox").value;
        let whereValue = document.getElementById("whereBox").value;
        let sortValue = document.getElementById("sortBox").value;
        let limitValue = document.getElementById("limitBox").value;
        if(selectValue !== "" && fromValue !== "" && limitValue !== ""){
            let selectEveryUrl = "http://140.116.245.43:3000/selectEvery";
            let queryData = {
                selectValue: selectValue,
                fromValue: fromValue,
                whereValue: whereValue,
                sortValue: sortValue,
                limitValue: limitValue,
            };
            postJsonAPI(selectEveryUrl, queryData, (xhttp) => {
                let data = JSON.parse(xhttp.responseText);
                this.setState({data: data});
            });
        }
        else{
            alert('資料欄位和資料表一定要輸入');
        }
    }

    buildData = data => {
        return new Promise((resolve, reject) => {
        // 最後所有的資料會存在這
        let arrayData = [];
        // 取 data 的第一個 Object 的 key 當表頭
        let arrayTitle = Object.keys(data[0]);
        arrayData.push(arrayTitle);
        // 取出每一個 Object 裡的 value，push 進新的 Array 裡
        Array.prototype.forEach.call(data, d => {
            let items = [];
            Array.prototype.forEach.call(arrayTitle, title => {
            let item = d[title] || '無';
            items.push(item);
            });
            arrayData.push(items)
        })
        resolve(arrayData);
        })
    
    }
    downloadCSV = data => {
        let csvContent = '';
        Array.prototype.forEach.call(data, d => {
            let dataString = d.join(',') + '\n';
            csvContent += dataString;
        })

        // 下載的檔案名稱
        let fileName = 'csv_' + (new Date()).getTime() + '.csv';

        // 建立一個 a，並點擊它
        let link = document.createElement('a');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csvContent));
        link.setAttribute('download', fileName);
        link.click();
    }
    csvDownload(){
        let data = this.state.data;
        this.buildData(data).then(data => this.downloadCSV(data));
    }

    jsonDownload(){
        // 下載的檔案名稱
        let fileName = 'json_' + (new Date()).getTime() + '.json';

        // 建立一個 a，並點擊它
        let link = document.createElement('a');
        link.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.state.data)));
        link.setAttribute('download', fileName);
        link.click();
    }
    excelDownload() {
        
    }

    render(){

        return(
            <div style={{display: this.props.display}}>
                <div className="searchBlock">
                    <div style={{padding:"20px"}}>
                        <div>
                            <div className="selectLabel">資料欄位</div>
                            <input id="selectBox" className="searchInput"/>
                            <img src={question} alt="資料欄位說明" onClick={this.selectBox} style={{width:"25px", height:"25px", marginLeft:"10px", marginTop:"10px"}}/>
                        </div>
                        <div>
                            <div className="selectLabel">資料表</div>
                            <input id="fromBox" list="myFrom" className="searchInput"/>
                            <datalist id="myFrom">
                                <option value="report"/>
                                <option value="stage"/>
                                <option value="event"/>
                                <option value="position"/>
                            </datalist>
                            <img src={question} alt="資料表說明" style={{width:"25px", height:"25px", marginLeft:"10px", marginTop:"10px"}}/>
                        </div>
                        <div>
                            <div className="selectLabel">資料條件</div>
                            <input id="whereBox" className="searchInput"/>
                            <img src={question} alt="資料條件說明" style={{width:"25px", height:"25px", marginLeft:"10px", marginTop:"10px"}}/>
                        </div>
                        <div>
                            <div className="selectLabel">排序</div>
                            <input id="sortBox" className="searchInput"/>
                            <img src={question} alt="排序說明" style={{width:"25px", height:"25px", marginLeft:"10px", marginTop:"10px"}}/>
                        </div>
                        <div>
                            <div className="selectLabel">顯示筆數</div>
                            <input id="limitBox" className="searchInput" defaultValue="0, 10000"/>
                            <img src={question} alt="顯示筆數說明" style={{width:"25px", height:"25px", marginLeft:"10px", marginTop:"10px"}}/>
                        </div>

                        <div style={{position:"relative", height:"80px"}}>
                            {/* 查詢 */}
                            <div className="fileBlock" style={{position:"absolute", right:"10px"}}>
                                <label>
                                    <span className="fileButton">查詢</span>
                                    <button 
                                        onClick = {this.sendQuery}
                                        style = {{display: 'none'}}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    

                    <hr/>

                    {/* 下載csv */}
                    <div className="fileBlock">
                        <label>
                            <span className="fileButton">下載CSV</span>
                            <button 
                                onClick = {this.csvDownload}
                                style = {{display: 'none'}}
                            />
                        </label>
                    </div>
                    {/* 下載Excel */}
                    <div className="fileBlock">
                        <label>
                            <span className="fileButton">下載Excel</span>
                            <button 
                                onClick = {this.excelDownload}
                                style = {{display: 'none'}}
                            />
                        </label>
                    </div>
                    {/* 下載JSON */}
                    <div className="fileBlock">
                        <label>
                            <span className="fileButton">下載JSON</span>
                            <button 
                                onClick = {this.jsonDownload}
                                style = {{display: 'none'}}
                            />
                        </label>
                    </div>
                    
                    <div id="displayForm" style={{padding:"20px"}}>
                        <JsonTable rows = {this.state.data} className="jsontable" settings={{noRowsMessage:"尚未查詢，無資料"}}/>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Search;