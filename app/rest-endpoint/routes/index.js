var express = require('express');
var router = express.Router();
var gpio = require("pi-gpio");
var gpio2 = require('rpi-gpio');

var heaterpin = 11;
var pumppin = 13;

router.get('/', function (req, res, next) {
    res.send('Hello World');
});

router.get('/status', sendStatus);
router.get('/device/:flag', changeDeviceState);


function sendStatus(req, res) {
    res.json({
        deviceName: 'heaterpi',
        flame: 'off',
        pumps: 'off'
    });
}

function changeDeviceState(req, res) {
    if (req.params.flag === 'on') {
        res.send('device: on');
        //turnOnDevice();
        altOnDevice();
    }
    if (req.params.flag === 'off') {
        res.send('device: off');
        altOffDevice();
    }

}

function altOnDevice() {
    gpio2.setup(heaterpin, gpio2.DIR_OUT, write);
    gpio2.setup(pumppin, gpio2.DIR_OUT, function(){
        gpio2.write(pumppin, true, function(err){
            if(err) throw err;
            console.log('pump relay on');
        });
    });
    function write() {
        gpio2.write(heaterpin, true, function (err) {
            if (err) throw err;
            console.log('heater relay on');
        });
    }
}

function altOffDevice() {
    gpio2.setup(heaterpin, gpio2.DIR_OUT, write);
    gpio2.setup(pumppin, gpio2.DIR_OUT, function(){
        gpio2.write(pumppin, false, function(err){
            if(err) throw err;
            console.log('pump relay on');
        });
    });

    function write() {
        gpio2.write(heaterpin, false, function (err) {
            if (err) throw err;
            console.log('Written to pin');
        });
    }
}



function turnOnDevice() {

    gpio.open(11, "output", function (err) {
        gpio.write(11, 1, function () {
            //gpio.close(11);
            console.info("Relay on");
        });
    });
}

function cleanup(options, err) {
    console.info('cleaning things up...');
    gpio.close(11);
    gpio.close(13);
}

process.on('SIGINT', cleanup.bind(null, { exit: true }));
module.exports = router;
//module.exports = gpio;