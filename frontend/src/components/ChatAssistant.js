import React, { useState, useRef, useEffect } from 'react';
import './ChatAssistant.css';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Maritime Incident Dashboard assistant. I can help you understand how to use this application and answer questions about the data. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const faqResponses = {
    // Dashboard and Navigation
    'dashboard': "The dashboard shows real-time maritime incident statistics through interactive charts. You can view incident distribution by vessel type, incident type, and severity level, plus a timeline analysis.",
    'navigation': "Use the navigation bar at the top to switch between 'Dashboard' (charts and statistics) and 'Incident Reports' (detailed incident cards).",
    'charts': "The dashboard includes three pie charts showing incident distribution and a timeline bar chart. You can adjust the timeline granularity between hour, day, and month views.",
    
    // Data and Statistics
    'data': "The application displays maritime incident data including vessel types (Cargo Ship, Tanker, Fishing Vessel, Passenger Ship, Container Ship), incident types (Collision, Grounding, Fire, Equipment Failure, Weather Related), and severity levels (Low, Medium, High, Critical).",
    'vessel types': "We track 5 vessel types: Cargo Ships, Tankers, Fishing Vessels, Passenger Ships, and Container Ships. Each is color-coded in the charts.",
    'incident types': "The system categorizes incidents into: Collision, Grounding, Fire, Equipment Failure, and Weather Related incidents.",
    'severity': "Incidents are classified by severity: Low (green), Medium (yellow), High (orange), and Critical (red).",
    
    // Features and Functionality
    'timeline': "The timeline chart shows incident frequency over time. Use the dropdown to change between hourly, daily, and monthly views for different analysis perspectives.",
    'reports': "The Incident Reports page shows detailed cards for each incident with all relevant information including date, vessel type, incident type, and severity.",
    'colors': "Each chart uses consistent color coding: vessel types and incident types have unique colors, while severity uses a traffic light system (green=low, yellow=medium, orange=high, red=critical).",
    
    // Technical Information
    'api': "The application uses a REST API with endpoints for incidents (/api/incidents), statistics (/api/incidents/stats), and timeline data (/api/incidents/timeline).",
    'technology': "Built with React frontend and Node.js/Express backend. Charts are powered by Recharts library.",
    'responsive': "The dashboard is fully responsive and works on desktop, tablet, and mobile devices.",
    
    // Help and Support
    'help': "I can help you with: understanding the dashboard features, explaining the data categories, navigating the application, interpreting the charts, and technical information about the system.",
    'features': "Key features include: interactive pie charts for incident distribution, timeline analysis with adjustable granularity, detailed incident reports, responsive design, and real-time data visualization."
  };

  const getResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Check for exact matches first
    for (const [key, response] of Object.entries(faqResponses)) {
      if (message.includes(key)) {
        return response;
      }
    }
    
    // Check for common question patterns
    if (message.includes('how') && (message.includes('use') || message.includes('work'))) {
      return "To use the dashboard: 1) View the main dashboard for statistical overview, 2) Click 'Incident Reports' for detailed incident cards, 3) Use the timeline dropdown to change time granularity, 4) Hover over charts for detailed tooltips. What specific feature would you like to know more about?";
    }
    
    if (message.includes('what') && message.includes('show')) {
      return "The dashboard shows maritime incident statistics including distribution by vessel type, incident type, and severity level, plus a timeline view of incident frequency. Would you like details about any specific chart?";
    }
    
    if (message.includes('color') || message.includes('meaning')) {
      return "Colors in the charts represent different categories. Severity uses traffic light colors (green=low, red=critical). Each vessel type and incident type has its own unique color for easy identification.";
    }
    
    // Default responses for common greetings and unclear queries
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! I'm here to help you navigate and understand the Maritime Incident Dashboard. What would you like to know?";
    }
    
    if (message.includes('thank')) {
      return "You're welcome! Feel free to ask if you have any other questions about the dashboard.";
    }
    
    // Default fallback
    return "I can help you with information about the dashboard features, data categories, navigation, charts, and technical details. Try asking about: 'dashboard features', 'vessel types', 'incident types', 'timeline', 'how to use', or 'what data is shown'.";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
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
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <h3>Dashboard Assistant</h3>
              <span className="status">Online</span>
            </div>
            <button 
              className="chat-close"
              onClick={toggleChat}
              aria-label="Close chat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="message-time">{formatTime(message.timestamp)}</span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
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
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about the dashboard features..."
              rows="1"
              disabled={isTyping}
            />
            <button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;