const socket = io('http://localhost:3001', { transports: ['websocket'] });

const form = document.getElementById('send-container');
const messageContainer = document.querySelector('.container');
const messageInput = document.getElementById('messageInp');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, 'right');
  socket.emit('send-chat', message);
  messageInput.value = '';
});

const name = prompt("Enter your name to join");
socket.emit('new-user', name); // Send the username when joining

// ... (rest of the code)

append(`${name} joined the chat`, 'left');
const user = 'YourUsername'; // Change this to the desired username
// Replace the following line
// append(`You joined`, 'left');
// with
addMessage(`you joined`);
socket.on('send-chat', data => {
  addMessage(`${data.name}: ${data.message}`);
});

function addMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageContainer.append(messageElement);
    // Check if audio is defined before calling play
    
    };


socket.on('user-connected', (connectedName) => {
  addMessage(`${connectedName} connected`);
});
socket.on('message-received', (data) => {
  addMessage(`${data.name}: ${data.message}`);
});
socket.on('new-user', (newUserName) => {
  addMessage(`${newUserName} joined`);
});

socket.on('user-disconnected', (disconnectedUser) => {
addMessage(`${disconnectedUser} disconnected`);
});
socket.on('user-joined', (joinedName) => {
  addMessage(`${joinedName} joined the chat`);
});
socket.on('receive', (data) => {
  addMessage(`${data.name}: ${data.message}`);
});
function append(message, position) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
}
socket.on('right', name =>{

  append('${name} left the chat' , 'right')
})
