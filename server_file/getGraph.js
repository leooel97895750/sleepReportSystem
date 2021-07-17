var express = require('express');
var router = express.Router();
var fs = require('fs');
let path = require("path");
const bodyParser = require('body-parser');

router.post('/getGraph', function(req, res, next) {
    let getGraphJson = req.body;
    console.log(getGraphJson);

    try{
        let Baseline = fs.readFileSync(path.join(__dirname, getGraphJson.Baseline_path), {encoding: 'base64'});
        let Hypnogram = fs.readFileSync(path.join(__dirname, getGraphJson.Hypnogram_path), {encoding: 'base64'});
        let Event = fs.readFileSync(path.join(__dirname, getGraphJson.Event_path), {encoding: 'base64'});
        let BodyPosition = fs.readFileSync(path.join(__dirname, getGraphJson.BodyPosition_path), {encoding: 'base64'});
        let HeartRate = fs.readFileSync(path.join(__dirname, getGraphJson.HeartRate_path), {encoding: 'base64'});
        let SaO2 = fs.readFileSync(path.join(__dirname, getGraphJson.SaO2_path), {encoding: 'base64'});
        let Sound = fs.readFileSync(path.join(__dirname, getGraphJson.Sound_path), {encoding: 'base64'});
        let PLM = fs.readFileSync(path.join(__dirname, getGraphJson.PLM_path), {encoding: 'base64'});
        
        let graphData = {
            Baseline: Baseline,
            Hypnogram: Hypnogram, 
            Event: Event, 
            BodyPosition: BodyPosition, 
            HeartRate: HeartRate, 
            SaO2: SaO2, 
            Sound: Sound, 
            PLM: PLM
        };
        res.send(graphData);
    }
    catch(err){
        console.log(err);
    }

});

module.exports = router;