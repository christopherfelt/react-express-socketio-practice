var socket = require('socket.io-client')('http://localhost:5000');
socket.on('connect', function(){
    console.log("conncted");
});
socket.on('chat message', function(data){
    console.log("From RPi: " + data);
})
socket.on('disconnect', function(){
    console.log("disconnected");
})