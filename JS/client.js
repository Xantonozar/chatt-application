
const socket = io('http://localhost:3000');
 const form = document.getElementById('send-container');
 const btn = document.getElementById('btnn');
 const messageInp = document.getElementById('messageInp');
 const messageContainer = document.querySelector('.container');
 const name = prompt('Enter your name');
 const audio= new Audio(' sound.mp3 ');
 console.log(messageInp);
 socket.emit('new-user-joined', name );

    // Your code that adds event listeners here
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const messages = messageInp.value;
        const message = document.createElement('div');
        message.innerText = "You:"+ messages;
        messageContainer.append(message);
        message.classList.add('message');
        message.classList.add('right');
        // console.log(messages);
        messageInp.value=""
        socket.emit('send', messages);
      });


socket.on("user-joined", (name) => {
    const message = document.createElement('div');
    
    message.innerText = name + " has joined the chat";
    messageContainer.append(message);
    message.classList.add('message');
    message.classList.add('right');
    console.log(name + " has joined the chat");
    audio.play();
});
socket.on("recieve", (data) => {
   
    const message = document.createElement('div');
    message.innerText = data.name + ':'+ data.message;
    messageContainer.append(message);
    message.classList.add('message');
    message.classList.add('left');
    console.log(data.name + ':'+ data.messages);
    audio.play();
});
socket.on("left", (name) => {
    const message = document.createElement('div');
    
    message.innerText = name + " has left the chat ";
    messageContainer.append(message);
    message.classList.add('message');
    message.classList.add('right');
    console.log(name + " has left");
    audio.play();
});