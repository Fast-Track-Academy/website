import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AiBot from '../AiBot/AiBot';

interface Student {
  id: string;
  name: string;
  avatar: string;
  position: { x: number; y: number };
  isActive: boolean;
}

const ClassroomScene: React.FC = () => {
  const [showAiChat, setShowAiChat] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const students: Student[] = [
    { id: '1', name: 'Alex (You)', avatar: '🧑‍🎓', position: { x: 20, y: 60 }, isActive: true },
    { id: '2', name: 'Emma', avatar: '👩‍🎓', position: { x: 40, y: 50 }, isActive: true },
    { id: '3', name: 'Sam', avatar: '👨‍🎓', position: { x: 60, y: 70 }, isActive: false },
    { id: '4', name: 'Maya', avatar: '👩‍🎓', position: { x: 80, y: 55 }, isActive: true },
  ];

  const teacherBot = {
    name: 'Professor AI',
    avatar: '🤖👨‍🏫',
    position: { x: 50, y: 20 }
  };

  const currentLesson = {
    subject: "Advanced React Patterns",
    topic: "Custom Hooks & Context API",
    progress: 65,
    timeRemaining: "25 minutes"
  };

  return (
    <ClassroomContainer>
      <Header>
        <BackButton to="/dashboard">← Back to Dashboard</BackButton>
        <LessonInfo>
          <LessonTitle>{currentLesson.subject}</LessonTitle>
          <LessonTopic>{currentLesson.topic}</LessonTopic>
          <LessonProgress>
            <ProgressBar>
              <ProgressFill width={currentLesson.progress} />
            </ProgressBar>
            <ProgressText>{currentLesson.progress}% • {currentLesson.timeRemaining} left</ProgressText>
          </LessonProgress>
        </LessonInfo>
      </Header>

      <ClassroomView>
        <Whiteboard>
          <WhiteboardContent>
            <h2>🎯 Today's Learning Goals</h2>
            <GoalsList>
              <Goal completed>✅ Understand useState and useEffect</Goal>
              <Goal completed>✅ Create custom hooks</Goal>
              <Goal current>🔄 Implement Context API</Goal>
              <Goal>⏳ Build real-world example</Goal>
            </GoalsList>
            
            <CodeExample>
              <h3>💻 Live Code Example</h3>
              <CodeBlock>
                {`const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  
  return { count, increment, decrement };
};`}
              </CodeBlock>
            </CodeExample>
          </WhiteboardContent>
        </Whiteboard>

        <ClassroomFloor>
          {/* Teacher Bot */}
          <TeacherBot
            style={{
              left: `${teacherBot.position.x}%`,
              top: `${teacherBot.position.y}%`
            }}
            onClick={() => setShowAiChat(true)}
          >
            <BotAvatar>{teacherBot.avatar}</BotAvatar>
            <BotName>{teacherBot.name}</BotName>
            <BotStatus>Teaching...</BotStatus>
          </TeacherBot>

          {/* Student Desks */}
          {students.map((student) => (
            <StudentDesk
              key={student.id}
              style={{
                left: `${student.position.x}%`,
                top: `${student.position.y}%`
              }}
              isActive={student.isActive}
              isSelected={selectedStudent === student.id}
              onClick={() => setSelectedStudent(student.id)}
            >
              <DeskSurface />
              <StudentAvatar isActive={student.isActive}>
                {student.avatar}
              </StudentAvatar>
              <StudentName>{student.name}</StudentName>
              {student.isActive && (
                <ActivityIndicator>
                  <span>💭</span>
                  <Tooltip>Actively participating</Tooltip>
                </ActivityIndicator>
              )}
            </StudentDesk>
          ))}

          {/* Interactive Elements */}
          <InteractiveElement 
            style={{ left: '10%', top: '30%' }}
            onClick={() => alert('Opening resource library...')}
          >
            📚
            <ElementLabel>Resource Library</ElementLabel>
          </InteractiveElement>

          <InteractiveElement 
            style={{ left: '90%', top: '30%' }}
            onClick={() => alert('Opening collaboration tools...')}
          >
            🤝
            <ElementLabel>Collaboration Tools</ElementLabel>
          </InteractiveElement>

          <InteractiveElement 
            style={{ left: '10%', top: '80%' }}
            onClick={() => setShowAiChat(true)}
          >
            🤖
            <ElementLabel>AI Assistant</ElementLabel>
          </InteractiveElement>

          <InteractiveElement 
            style={{ left: '90%', top: '80%' }}
            onClick={() => alert('Opening project workspace...')}
          >
            🛠️
            <ElementLabel>Project Workspace</ElementLabel>
          </InteractiveElement>
        </ClassroomFloor>
      </ClassroomView>

      <ControlPanel>
        <ControlGroup>
          <ControlButton onClick={() => setShowAiChat(!showAiChat)}>
            🤖 Ask AI Tutor
          </ControlButton>
          <ControlButton onClick={() => alert('Raising hand...')}>
            ✋ Raise Hand
          </ControlButton>
          <ControlButton onClick={() => alert('Opening notes...')}>
            📝 Take Notes
          </ControlButton>
          <ControlButton onClick={() => alert('Starting breakout room...')}>
            👥 Breakout Room
          </ControlButton>
        </ControlGroup>

        <ParticipantsList>
          <h4>👥 Participants ({students.filter(s => s.isActive).length + 1}/5)</h4>
          <ParticipantItem>
            <span>🤖</span> Professor AI (Teacher)
          </ParticipantItem>
          {students.map(student => (
            <ParticipantItem key={student.id} isActive={student.isActive}>
              <span>{student.avatar}</span> 
              {student.name}
              {student.isActive && <ActiveDot />}
            </ParticipantItem>
          ))}
        </ParticipantsList>
      </ControlPanel>

      {showAiChat && (
        <AiBotContainer>
          <AiBot onClose={() => setShowAiChat(false)} />
        </AiBotContainer>
      )}
    </ClassroomContainer>
  );
};

const ClassroomContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background: rgba(255,255,255,0.95);
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const BackButton = styled(Link)`
  color: #333;
  text-decoration: none;
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  transition: background 0.3s ease;

  &:hover {
    background: #e9ecef;
  }
`;

const LessonInfo = styled.div`
  flex: 1;
`;

const LessonTitle = styled.h1`
  margin: 0 0 0.25rem 0;
  font-size: 1.5rem;
  color: #333;
`;

const LessonTopic = styled.p`
  margin: 0 0 0.5rem 0;
  color: #666;
  font-size: 1rem;
`;

const LessonProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProgressBar = styled.div`
  background: #e9ecef;
  border-radius: 10px;
  height: 8px;
  width: 200px;
  overflow: hidden;
`;

const ProgressFill = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'width'
})<{ width: number }>`
  background: linear-gradient(45deg, #4ecdc4, #44a08d);
  height: 100%;
  width: ${props => props.width}%;
  transition: width 0.3s ease;
`;

const ProgressText = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const ClassroomView = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 500px;
`;

const Whiteboard = styled.div`
  background: white;
  margin: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  height: 300px;
  overflow: hidden;
`;

const WhiteboardContent = styled.div`
  padding: 2rem;
  height: 100%;
  overflow-y: auto;

  h2 {
    margin: 0 0 1rem 0;
    color: #333;
    border-bottom: 2px solid #4ecdc4;
    padding-bottom: 0.5rem;
  }

  h3 {
    margin: 1.5rem 0 0.5rem 0;
    color: #333;
  }
`;

const GoalsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Goal = styled.div.withConfig({
  shouldForwardProp: (prop) => !['completed', 'current'].includes(prop)
})<{ completed?: boolean; current?: boolean }>`
  padding: 0.5rem 0;
  font-size: 1rem;
  color: ${props => props.completed ? '#28a745' : props.current ? '#007bff' : '#666'};
  font-weight: ${props => props.current ? 'bold' : 'normal'};
`;

const CodeExample = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1rem;
`;

const CodeBlock = styled.pre`
  background: #282c34;
  color: #abb2bf;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 0.9rem;
  margin: 0;
`;

const ClassroomFloor = styled.div`
  flex: 1;
  position: relative;
  background: 
    radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 70%),
    radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 70%);
  margin: 0 2rem 2rem 2rem;
  border-radius: 15px;
  min-height: 400px;
`;

const TeacherBot = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: transform 0.3s ease;
  text-align: center;

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

const BotAvatar = styled.div`
  font-size: 3rem;
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #ff6b6b, #ffa726);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.5rem auto;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
`;

const BotName = styled.div`
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const BotStatus = styled.div`
  color: rgba(255,255,255,0.8);
  font-size: 0.8rem;
`;

const StudentDesk = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isActive', 'isSelected'].includes(prop)
})<{ isActive: boolean; isSelected: boolean }>`
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  opacity: ${props => props.isActive ? 1 : 0.6};

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
  }

  ${props => props.isSelected && `
    transform: translate(-50%, -50%) scale(1.2);
  `}
`;

const DeskSurface = styled.div`
  width: 60px;
  height: 40px;
  background: linear-gradient(45deg, #8B4513, #A0522D);
  border-radius: 10px;
  margin: 0 auto 0.5rem auto;
  box-shadow: 0 3px 10px rgba(0,0,0,0.3);
`;

const StudentAvatar = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isActive'
})<{ isActive: boolean }>`
  font-size: 2rem;
  width: 50px;
  height: 50px;
  background: ${props => props.isActive 
    ? 'linear-gradient(45deg, #4ecdc4, #44a08d)' 
    : 'linear-gradient(45deg, #bbb, #999)'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.5rem auto;
  box-shadow: 0 3px 10px rgba(0,0,0,0.3);
  position: relative;
  top: -25px;
`;

const StudentName = styled.div`
  color: white;
  font-weight: bold;
  font-size: 0.8rem;
  position: relative;
  top: -20px;
`;

const ActivityIndicator = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  background: #ffa726;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
`;

const Tooltip = styled.div`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: white;
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 0.7rem;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ActivityIndicator}:hover & {
    opacity: 1;
  }
`;

const InteractiveElement = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: rgba(255,255,255,0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);

  &:hover {
    transform: translate(-50%, -50%) scale(1.2);
    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
  }
`;

const ElementLabel = styled.div`
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.8);
  color: white;
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 0.7rem;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${InteractiveElement}:hover & {
    opacity: 1;
  }
`;

const ControlPanel = styled.div`
  background: rgba(255,255,255,0.95);
  padding: 1rem 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
`;

const ControlGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ControlButton = styled.button`
  background: linear-gradient(45deg, #4ecdc4, #44a08d);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }
`;

const ParticipantsList = styled.div`
  h4 {
    margin: 0 0 1rem 0;
    color: #333;
  }
`;

const ParticipantItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isActive'
})<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  color: ${props => props.isActive ? '#333' : '#666'};
  font-size: 0.9rem;
`;

const ActiveDot = styled.div`
  width: 8px;
  height: 8px;
  background: #28a745;
  border-radius: 50%;
  margin-left: auto;
`;

const AiBotContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
`;

export default ClassroomScene;