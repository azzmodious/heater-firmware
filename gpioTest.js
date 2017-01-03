var gpio = require("pi-gpio");
var prompt = require('prompt');
var running = true;
var count = 0; 

prompt.start();
function ask(){
	//prompt.start();
	prompt.get(['command'], function (err, result){
		if(err){ return onErr(err);}
		console.info("cmd: "+result.command);
		
		if(result.command === "quit"){
			running = false;
		} else{
			ask();
		}
	});
}

function onErr(err){
	console.log(err);
	return 1;
}

var gpioFunc = function(){

	gpio.open(11, "output", function(err){
		gpio.write(11, 1, function(){
		gpio.close(11);
		console.info("Relay on");
		});	
	});
}

ask();
