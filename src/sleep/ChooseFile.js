import React from 'react';
import '../css/main.css';

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
        let binary = e.target.files[37].getAsBinary();
        console.log(binary);
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