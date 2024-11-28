let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice= document.querySelector("#voice");

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
    btn.style.display="none";
    voice.style.display="block";
});

function takeCommand(message) {
    btn.style.display="flex";
    voice.style.display="none";
    if (message.includes("hello") || message.includes("hey") || message.includes("namaste")) {
        speak("Hello sir, what can I help you with?");
    } else if (message.includes("who are you")) {
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
    }else if (message.includes("open calculator")) {
        speak("Alright, opening calculator...");
        window.open("calculator://");
    }else if (message.includes("open whatsapp")) {
        speak("Alright, opening whatsapp");
        window.open("whatsapp://");
    }
    else {
        speak(`This is what I found on the internet regarding ${message.replace("Riza","")||message.replace("Lisa","")}`);
        window.open(`https://www.google.com/search?q=${message}`);

    }
}