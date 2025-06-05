import React, { useState, useRef, useEffect } from 'react';
import './ChatAssistant.css';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Maritime Incident Dashboard assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses = {
    'hello': "Hello! Welcome to the Maritime Incident Dashboard. I'm here to help you navigate and understand our application.",
    'help': "I can help you with:\n• Understanding the dashboard features\n• Navigating between pages\n• Interpreting incident data\n• Using the charts and visualizations\n• API information\n\nWhat would you like to know more about?",
    'dashboard': "The Dashboard page shows real-time maritime incident statistics with interactive charts including:\n• Vessel Type Distribution\n• Incident Type Distribution\n• Severity Level Distribution\n• Timeline Analysis with adjustable granularity",
    'incidents': "The Incident Reports page displays detailed information about individual maritime incidents in a card format, making it easy to browse through specific incidents.",
    'api': "Our API provides these endpoints:\n• GET /api/incidents - Returns all incidents\n• GET /api/incidents/stats - Returns incident statistics\n• GET /api/incidents/timeline?granularity=<hour|day|month> - Returns timeline data",
    'data': "The dashboard uses sample data with 1000 maritime incidents. Each incident includes:\n• Date and time\n• Vessel type (Cargo Ship, Tanker, Fishing Vessel, etc.)\n• Incident type (Collision, Grounding, Fire, etc.)\n• Severity level (Low, Medium, High, Critical)",
    'charts': "Our interactive charts are built with Recharts and include:\n• Hover tooltips with detailed information\n• Responsive design for different screen sizes\n• Real-time data updates\n• Customizable time granularity for timeline view",
    'navigation': "Use the navigation bar at the top to switch between:\n• Dashboard - For statistical overview and charts\n• Incident Reports - For detailed incident information",
    'features': "Key features include:\n• Real-time incident monitoring\n• Interactive data visualizations\n• Responsive design\n• Timeline analysis with multiple granularities\n• Detailed incident reporting\n• RESTful API access"
  };

  const getResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Check for exact matches first
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (message.includes(key)) {
        return response;
      }
    }

    // Check for common question patterns
    if (message.includes('what') || message.includes('how')) {
      if (message.includes('chart') || message.includes('graph')) {
        return predefinedResponses.charts;
      }
      if (message.includes('navigate') || message.includes('use')) {
        return predefinedResponses.navigation;
      }
      if (message.includes('data') || message.includes('information')) {
        return predefinedResponses.data;
      }
    }

    // Default response
    return "I'm here to help with the Maritime Incident Dashboard. You can ask me about:\n• Dashboard features and navigation\n• Understanding the data and charts\n• API endpoints\n• How to use different parts of the application\n\nTry asking 'help' for more specific topics!";
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
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
                  {message.text.split('\n').map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
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
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about the dashboard..."
              disabled={isTyping}
            />
            <button 
              onClick={handleSendMessage}
              disabled={isTyping || inputValue.trim() === ''}
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