import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import microphoneIcon from '../../assets/icons/microphone-icon.png';
import downloadIcon from '../../assets/icons/download-icon.png'; 
import './VoiceAssistant.css';

const VoiceAssistant = () => {
  const [conversation, setConversation] = useState([]);
  const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  };

  const startRecording = () => {
    SpeechRecognition.startListening({ continuous: true });
    if (transcript) {
      setConversation((prevConversation) => [...prevConversation, transcript]);
    }
  };

  const downloadConversation = () => {
    const blob = new Blob([conversation.join('\n')], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'conversation.txt';
    link.click();
  };

return (
  <div className="voice-assistant" >
  <button 
  className='download-button'
  onClick={downloadConversation}
        onMouseEnter={(e) => e.target.style.cursor = 'pointer'}
         >
      <img src={downloadIcon} alt="Download icon" style={{ width: '20px', height: '20px', marginRight: '8px', }} />
      Download Conversation
    </button>

    <div style={{marginBottom: '20px' }}>
      <button 
        onClick={startRecording} 
        className="microphone-button"
          style={{
            backgroundImage: `url(${microphoneIcon})`,
          }}
        >
        </button>

    </div>

    {listening && <p>Microphone is active...</p>}
    {transcript && <p>Recognized Text: {transcript}</p>}
  </div>
);
};

export default VoiceAssistant;
