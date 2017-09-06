
var ENTER_KEY = 13;
var componentsByUser = {};
var users = [ "A", "B" ];

document.addEventListener("DOMContentLoaded", function() {

    users.forEach(function(userId) {
        componentsByUser[userId] = createEntryForUser(userId);
        
        registerEnterKeyDown(userId);
        registerSendClicked(userId);
    });
});


function createEntryForUser(userId) {
    return {
        history: document.getElementById("history" + userId),
        textarea: document.getElementById("message" + userId),
        sendButton: document.getElementById("sendButton" + userId)
    };
}

function registerEnterKeyDown(userId) {
    let textarea = componentsByUser[userId].textarea;

    textarea.addEventListener("keydown", function(e) {
        if (e.keyCode === ENTER_KEY && !e.shiftKey)
        {
            e.preventDefault();

            if (canSendMessageFromUser(userId))
            {
                sendMessageFromUser(userId);
            }
        }
    });
}

function registerSendClicked(userId) {
    let button = componentsByUser[userId].sendButton;

    button.onclick = function() {
        if (canSendMessageFromUser(userId))
        {
            sendMessageFromUser(userId);
        }
    };
}

function canSendMessageFromUser(userId) {    
    let textarea = componentsByUser[userId].textarea;
    
    return textarea.value.length > 0;
}

function sendMessageFromUser(userId) {
    if (!canSendMessageFromUser(userId))
    {
        return;
    }

    let textarea = componentsByUser[userId].textarea;
    
    let newMessage = {
        user: userId,
        content: encodeString(textarea.value)            
    };

    for (let userIdInMapping in componentsByUser)
    {
        let messageBlock =
            userIdInMapping === userId
            ? buildSelfMessage(newMessage)
            : buildOtherMessage(newMessage);
        
        let history = componentsByUser[userIdInMapping].history;
        history.innerHTML += '<li>' + messageBlock + '</li>';                
        history.scrollTop = history.scrollHeight;
    }

    textarea.value = "";
}

function buildSelfMessage(message) {
    return '<span class="right">' + message.content + '</span>';
}

function buildOtherMessage(message) {
    return '<span class="left">' + message.content + '</span>';
}

function encodeString(str) {
    return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/\n/g, '<br />');
}