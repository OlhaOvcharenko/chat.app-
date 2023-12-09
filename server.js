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

  socket.on('join', (user) => {
    console.log('User ' + socket.id + ' logged in');
    users.push(user);
    console.log('All users', users);
  
    const message = `${user.userName} has joined the conversation!`;
  
    socket.broadcast.emit('newUser', { author: 'Chat Bot', content: message });
  });

  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });


  socket.on('disconnect', () => { 
    const userLeft = users.findIndex(user => user.id === socket.id);
    if (userLeft !== -1) {
      const userLogin = users[userLeft].userName; // Adjust the property name if needed
      users.splice(userLeft, 1);
      console.log('Oh, socket ' + socket.id + ' has left');
      console.log('All users', users);
  
      const message = `${userLogin} has left.`;
      socket.broadcast.emit('removeUser', { author: 'Chat Bot', content: message});
    }
  });
  

});


