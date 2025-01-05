import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import microphoneIcon from '../../assets/icons/microphone-icon.png';
import downloadIcon from '../../assets/icons/download-icon.png'; 
import './VoiceAssistant.css';

const VoiceAssistant = () => {
  const [conversation, setConversation] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const { transcript, listening, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();

  // Fetch the voices when the component is mounted or when the voices change
  useEffect(() => {
    const synth = window.speechSynthesis;
    const getVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);

      // Set default voice if available
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0]);
      }
    };

    getVoices();
    synth.onvoiceschanged = getVoices; // Update voices when they change

    return () => {
      synth.onvoiceschanged = null; // Clean up when the component is unmounted
    };
  }, [selectedVoice]);

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  const handleMicrophoneClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    SpeechRecognition.startListening({ continuous: true });
    setIsRecording(true);
  };

  const stopRecording = () => {
    SpeechRecognition.stopListening();
    setIsRecording(false);

    if (transcript) {
      const userMessage = { sender: 'User', text: transcript };
      setConversation((prevConversation) => [...prevConversation, userMessage]);

      const botResponse = generateResponse(transcript);
      setConversation((prevConversation) => [...prevConversation, botResponse]);

      speak(botResponse.text);

      resetTranscript();
    }
  };

  const generateResponse = (message) => {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("hello")) {
      return { sender: 'Bot', text: "Hello! How can I assist you today?" };
    } else if (lowerCaseMessage.includes("weather")) {
      return { sender: 'Bot', text: "The weather is sunny and pleasant today!" };
    } else if (lowerCaseMessage.includes("time")) {
      return { sender: 'Bot', text: `The current time is ${new Date().toLocaleTimeString()}.` };
    } else if (lowerCaseMessage.includes("name")) {
      return { sender: 'Bot', text: "I'm your friendly voice assistant!" };
    } else if (lowerCaseMessage.includes("help")) {
      return { sender: 'Bot', text: "Sure, I'm here to help! What do you need assistance with?" };
    } else if (lowerCaseMessage.includes("bye")) {
      return { sender: 'Bot', text: "Goodbye! Have a great day!" };
    } else if (lowerCaseMessage.includes("joke")) {
      const jokes = [
        "Why don't programmers like nature? It has too many bugs!",
        "Why do Java developers wear glasses? Because they don't see sharp!",
        "How many programmers does it take to change a light bulb? None. It's a hardware problem!"
      ];
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      return { sender: 'Bot', text: randomJoke };
    } else if (lowerCaseMessage.includes("day")) {
      return { sender: 'Bot', text: `Today is ${new Date().toLocaleDateString()}.` };
    } else if (lowerCaseMessage.includes("thank you")) {
      return { sender: 'Bot', text: "You're welcome! Let me know if you need anything else." };
    } else {
      return { sender: 'Bot', text: "I'm sorry, I didn't quite understand that. Could you rephrase?" };
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice?.lang || 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const downloadConversation = () => {
    const conversationText = conversation.map(entry => `${entry.sender}: ${entry.text}`).join('\n');
    const blob = new Blob([conversationText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'conversation.txt';
    link.click();
  };

  return (
    <div className="voice-assistant">
      <div className="voice-selector">
        <label htmlFor="voice">Select Voice: </label>
        <select
          id="voice"
          value={voices.findIndex(v => v === selectedVoice)}
          onChange={(e) => setSelectedVoice(voices[e.target.value])}
        >
          {voices.map((voice, index) => (
            <option key={index} value={index}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </div>

      <button 
        className="download-button"
        onClick={downloadConversation}
        onMouseEnter={(e) => e.target.style.cursor = 'pointer'}
      >
        <img 
          src={downloadIcon} 
          alt="Download icon"
          style={{ width: '20px', height: '20px', marginRight: '8px' }} 
        />
        Download Conversation
      </button>

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={handleMicrophoneClick} 
          className="microphone-button"
          style={{
            backgroundImage: `url(${microphoneIcon})`,
            backgroundColor: isRecording ? 'red' : 'transparent',
          }}
        />
      </div>

      {listening && <p>Microphone is active...</p>}

      <div className="conversation-log">
        {conversation.map((entry, index) => (
          <p key={index} className={`message ${entry.sender.toLowerCase()}`}>
            <strong>{entry.sender}:</strong> {entry.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default VoiceAssistant;
