import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import microphoneIcon from '../../assets/icons/microphone-icon.png';
import stopIcon from '../../assets/icons/stop-icon.png';
import sendTextIcon from '../../assets/icons/send-text-icon.png';
import downloadIcon from '../../assets/icons/download-icon.png'; 
import Timer from '../Timer/Timer.js';

const VoiceAssistant = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [conversation, setConversation] = useState([]);
  const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();


  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  const startRecording = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopRecording = () => {
    SpeechRecognition.stopListening();

    if (transcript) {
      setConversation(prevConversation => [...prevConversation, transcript]);
    }
  };

  const downloadConversation = () => {
    const blob = new Blob([conversation.join('\n')], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'conversation.txt';
    link.click();
  };

  const handleSendText = () => {
    if (transcript) {
      setMessage(transcript);
      setResponse("Text sent successfully!");
    } else {
      setResponse("No text recognized.");
    }
  };

return (
  <div className="voice-assistant">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
      <div style={{ flex: 1, maxWidth: '45%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
        <h2>Welcome to Voicer</h2>
        <p>Explore the topic displayed on your screen and feel free to dive into the conversation with us. Let's make it engaging and insightful.</p>

        <h4>Topic:</h4>
        <p>How can technology and Artificial Intelligence transform and improve the education system?</p>
      </div>
    </div> 

    <Timer duration={300}/>

    <div
      style={{
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
        marginBottom: '20px',
      }}
    >

      <p>
        Hi! I'm VOICER.
        I'd love to discuss how technology and Artificial Intelligence can
        transform and improve the education system. What are your thoughts
        on this topic?
      </p>
    </div>

    <div style={{ marginBottom: '20px' }}>
      <button 
        onClick={startRecording} 
        style={{
          background: `url(${microphoneIcon})`,
          backgroundSize: 'cover',
          width: '100px',
          height: '100px',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
        }}
      >
      </button>

      <button 
        onClick={stopRecording} 
        style={{
          background: `url(${stopIcon})`,
          backgroundSize: 'cover',
          width: '100px',
          height: '100px',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
        }}
      >
      </button>

      <button 
        onClick={handleSendText}
        style={{
          background: `url(${sendTextIcon})`,
          backgroundSize: 'cover',
          width: '100px',
          height: '100px',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
        }}
      >
      </button>
    </div>

    {listening && <p>Microphone is active...</p>}
    {transcript && <p>Recognized Text: {transcript}</p>}
    {message && <p>Message: {message}</p>}
    {response && <p>{response}</p>}

    

    <button onClick={downloadConversation}
    style={{ marginTop: '20px',
     padding: '10px',
      backgroundColor: '#4c5caf',
       color: 'white',
        border: 'none',
         borderRadius: '5px',
         cursor:'pointer',
         display: 'flex',
          alignItems: 'center',
        }}
        onMouseEnter={(e) => e.target.style.cursor = 'pointer'}
         >
      <img src={downloadIcon} alt="Download icon" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
      Download Conversation
    </button>
  </div>
);
};

export default VoiceAssistant;
