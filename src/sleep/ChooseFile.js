import React from 'react';
import '../css/main.css';
import {getAPI, postAPI} from './API.js';

class ChooseFile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            psgFile: '',
        };
        this.updateFile = this.updateFile.bind(this);
    }

    updateFile(e){
        console.log(e.target.files);
        getAPI('http://140.116.245.43:3000/mdbfile', function(xhttp){
            console.log(xhttp.responseText);
            // let mdbfile_json = JSON.parse(xhttp.responseText);
            // console.log(mdbfile_json);
        });
        // let binary = e.target.files[37].getAsBinary();
        // console.log(binary);
        this.setState({
            psgFile: e.target.files,
        });
    }
    render(){
        return(
            <div>
                <label>
                    <span className="Myfont Myborder">選擇資料夾</span>
                    <input 
                        onChange = {this.updateFile}
                        type = "file" 
                        multiple 
                        mozdirectory = "" 
                        webkitdirectory = "" 
                        directory = ""
                        name = "psgFile"
                        style = {{display: 'none'}}
                    />
                </label>
            </div>

        );
    }
}

export default ChooseFile;