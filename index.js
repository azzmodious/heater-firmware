'use strict'; 
const  FauxMo = require('fauxmojs');
var http = require('http');
var ipAddress = require('ip');
var ip = '192.168.200.88';
console.info(ipAddress.address()); 

var optionsOn = {
  host: '192.168.200.167', 
  path: '/device/on', 
  port: '1337', 
  method: 'GET'
};

var optionsOff = {
  host: '192.168.200.167', 
  path: '/device/off', 
  port: '1337', 
  method: 'GET'
};

var callback = function(response) {
   var str = ''
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
}

let fauxMo = new FauxMo(
  {
    ipAddress: ipAddress.address(),
    devices: [
      {
        name: 'house heater',
        port: 11000,
        handler: function(action) {
          console.log('office light action:', action);

          if(action === 'on')
            http.request(optionsOn, callback).end();

          if(action === 'off')
            http.request(optionsOff, callback).end();
        }
      },
      {
        name: 'house fan',
        port: 11001,
        handler: function(action) {
          console.log('office fan action:', action);
        }
      }
    ]
  });
 
console.log('started..');
