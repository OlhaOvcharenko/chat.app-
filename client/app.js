const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

const socket = io();

socket.on('message', ({ author, content }) => addMessage(author, content));
socket.on('newUser', ({ author, content }) => addMessage(author, content));
socket.on('removeUser', ({ author, content }) => addMessage(author, content));

let userName = '';

function login(e){
  e.preventDefault();

  if (userNameInput.value === '') {
    alert('Field is empty, please enter your name!');
  } else {
    userName = userNameInput.value;
    socket.emit('join', { userName: userName, id: socket.id})
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
}

function sendMessage(e) {
  e.preventDefault();

  let messageContent = messageContentInput.value;

  if(!messageContent.length) {
    alert('You have to type something!');
  } else {
    addMessage(userName, messageContent);
    socket.emit('message', { author: userName, content: messageContent })
    messageContentInput.value = '';
  }

}

function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author }</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
  
    if (userName === author) {
      message.classList.add('message--self');
    }

    
    if (author === 'Chat Bot') {
      message.classList.add('message--ChatBot');
    }
  
    messagesList.appendChild(message);
}

loginForm.addEventListener('submit', (event) => login(event));
addMessageForm.addEventListener('submit', (event) => sendMessage(event));