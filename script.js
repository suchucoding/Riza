let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");
let userInput = document.querySelector("#user-input");
let sendBtn = document.querySelector("#send-btn");

const faq = {
    "what is your name": "I am Riza, your virtual assistant.",
    "who created you": "I was created by Miss Suchanda Roy.",
    "how are you": "I'm just a program, but I'm here to help you!",
    "what is the capital of india": "The capital of India is New Delhi.",
    "tell me a joke": "Why don't scientists trust atoms? Because they make up everything!",
    "i love you": "Thank you, that’s very sweet! As I am an AI assistant, I don't feel the same way as humans do, but I'm happy to be here to help a sweet human like you!",
    "i like you": "I am happy that I made you like me, thank you sweety.",
    "i hate you": "I'm sorry to hear that you are upset with me"
};

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.pitch = 1;
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.lang = 'en-US';

    let voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        // Pick first female-like voice available
        let femaleVoice = voices.find(v => v.name.includes("Google") || v.name.includes("Samantha") || v.name.includes("Zira"));
        if (femaleVoice) text_speak.voice = femaleVoice;
    }

    window.speechSynthesis.speak(text_speak);
}

// Ensure voices are loaded
window.speechSynthesis.onvoiceschanged = () => {
    console.log("Voices loaded:", window.speechSynthesis.getVoices());
};

function wishMe() {
    let hours = new Date().getHours();
    if (hours < 12) {
        speak("Good Morning My Friend");
    } else if (hours < 16) {
        speak("Good Afternoon My Friend");
    } else {
        speak("Good Evening My Friend");
    }
}

// Only greet after user taps a button (mobile restriction)
btn.addEventListener("click", () => {
    wishMe();
    startRecognition();
});

let speechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
let rec = speechRec ? new speechRec() : null;

function startRecognition() {
    if (!rec) {
        speak("Sorry, speech recognition is not supported on this device. Please type instead.");
        return;
    }
    rec.start();
    btn.style.display = "none";
    voice.style.display = "block";
}

if (rec) {
    rec.onresult = (event) => {
        let transcript = event.results[event.resultIndex][0].transcript;
        content.innerText = transcript;
        takeCommand(transcript.toLowerCase());
    };
}

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

    let answer = faq[message.trim()];
    if (answer) {
        speak(answer);
        content.innerText = answer;
        return;
    }

    if (message.includes("hello") || message.includes("hey") || message.includes("namaste") || message.includes("hi")) {
        speak("Hello sir / mam, what can I help you with?");
    } else if (message.includes("who are you") || message.includes("what is your name")) {
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
