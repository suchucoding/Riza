let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");
let userInput = document.querySelector("#user-input");
let sendBtn = document.querySelector("#send-btn");

const faq = {
    "what is your name": "I am Riza, your virtual assistant.",
    "what's your name": "I am Riza, your virtual assistant.",
    "who created you": "I was created by Miss Suchanda Roy.",
    "how are you": "I'm just a program, but I'm here to help you!",
    "what is the capital of india": "The capital of India is New Delhi.",
    "tell me a joke": "Why don't scientists trust atoms? Because they make up everything!",
    "i love you": "Thank you, that's very sweet! As an AI assistant, I don't feel the same way as humans do, but I'm glad to help you!",
    "i like you": "I'm happy that I made you like me, thank you!",
    "i hate you": "I'm sorry to hear that you are upset with me.",
    "time": `The current time is ${new Date().toLocaleTimeString()}.`,
    "date": `Today's date is ${new Date().toLocaleDateString()}.`,
    "open youtube": "Alright, opening YouTube...",
    "open google": "Alright, opening Google...",
    "open facebook": "Alright, opening Facebook...",
    "open instagram": "Alright, opening Instagram...",
    "who is the prime minister of india": "The Prime Minister of India is Narendra Modi.",
    "who is the president of usa": "The President of the United States is Donald Trump.",
    "what is your purpose": "My purpose is to assist you with tasks, answer questions, and make life easier!",
    "sing a song": "La la la... I'm singing a digital tune for you!",
    "motivate": "You are stronger than you think. Keep pushing forward, success is waiting for you!",
    "good morning": "Good morning! I hope you have a wonderful day ahead.",
    "good night": "Good night! Sweet dreams and rest well.",
    "thank you": "You're welcome! I'm always here to help.",
    "who am i": "You are my user, and I’m here to assist you!"

};

function speak(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.pitch = 1;
    utterance.rate = 1;

    let voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        let englishVoice = voices.find(v => v.lang.startsWith("en"));
        if (englishVoice) utterance.voice = englishVoice;
    }

    window.speechSynthesis.speak(utterance);
}

window.speechSynthesis.onvoiceschanged = () => {
    console.log("Voices loaded:", window.speechSynthesis.getVoices());
};

function wishMe() {
    let hours = new Date().getHours();
    if (hours < 12) speak("Good Morning My Friend");
    else if (hours < 16) speak("Good Afternoon My Friend");
    else speak("Good Evening My Friend");
}

// ✅ Force Android to use webkitSpeechRecognition
let rec;
if ('webkitSpeechRecognition' in window) {
    rec = new webkitSpeechRecognition();
    rec.continuous = false;   // stop after one phrase
    rec.interimResults = false;
    rec.lang = 'en-US';
} else {
    rec = null;
    speak("Sorry, speech recognition is not supported on this device. Please type instead.");
}

function startRecognition() {
    if (!rec) return;
    rec.start();
    btn.style.display = "none";
    voice.style.display = "block";
}

if (rec) {
    rec.onresult = (event) => {
        let transcript = event.results[0][0].transcript;
        content.innerText = transcript;
        takeCommand(transcript.toLowerCase());
    };

    rec.onerror = (err) => {
        console.error("Recognition error:", err);
        speak("I couldn't hear you properly, please try again.");
    };
}

btn.addEventListener("click", () => {
    wishMe();
    startRecognition();
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
