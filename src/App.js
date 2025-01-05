import React, {useEffect} from 'react';
import Header from './components/Header/Header.js';
import Timer from './components/Timer/Timer.js';
import VoiceAssistant from './components/VoiceAssistant/VoiceAssistant.js';
import './App.css';
import alanBtn from "@alan-ai/alan-sdk-web";
import ChatMessage from './components/ChatMessage/ChatMessage.js'

const App = () => {

  useEffect(() => {
      alanBtn({
        key: '28b4365114e0f2f67d43485dbc3cb44a2e956eca572e1d8b807a3e2338fdd0dc/stage',
          host: 'v1.alan.app',
          onCommand: (commandData) => {
              if (commandData.command === 'go:back') {
                 console.log('Go back command received');
              }

              if (commandData.command === 'What is your name?') {
                alanBtn().playText("It's Alan, and yours?");
              }

              if (commandData.command === 'How are you doing?') {
                alanBtn().playText("Good, thank you. What about you?");
              }
              
          },
      });
    }, []);

  return (
    <div className="App">
      <Header />
      <Timer />
      <ChatMessage />
      <VoiceAssistant />
    </div>
  );
}


export default App;