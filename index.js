'use strict';
 
const FauxMo = require('fauxmojs');
 
let fauxMo = new FauxMo(
  {
    ipAddress: '192.168.200.88',
    devices: [
      {
        name: 'lab light',
        port: 11000,
        handler: (action) => {
          console.log('office light action:', action);
        }
      },
      {
        name: 'lab fan',
        port: 11001,
        handler: (action) => {
          console.log('office fan action:', action);
        }
      }
    ]
  });
 
console.log('started..');