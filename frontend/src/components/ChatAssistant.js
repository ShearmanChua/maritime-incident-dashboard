import React, { useState, useRef, useEffect } from 'react';
import './ChatAssistant.css';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your maritime dashboard assistant. How can I help you today?",
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
    'help': "I can help you with:\n• Understanding dashboard features\n• Navigating incident data\n• Interpreting charts and statistics\n• Finding specific information\n• Using filters and search\n\nWhat would you like to know more about?",
    'dashboard': "The maritime dashboard displays incident data with interactive charts, maps, and statistics. You can filter by date, incident type, and location to analyze maritime safety trends.",
    'incidents': "Maritime incidents include collisions, groundings, fires, equipment failures, and other safety events. Use the filters to explore specific types of incidents or time periods.",
    'charts': "The dashboard includes various charts:\n• Incident trends over time\n• Incident types distribution\n• Geographic distribution\n• Severity analysis\n\nClick on chart elements for detailed information.",
    'filters': "Use the filter panel to:\n• Select date ranges\n• Choose incident types\n• Filter by location\n• Sort by severity\n\nFilters help you focus on specific data subsets.",
    'map': "The interactive map shows incident locations. Click on markers to see incident details. Use zoom controls to explore specific regions.",
    'data': "The dashboard displays real-time maritime incident data from various sources. Data is updated regularly to provide current safety insights.",
    'navigation': "Navigate using:\n• Main menu for different sections\n• Breadcrumbs for current location\n• Search bar for quick access\n• Filter controls for data refinement",
    'export': "You can export data and charts in various formats. Look for export buttons in each section to download reports or share insights.",
    'default': "I'm not sure about that specific question, but I can help you with dashboard navigation, incident data interpretation, chart analysis, and general maritime safety information. What would you like to explore?"
  };

  const getResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Check for keywords in the message
    for (const [keyword, response] of Object.entries(predefinedResponses)) {
      if (keyword !== 'default' && lowerMessage.includes(keyword)) {
        return response;
      }
    }
    
    return predefinedResponses.default;
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getResponse(inputMessage),
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

          <div className="quick-actions">
            <button onClick={() => setInputMessage('help')}>Help</button>
            <button onClick={() => setInputMessage('dashboard')}>Dashboard Info</button>
            <button onClick={() => setInputMessage('charts')}>Charts Guide</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;