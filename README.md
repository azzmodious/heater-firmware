# heater-firmware

## description
This project is to make my old furnace answerable to my amazon echo using a raspberry pie and a relay board. The idea is that I can spoof a wemo signature on the network so the amazon echo knows what to do when I tell it to discover devices. 

## Setup 
Setup is simple. You will need fauxmo js and a lib for gpio control. I am sticking with javascript this time but I might come back and do it in put typescript. 
```
npm install
```

## Run
This must run as root to allow the program to get to the gpio pins

```
sudo npm start
```

### Use Echo Activation
```
node index.js
```

Say "Alexia turn on house heater"
or
Say "Alexia turn off house heater"


## REST API

### Turn on Heater and Pump
```
curl http://192.168.200.167:1337/device/on
```

### Turn off Heater and Pump
```
http://192.168.200.167:1337/device/off
```

