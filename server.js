const express = require('express');
const socket = require('socket.io');

const app = express();
const path = require('path');

const messages = [];
const users = [];

app.use(express.static(path.join(__dirname, '/client/'))); 

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);

  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('join', (user) => {
    console.log('User ' + socket.id + ' logged in');
    users.push(user);
    console.log('All users', users);
  });

  socket.on('disconnect', () => { 
    const userIndex = users.findIndex(user => user.id === socket.id);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
    }
    console.log('Oh, socket ' + socket.id + ' has left') 
    console.log('All users', users);
    
  });
  

});


