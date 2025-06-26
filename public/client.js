const socket = io();
let name;
let textarea = document.querySelector('#textarea');
let messagearea = document.querySelector('.message_area');
do{
    name = prompt('Enter your name')
}while(!name)

    textarea.addEventListener('keyup',(e) =>{
        if(e.key === 'Enter'){
            sendMessage(e.target.value)
        }
    })

    function sendMessage(messag){
        let msg = {
            user : name,
            message : messag
        }

        // Append
        appendMessage(msg, 'outgoing')
        textarea.value = '';
        scrollToBottom();

        // Send to server
        socket.emit('message', msg)
    }

    function appendMessage(msg, type) {
        let mainDiv = document.createElement('div');
        let className = type
        mainDiv.classList.add(className, 'message')

        let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
        `
        mainDiv.innerHTML = markup
        messagearea.appendChild(mainDiv)
    }

    // Receive Message

    socket.on('message', (msg) =>{
        appendMessage(msg, 'incoming')
        scrollToBottom();
        
    })

    function scrollToBottom() {
        messagearea.scrollTop = messagearea.scrollHeight;
    }