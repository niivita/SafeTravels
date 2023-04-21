const path = require('path')
const http = require('http'); //bring in http module
const express = require('express') //bring in regular express server
const socketio = require('socket.io') //bring in socket.io
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');

const app = express()
const server = http.createServer(app)
const io = socketio(server); 


//Set static folder to be the public folder to access html files
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'SafeTravels Admin'

//run when a client connects
io.on('connection', socket => {
    //When client connects...
    socket.on('joinRoom', ({username, room}) => {
    const user = userJoin(socket.id, username, room); //method from users.js
    socket.join(user.room); 

    socket.join('')
   
    //Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to the SafeTravels Chat'));  //to single client

    //Broadcast when a user connects
    socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`)); //to all other clients but the client connecting
    
        //Send users and room info to sidebar
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });

    });

    

    //Runs when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if(user){
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));
            
            //Send users and room info to sidebar
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
        });
        }

        

    });

    //Listen for chatMessage
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, msg)); //we want to broadcast to everybdoy (including client)
    });
});

const PORT = 3001 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 