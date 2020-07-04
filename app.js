 var app = require("express")();
 var http = require('http').Server(app);
 
 var io = require('socket.io')(http);
 
 app.get("/", function(request, result){
	 result.sendfile('index.html');
 });
/*  
//Whenever someone connects this gets executed
io.on('connection', function(socket) {
   console.log('A user connected');

  //Send a message after a timeout of 4seconds
   setTimeout(function() {
      socket.send('Sent a message 4seconds after connection!');
   }, 2000);
   
   //Send a message when 
   setTimeout(function() {
      //Sending an object when emmiting an event
      socket.emit('testerEvent', { description: '<br> Description: A custom event named testerEvent!'});
   }, 2000);


   //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
}); */

/* //client use emit function
io.on('connection', function(socket) {
   socket.on('clientEvent', function(data) {
      console.log(data);
   });
}); */

/* // io.sockets.emit
var clients = 0;
io.on('connection', function(socket) {
   clients++;
   io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
   socket.on('disconnect', function () {
      clients--;
      io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
   });
});
 */
 
 /* 
 //socket.broadcast.emit.
var clients = 0;
io.on('connection', function(socket) {
   clients++;
   socket.emit('newclientconnect',{ description: 'Hey, welcome!'});
   socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
   socket.on('disconnect', function () {
      clients--;
      socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
   });
}); */

/*
// Custom Namespaces
var nsp = io.of('/my-namespace');
nsp.on('connection', function(socket) {
   console.log('someone connected');
   nsp.emit('hi', 'Hello everyone!');
});  */

// Rooms
var roomno = 1;
io.on('connection', function(socket) {
   
   //Increase roomno 2 clients are present in a room.
   if(io.nsps['/'].adapter.rooms["room-"+roomno] && io.nsps['/'].adapter.rooms["room-"+roomno].length > 1) roomno++;
   socket.join("room-"+roomno);

   //Send this event to everyone in the room.
   io.sockets.in("room-"+roomno).emit('connectToRoom', "You are in room no. "+roomno);
})
 
 http.listen(3000, function(){
	 console.log('listening on: *3000');
 });