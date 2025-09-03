// File: src/App.js

import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import { FaCommentDots } from 'react-icons/fa';

import config from './chatbot/config';
import MessageParser from './chatbot/MessageParser';
import ActionProvider from './chatbot/ActionProvider';
import './App.css';

function App() {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot((prev) => !prev);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Skin Disease Detection System</h1>
        <p>Your main application content goes here.</p>
      </header>

      <div className="chatbot-container">
        {showChatbot && (
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        )}
      </div>

      <button className="chatbot-toggle-button" onClick={toggleChatbot}>
        <FaCommentDots size={30} />
      </button>
    </div>
  );
}

export default App;