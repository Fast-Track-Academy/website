import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import './ChatPanel.css';

interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onClose: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({
  messages,
  onSendMessage,
  onClose
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus input when panel opens
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputMessage.trim()) {
      onSendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const getMessageTime = (timestamp: number) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours}h ago`;
    } else {
      return messageDate.toLocaleDateString();
    }
  };

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <div className="chat-title">
          <h3>💬 Classroom Chat</h3>
          <span className="message-count">
            {messages.length} {messages.length === 1 ? 'message' : 'messages'}
          </span>
        </div>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💭</div>
            <p>No messages yet...</p>
            <p className="empty-subtitle">Be the first to say hello!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="message">
              <div className="message-header">
                <span className="message-author">{message.userName}</span>
                <span className="message-time" title={new Date(message.timestamp).toLocaleString()}>
                  {getMessageTime(message.timestamp)}
                </span>
              </div>
              <div className="message-content">
                {message.message}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="chat-input"
            maxLength={500}
          />
          <button
            type="submit"
            className="send-btn"
            disabled={!inputMessage.trim()}
            title="Send message (Enter)"
          >
            📤
          </button>
        </div>
        <div className="input-footer">
          <span className="char-count">
            {inputMessage.length}/500
          </span>
          <span className="input-hint">
            Press Enter to send
          </span>
        </div>
      </form>
    </div>
  );
};

export default ChatPanel;