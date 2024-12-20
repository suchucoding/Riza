let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");
let userInput = document.querySelector("#user-input");
let sendBtn = document.querySelector("#send-btn");

const faq = {
    "what is your name": "I am Riza, your virtual assistant.",
    "who created you": "I was created by Miss Suchanda Roy.",
    "how are you": "I'm just a program, but I'm here to help you!",
    "what is the capital of India": "The capital of India is New Delhi.",
    "tell me a joke": "Why don't scientists trust atoms? Because they make up everything!",
    "i love you ": "Thank you thats very sweet !, As Iam a AI assistant , I don't feel same way as humans do, but im happy to be here to help a sweet human like you ! ",
    "i like you": "I am happy that i made you like me , thank you sweety",
    "i hate you": "I'm sorry to hear that you are upset with me", 
    
    // Add more FAQs here
};

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.pitch = 1;
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.lang = 'en-US';
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning My Friend");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon My Friend");
    } else {
        speak("Good Evening My Friend");
    }
}

window.addEventListener('load', () => {
    wishMe();
});

let speechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
let rec = new speechRec();

rec.onresult = (event) => {
    let curr = event.resultIndex;
    let transcript = event.results[curr][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    rec.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

sendBtn.addEventListener("click", () => {
    let message = userInput.value.toLowerCase();
    content.innerText = message;
    takeCommand(message);
    userInput.value = "";
});

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";
    message = message.replace(/h[i]+/g, "hi");
    if (answer){ 
        speak(answer); content.innerText = answer;
    }else{
    if (message.includes("hello") || message.includes("hey") || message.includes("namaste") || 
    message.includes("hi") ) {
        speak("Hello sir / mam, what can I help you with?");
    } else if (message.includes("who are you") ||  message.includes("what is your name")) {
        speak("Hi, I'm Riza, a virtual assistant created by Miss Suchanda Roy.");
    } else if (message.includes("how are you")) {
        speak("I'm fine, how are you?");
    } else if (message.includes("open youtube")) {
        speak("Alright, opening YouTube...");
        window.open("https://www.youtube.com/", "_blank");
    } else if (message.includes("open google")) {
        speak("Alright, opening Google...");
        window.open("https://www.google.com/", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Alright, opening Facebook...");
        window.open("https://www.facebook.com/", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Alright, opening Instagram...");
        window.open("https://www.instagram.com/", "_blank");
    } else {
        speak(`This is what I found on the internet regarding ${message}`);
        window.open(`https://www.google.com/search?q=${message}`);
    }
}
}
