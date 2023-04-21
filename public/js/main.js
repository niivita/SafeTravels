const chatForm = document.getElementById('chat-form') //access the form from the html script
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

let currentRoom = '';

//Get username and room from URL, ignoreQueryPrefix omits characters before room & url
const {username, room} = Qs.parse(location.search,{
    ignoreQueryPrefix: true
});

const socket = io(); 

//Join chat room
socket.emit('joinRoom', {username, room});

//Get room & users
socket.on('roomUsers', ({room, users}) => {
    outputRoomName(room);
    outputUsers(users);
});

// Message from server
socket.on('message', message => {
    console.log(message)
    outputMessage(message);

    //Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit (create event listener)
chatForm.addEventListener('submit', (e) => {
    e.preventDefault(); // we don't want it to automatically submit to a file
    const msg = e.target.elements.msg.value // get the message input from whatever was sent (get the id msg's value)
    socket.emit('chatMessage', msg) //emit message to server

    //clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus(); //focus method: have it be pre-selected after an action


 });

 //Output message method to DOM (usually done automatically by react)
 function outputMessage(message){
    const div = document. createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div) //creates new div when we get chat-messages
 }

 //Add room name to dom
 function outputRoomName(room){
    roomName.innerText = room;
 }

 //Add users to dom
 function outputUsers(users){
    userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;

 }

 // When user submits the form
document.getElementById('roomForm').addEventListener('submit', e => {
    e.preventDefault();
    const roomNameInput = document.getElementById('roomName');
    const room = roomNameInput.value;
    currentRoom = room;
    socket.emit('checkRoom', room);
});

// Room exists
socket.on('roomExists', () => {
    const roomNameInput = document.getElementById('roomName');
    roomNameInput.value = currentRoom;
    document.querySelector('form').submit();
});

// Room does not exist
socket.on('roomDoesNotExist', () => {
    const roomNameInput = document.getElementById('roomName');
    socket.emit('createRoom', currentRoom);
    roomNameInput.value = currentRoom;
    document.querySelector('form').submit();
});

document.querySelector('.btn').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const room = document.getElementById('roomName').value;
    window.location.href = `chat.html?username=${username}&room=${room}`;
  });

  socket.on('createRoom', (roomName) => {
    currentRoom = roomName;
  });
