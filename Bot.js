import chatBotService from "./Chatbotservice.js";

//declare on audios of application
let botMsg = new Audio("./assets/audios/botMessage.mp3");
let userMsg = new Audio("./assets/audios/userMessage.mp3");


// messanger
let ChatContent = document.querySelector(".containerBot .chattingContent");
let ChatInput = document.getElementById("inputSend");
let ChatSendBtn = document.getElementById("send");
let LoadingBotMsg = document.querySelector(".loadingBot");

ChatSendBtn.addEventListener("click", ()=> renderDataUserMes());

ChatInput.addEventListener("keyup", (event)=> {
    if(event.key == "Enter" || event.key == "enter") {
        renderDataUserMes();
    }
})

// method to add data already ready done for => some event
const renderDataUserMes = ()=> {
    if (ChatInput.value != "") {
        let userInput = ChatInput.value;
        renderMessageUserEl(userInput, "user");
        ChatInput.value = "";
        ShowHideLoading(false);

        renderBotRes(userInput);

    }
}

// method to create message element of user
function renderMessageUserEl(txt, type) {
    if ( txt.length >= 100 ) {
        let errorDiv = document.createElement("div");
        errorDiv.setAttribute("class", "errorType");
        let spanDivError = document.createElement("span");
        spanDivError.innerHTML = `<span class="mx">writing error:</span> you wrote more than 100 character, you can't write more than 100 only`;

        errorDiv.appendChild(spanDivError);
        ChatContent.appendChild(errorDiv);

    } else {
        let usbot = "user";
        let logo = "userLogo";
        let image = "https://avatars.services.sap.com/images/mohammed.zakaullah2_small.png";
        let talk = "userTalk";
        let msgAud = userMsg;

        if (type != "user") {
            usbot = "bot";
            logo = "botLogo";
            image = "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/jwxebbuwf1xwzcb6irgk";
            talk = "botTalk";
            msgAud = botMsg;
        }

        let userDiv = document.createElement("div");
        userDiv.setAttribute("class", usbot);

        let divLogo = document.createElement("div");
        divLogo.setAttribute("class", logo);
        let imgLogo = document.createElement("img");
        imgLogo.src = image;
        divLogo.appendChild(imgLogo);

        let divTalk = document.createElement("div");
        divTalk.setAttribute("class", talk);
        let praDiv = document.createElement("p");
        praDiv.innerHTML = txt;
        divTalk.appendChild(praDiv);

        userDiv.appendChild(divLogo);
        userDiv.appendChild(divTalk);
        ChatContent.appendChild(userDiv);

        openAudio(msgAud);
    }
}

let getBotChatResponse = (userInput) => {
    // return chatBotService.getBotChatResponse(userInput)==undefined? "Sorry i Can't understand you": chatBotService.getBotChatResponse(userInput);
    chatBotService.getResponsing(userInput)
    .then((response) => {
        if (response !== undefined) {
            renderMessageUserEl(response);
            setCurrentPosition();
            ShowHideLoading(true);
        }else if (response == "") {
            return false;
        } else {
            renderMessageUserEl("Sorry i Can't understand you");
            setCurrentPosition();
            ShowHideLoading(true);
        }
    })
    .catch((error)=> {})
}
// Sorry i Can't understand you
function renderBotRes(userInput) {
    let res = getBotChatResponse(userInput);
}

// function to open audios
function openAudio(audio) {
    audio.play();
}

// function set scroll position of messanger
function setCurrentPosition() {
    if (ChatContent.scrollHeight > 0) {
        ChatContent.scrollTop = ChatContent.scrollHeight;
    }
}

// function to show and hide loading of bot msg
function ShowHideLoading(show) {
    LoadingBotMsg.classList.toggle("hide", show);
}


// talk when the page is loaded only first time
let talkNow = setTimeout(()=> {
    renderMessageUserEl("Hello Sir, how can i help you ..");
    setTimeout(()=> {
        renderMessageUserEl("i can't read any word with capital character and am understand only english, also no '?,$%^#@&*()'");
    }, 2000)
    setTimeout(()=> {
        renderMessageUserEl("this is first project of robots for my owner, So i can't do these things");
    }, 4000)
}, 7000)