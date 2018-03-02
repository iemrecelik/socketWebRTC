importScripts('/socket.io/socket.io.js');

var socket = io.connect('http://localhost:3000');


onVideoPack();

function onVideoPack(){

	socket.on('stream', (data) => {
		vPack = vPack.concat(data);
	})

	let vPack = [];

	setInterval(() => {

		this.postMessage(vPack[0]);
		vPack.splice(0,1);

		// console.log(vPack.length);
	}, 250)	
}

this.onmessage = function(e){
	console.log('The come message by client : '+ e.data);
}