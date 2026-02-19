var stompClient = null;

var username = null;


function connect(){

username = document.getElementById("username").value;

var socket = new SockJS('http://localhost:8080/ws');

stompClient = Stomp.over(socket);


stompClient.connect({}, function(){

console.log("Connected");


stompClient.subscribe('/topic/public', function(msg){

showMessage(JSON.parse(msg.body));

});


stompClient.subscribe('/user/queue/private', function(msg){

showMessage(JSON.parse(msg.body));

});

});

}



function sendPublic(){

var msg = {

sender: username,
content: document.getElementById("message").value

};

stompClient.send("/app/sendMessage", {}, JSON.stringify(msg));

}



function sendPrivate(){

var msg = {

sender: username,
receiver: document.getElementById("receiver").value,
content: document.getElementById("message").value

};

stompClient.send("/app/privateMessage", {}, JSON.stringify(msg));

}



function showMessage(msg){

document.getElementById("chat").innerHTML +=

"<p>"+msg.sender+" : "+msg.content+"</p>";

}
