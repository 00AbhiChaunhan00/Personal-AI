import { createContext, useState } from "react";
import { main } from "./API.js";

export const DataContext = createContext();
function Usedcontext({ children }) {
  let [speaking, setSpeaking] = useState(false); // this is for the change after click we get laoding img and paragraph
  let [prompt, setprompt] = useState("listening...."); // this is for the paragraph we use setptompt in 2 , 1-our question ans 2- the ai response
  let [response, setresponse] = useState(false); // this is for the another loading img when ai give response

  // this is function for it gives reply by voice
  function speak(text) {
    const synth = window.speechSynthesis;
    const talk = new SpeechSynthesisUtterance(text); // this is speak function
    talk.lang = "hi-IN";
    talk.pitch = 1;
    talk.rate = 1;
    talk.volume = 1;

    // this is only for voice tone
    const voices = synth.getVoices();
    const hindiVoice = voices.find(
      (v) => v.lang === "hi-IN" || v.name.includes("Google हिन्दी")
    );
    if (hindiVoice) talk.voice = hindiVoice;
    synth.speak(talk);
  }

  //function for the ai response to send them prompt and take answer form api
  async function aiResponse(prompt) {
    let question = await main(prompt);

    // Sometimes, the API might return an object instead of plain text,
    // for example: { answer: "Hello!" } or something similar.
    // So, if the response is an object, we convert it into text using JSON.stringify.
    if (typeof question === "object") {
      question = JSON.stringify(question);
    }
    // if api gives something werid datatype so we convert in into string
    if (typeof question !== "string") {
      question = String(question);
    }

    let answer =
      question.split("**") &&
      question.replace("*", " ") &&
      question.replace("google", "Abhishek") &&
      question.replace("Google", "Abhishek");

    speak(answer);
    setprompt(answer); // here it shows what api gives
    setresponse(true); // for loading respone gif
    // console.log("Your answer:",answer);

    setTimeout(() => {
      setSpeaking(false);
      setprompt(false)
    }, 15000); // we set this timeout because by this we can set the value setspeaking to false so after 10 sec value became false and click button should appear beacuse when vlaue is true this it show the loading img
  }

  // for mic speech recognization here it use the mic to get our question and then we send it to the api server
  let speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition; // these 2 are the built-in function for speech recognize
  let recognization = new speechRecognition();
  //  recognization.lang="hi-IN"
  recognization.onresult = (e) => {
    let transcript = e.results[0][0].transcript; // this is data we get into obejct in console
    setprompt(transcript); // here it shows what you speak
    selfCommand(transcript.toLowerCase());
  };

  // this is to setthe what we want to open by model
  function selfCommand(cmd) {
    if (cmd.includes("open") && cmd.includes("youtube")) {
      window.open("https://www.youtube.com/", "_blank"); // we write blank for the new tab
      speak("opening youtube");
      setprompt("opening youtube..");
      setTimeout(() => {
        setSpeaking(false);
      }, 4000);
    }
    if (cmd.includes("open") && cmd.includes("amazon")) {
      window.open("https://www.amazon.in/", "_blank");
      speak("opening amazon");
      setprompt("opening amazon..");
      setTimeout(() => {
        setSpeaking(false);
      }, 3000);
    } else if (cmd.includes("time") || cmd.includes("date")) {
      let time = new Date().toLocaleString('hi-IN');
      speak(time);
      setprompt(`Time is: ${time}`);
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (cmd.includes("open") && cmd.includes("github")) {
      window.open("https://github.com/", "_blank");
      speak("opening github");
      setprompt("opening github..");
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (cmd.includes("open") && cmd.includes("my github")) {
      window.open("https://github.com/00AbhiChaunhan00", "_blank");
      speak("opening your github profile");
      setprompt("opening github profile..");
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (cmd.includes("open") && cmd.includes("linkedin")) {
      window.open("https://www.linkedin.com", "_blank");
      speak("opening linkedin");
      setprompt("opening linkedin..");
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (cmd.includes("open") || cmd.includes("google")) {
      window.open("https://www.google.com/", "_blank");
      speak("opening google search");
      setprompt("opening google..");
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (cmd.includes("open") || cmd.includes("instagram")) {
      window.open("https://www.instagram.com/", "_blank");
      speak("opening instagram ");
      setprompt("opening instagram..");
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else {
      aiResponse(cmd);
      // setSpeaking(false);
    }
  }
  let values = {
    recognization,
    speak,
    speaking,
    setSpeaking,
    prompt,
    setprompt,
    response,
    setresponse,
  };
  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
}
export default Usedcontext;
