//Dynamically add messages

let messageSection  = document.getElementById('messages');

function createMessageBox(text) {
    
    let message = document.createElement('div');
    message.className = "message-box";
    message.innerHTML = text; 

    messageSection.appendChild(message);
}

createMessageBox('This is a test message created with JS');