var express = require('express');
var router = express.Router();
var gpio = require("pi-gpio");
var gpio2 = require('rpi-gpio');
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
    gpio.setup(11, gpio.DIR_OUT, write);

    function write() {
        gpio.write(11, true, function (err) {
            if (err) throw err;
            console.log('Written to pin');
        });
    }
}

function altOffDevice() {
    gpio.setup(11, gpio.DIR_OUT, write);

    function write() {
        gpio.write(11, false, function (err) {
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
}

process.on('SIGINT', cleanup.bind(null, { exit: true }));
module.exports = router;
//module.exports = gpio;