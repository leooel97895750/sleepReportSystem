import React from 'react';
import ContentEditable from 'react-contenteditable'
import '../css/treatment.css';

class Treatment extends React.Component{
    constructor(props){
        super(props);
        this.contentEditable = React.createRef();
        this.state = {
            html: "",
        };
    }

    handleChange = evt => {
        this.setState({html: evt.target.value});
    };

    render = () => {
        return <ContentEditable
            innerRef = {this.contentEditable}
            html = {this.state.html}
            disabled = {false}
            onChange = {this.handleChange}
            style = {{width:"968px", height:"300px", padding:"10px", fontSize:"18px" ,fontFamily:"Times New Roman, DFKai-sb, sans-serif"}}
        />
    }
}

export default Treatment;