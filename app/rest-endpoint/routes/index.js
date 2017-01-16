var express = require('express');
var router = express.Router();
var gpio = require("pi-gpio");

router.get('/', function(req, res, next){
    res.send('Hello World');
});

router.get('/status', sendStatus);
router.get('/device/:flag', changeDeviceState);


function sendStatus(req, res){
    res.json({
        deviceName: 'heaterpi',
        flame: 'off', 
        pumps: 'off'
    });
}

function changeDeviceState(req, res){
    if(req.params.flag === 'on'){
        res.send('device: on');
        turnOnDevice();
    }
    if(req.params.flag === 'off'){
        res.send('device: off');
    }

}

function turnOnDevice(){

	gpio.open(11, "output", function(err){
		gpio.write(11, 1, function(){
		gpio.close(11);
		console.info("Relay on");
		});	
	});
}
module.exports = router;