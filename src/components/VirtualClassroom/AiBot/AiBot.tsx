import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface AiBotProps {
  onClose: () => void;
}

const AiBot: React.FC<AiBotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi Alex! I'm your AI learning companion 🤖. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const mockResponses = [
    "That's a great question! Let me help you with that. 🎯",
    "I can see you're working on something challenging. Remember, every expert was once a beginner! 💪",
    "Here's a tip: Try breaking this problem down into smaller steps. What's the first thing you need to figure out? 🤔",
    "You're making excellent progress! Your dedication to learning is inspiring. 🌟",
    "Let's approach this differently. What if we think about it from a real-world perspective? 🌍",
    "I notice you're curious about this topic. Would you like me to suggest some additional resources? 📚",
    "Remember, making mistakes is part of learning. What matters is that you keep trying! 🚀"
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Help with math homework",
    "Explain programming concepts",
    "Study tips",
    "Creative project ideas"
  ];

  return (
    <ChatContainer>
      <ChatHeader>
        <BotAvatar>🤖</BotAvatar>
        <BotInfo>
          <BotName>AI Learning Companion</BotName>
          <BotStatus>Online</BotStatus>
        </BotInfo>
        <CloseButton onClick={onClose}>×</CloseButton>
      </ChatHeader>

      <MessagesContainer>
        {messages.map((message) => (
          <MessageWrapper key={message.id} isBot={message.isBot}>
            <MessageBubble isBot={message.isBot}>
              {message.isBot && <MessageAvatar>🤖</MessageAvatar>}
              <MessageContent>
                <MessageText>{message.text}</MessageText>
                <MessageTime>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </MessageTime>
              </MessageContent>
              {!message.isBot && <MessageAvatar>🧑‍🎓</MessageAvatar>}
            </MessageBubble>
          </MessageWrapper>
        ))}
        
        {isTyping && (
          <MessageWrapper isBot={true}>
            <MessageBubble isBot={true}>
              <MessageAvatar>🤖</MessageAvatar>
              <TypingIndicator>
                <TypingDot />
                <TypingDot />
                <TypingDot />
              </TypingIndicator>
            </MessageBubble>
          </MessageWrapper>
        )}
        <div ref={messagesEndRef} />
      </MessagesContainer>

      <QuickQuestions>
        {quickQuestions.map((question, index) => (
          <QuickQuestionButton
            key={index}
            onClick={() => setInputText(question)}
          >
            {question}
          </QuickQuestionButton>
        ))}
      </QuickQuestions>

      <InputContainer>
        <MessageInput
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything about your learning..."
        />
        <SendButton onClick={handleSendMessage} disabled={!inputText.trim()}>
          📤
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  width: 400px;
  height: 600px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  background: linear-gradient(45deg, #4ecdc4, #44a08d);
  color: white;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BotAvatar = styled.div`
  font-size: 2rem;
  width: 50px;
  height: 50px;
  background: rgba(255,255,255,0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BotInfo = styled.div`
  flex: 1;
`;

const BotName = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
`;

const BotStatus = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255,255,255,0.2);
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isBot'
})<{ isBot: boolean }>`
  display: flex;
  justify-content: ${props => props.isBot ? 'flex-start' : 'flex-end'};
`;

const MessageBubble = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isBot'
})<{ isBot: boolean }>`
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  max-width: 80%;
  flex-direction: ${props => props.isBot ? 'row' : 'row-reverse'};
`;

const MessageAvatar = styled.div`
  font-size: 1.5rem;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageText = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isBot'
})<{ isBot?: boolean }>`
  background: ${props => props.isBot ? '#f1f3f4' : '#4ecdc4'};
  color: ${props => props.isBot ? '#333' : 'white'};
  padding: 0.75rem 1rem;
  border-radius: 20px;
  border-bottom-left-radius: ${props => props.isBot ? '5px' : '20px'};
  border-bottom-right-radius: ${props => props.isBot ? '20px' : '5px'};
  word-wrap: break-word;
`;

const MessageTime = styled.div`
  font-size: 0.7rem;
  color: #666;
  margin-top: 0.25rem;
  text-align: center;
`;

const TypingIndicator = styled.div`
  background: #f1f3f4;
  padding: 1rem;
  border-radius: 20px;
  border-bottom-left-radius: 5px;
  display: flex;
  gap: 4px;
  align-items: center;
`;

const TypingDot = styled.div`
  width: 8px;
  height: 8px;
  background: #666;
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out;

  &:nth-child(1) { animation-delay: -0.32s; }
  &:nth-child(2) { animation-delay: -0.16s; }

  @keyframes typing {
    0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
    40% { transform: scale(1); opacity: 1; }
  }
`;

const QuickQuestions = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  background: #f8f9fa;
`;

const QuickQuestionButton = styled.button`
  background: white;
  border: 1px solid #ddd;
  border-radius: 15px;
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #4ecdc4;
    color: white;
    border-color: #4ecdc4;
  }
`;

const InputContainer = styled.div`
  padding: 1rem;
  background: #f8f9fa;
  display: flex;
  gap: 0.5rem;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 25px;
  outline: none;
  font-size: 0.9rem;

  &:focus {
    border-color: #4ecdc4;
  }
`;

const SendButton = styled.button`
  background: ${props => props.disabled ? '#ccc' : '#4ecdc4'};
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background 0.2s ease;
  font-size: 1.2rem;

  &:hover:not(:disabled) {
    background: #44a08d;
  }
`;

export default AiBot;