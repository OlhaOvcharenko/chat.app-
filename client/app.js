const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

let userName = '';

const login = (e) => {
  e.preventDefault();

  if (userNameInput.value === '') {
    alert('Field is empty, please enter your name!');
  } else {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
}

const sendMessage = (e) => {
  e.preventDefault(); // Prevent the default form submission behavior
  if (messageContentInput.value === '') {
    alert('Field is empty, please enter your message!');
  } else {
    addMessage(userName, messageContentInput.value);
    messageContentInput.value = '';
  }
}

function addMessage(author, content) {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if (author === userName) {
    message.classList.add('message--self');
    message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author }</h3>
    <div class="message__content">
      ${content}
    </div>
    `;
    messagesList.appendChild(message);
  }
}

loginForm.addEventListener('submit', (event) => login(event));
addMessageForm.addEventListener('submit', (event) => sendMessage(event));