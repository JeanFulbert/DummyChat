
var ENTER_KEY = 13;
var componentsByUser = {}

function onLoad() {
    componentsByUser = {
        "A": {
            history: document.getElementById("historyA"),
            textarea: document.getElementById("messageA")
        },
        "B": {
            history: document.getElementById("historyB"),
            textarea: document.getElementById("messageB")
        }
    };

    for (let userInMapping in componentsByUser)
    {
        registerEnterKeyDown(userInMapping);
    }
}

function registerEnterKeyDown(user) {
    let textarea = componentsByUser[user].textarea;

    textarea.addEventListener("keydown", function(e) {
        if (e.keyCode === ENTER_KEY && !e.shiftKey)
        {
            e.preventDefault();

            if (textarea.value)
            {
                addMessageFromUser(user);
            }
        }
    });
}

function addMessageFromUser(user) {
    let textarea = componentsByUser[user].textarea;
    if (!textarea.value)
    {
        return;
    }

    let newMessage = {
        user: user,
        content:
            textarea.value
                .replace(/\n/g, '<br />')
    };

    for (let userInMapping in componentsByUser)
    {
        let messageBlock =
            userInMapping === user
            ? buildSelfMessage(newMessage)
            : buildOtherMessage(newMessage);
        
        let history = componentsByUser[userInMapping].history;
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

window.onload = onLoad;