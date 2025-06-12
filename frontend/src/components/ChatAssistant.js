import React, { useState, useRef, useEffect } from 'react';
import './ChatAssistant.css';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your maritime incident dashboard assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses = {
    'hello': "Hello! I'm here to help you navigate the maritime incident dashboard.",
    'help': "I can help you with:\n• Understanding incident statistics\n• Navigating the dashboard\n• Explaining chart data\n• Finding specific incident information\n• Understanding vessel types and incident categories",
    'dashboard': "The dashboard shows real-time maritime incident data with interactive charts for vessel types, incident types, severity levels, and timeline analysis.",
    'incidents': "You can view detailed incident reports by clicking on 'Incident Reports' in the navigation menu. Each incident includes vessel type, incident type, and severity level.",
    'charts': "The dashboard includes pie charts for vessel distribution, incident types, and severity levels, plus a timeline chart showing incident frequency over time.",
    'vessel': "We track incidents for 5 vessel types: Cargo Ships, Tankers, Fishing Vessels, Passenger Ships, and Container Ships.",
    'severity': "Incidents are categorized into 4 severity levels: Low, Medium, High, and Critical.",
    'timeline': "The timeline chart shows incident frequency over time. You can adjust the granularity to view data by hour, day, or month.",
    'navigation': "Use the navigation menu at the top to switch between the Dashboard view and Incident Reports view.",
    'default': "I'm not sure about that specific question, but I can help you with dashboard navigation, incident data, charts, and general information about the maritime incident tracking system."
  };

  const generateResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Check for keywords in the message
    for (const [keyword, response] of Object.entries(predefinedResponses)) {
      if (keyword !== 'default' && message.includes(keyword)) {
        return response;
      }
    }
    
    // Default response
    return predefinedResponses.default;
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: generateResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-assistant">
      {/* Chat Toggle Button */}
      <button 
        className={`chat-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggleChat}
        aria-label="Toggle chat assistant"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Maritime Assistant</h3>
            <span className="status-indicator">Online</span>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`message ${message.sender}`}
              >
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="message-time">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot typing">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about the dashboard..."
              disabled={isTyping}
            />
            <button 
              onClick={handleSendMessage}
              disabled={isTyping || inputMessage.trim() === ''}
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;