'use strict'; 
const  FauxMo = require('fauxmojs');
var ip = require('ip');

console.info(ip.address()); 
let fauxMo = new FauxMo(
  {
    ipAddress: ip.address(),
    devices: [
      {
        name: 'lab light',
        port: 11000,
        handler: function(action) {
          console.log('office light action:', action);
        }
      },
      {
        name: 'lab fan',
        port: 11001,
        handler: function(action) {
          console.log('office fan action:', action);
        }
      }
    ]
  });
 
console.log('started..');
