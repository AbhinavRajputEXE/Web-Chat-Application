const socket = io('https://web-chat-app.onrender.com');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('ting.mp3');

const append = (message, position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
    
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    const you = "You";
    append(`${you}: \t\t ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value='';
})
const name = prompt("Enter your name to join:\n");
socket.emit('new-user-joined', name);

socket.on('user-joined',name =>{
    append(`${name} joined the chat`,'center')
})

socket.on('receive',data =>{
    append(`${data.name}: \t${data.message}`,'left')
})

socket.on('left',name =>{
    append(`${name} left the chat`,'center')
})

const chk = document.getElementById('chk');

chk.addEventListener('change', () => {
  document.getElementById('bck').classList.toggle('black');
  document.getElementById('cont').classList.toggle('black');
});