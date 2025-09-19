import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { socketService } from '../services/socketService';
import VirtualClassroom from '../components/VirtualClassroom';
import AvatarSelector from '../components/AvatarSelector';
import ChatPanel from '../components/ChatPanel';
import UserPanel from '../components/UserPanel';
import type { User, Avatar, Position, Room, ChatMessage } from '../types';
import './ClassroomPage.css';

const ClassroomPage: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [showAvatarSelector, setShowAvatarSelector] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userName, setUserName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar>({
    type: 'student',
    color: '#3182ce'
  });
  const [error, setError] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const connectToServer = useCallback(async () => {
    try {
      await socketService.connect();
      setIsConnected(true);
      setError(null);
    } catch (err) {
      setError('Failed to connect to server. Please try again.');
      console.error('Connection error:', err);
    }
  }, []);

  const joinClassroom = useCallback((name: string, avatar: Avatar) => {
    if (!isConnected || !name.trim()) return;

    const userData: Omit<User, 'id'> = {
      name: name.trim(),
      avatar,
      position: { x: 400, y: 500 },
      room: 'main-classroom'
    };

    socketService.joinRoom('main-classroom', userData);
    setUserName(name.trim());
    setSelectedAvatar(avatar);
    setShowAvatarSelector(false);
  }, [isConnected]);

  const handleMove = useCallback((position: Position) => {
    if (isJoined) {
      socketService.move(position);
    }
  }, [isJoined]);

  const handleSendMessage = useCallback((message: string) => {
    if (isJoined && message.trim()) {
      socketService.sendMessage(message.trim());
    }
  }, [isJoined]);

  const handleAvatarUpdate = useCallback((avatar: Avatar) => {
    if (isJoined) {
      socketService.updateAvatar(avatar);
      setSelectedAvatar(avatar);
    }
  }, [isJoined]);

  useEffect(() => {
    connectToServer();

    // Set up event listeners
    socketService.onRoomJoined((roomData) => {
      setRoom(roomData);
      setUsers(roomData.users);
      setMessages(roomData.messages);
      setIsJoined(true);

      // Find current user
      const user = roomData.users.find(u => u.name === userName);
      if (user) {
        setCurrentUser(user);
      }
    });

    socketService.onUserJoined((user) => {
      setUsers(prev => [...prev, user]);
    });

    socketService.onUserLeft((userId) => {
      setUsers(prev => prev.filter(u => u.id !== userId));
    });

    socketService.onUserMoved((userId, position) => {
      setUsers(prev => prev.map(u => 
        u.id === userId ? { ...u, position } : u
      ));
    });

    socketService.onUserListUpdate((userList) => {
      setUsers(userList);
      
      // Update current user if needed
      const user = userList.find(u => u.name === userName);
      if (user) {
        setCurrentUser(user);
      }
    });

    socketService.onChatMessage((message) => {
      setMessages(prev => [...prev, message]);
    });

    socketService.onError((errorMessage) => {
      setError(errorMessage);
    });

    return () => {
      // Clean up event listeners
      socketService.offRoomJoined();
      socketService.offUserJoined();
      socketService.offUserLeft();
      socketService.offUserMoved();
      socketService.offUserListUpdate();
      socketService.offChatMessage();
      socketService.offError();
      
      if (isJoined) {
        socketService.leaveRoom('main-classroom');
      }
      socketService.disconnect();
    };
  }, [connectToServer, userName]);

  if (!isConnected) {
    return (
      <div className="classroom-page loading">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h2>Connecting to Virtual Classroom...</h2>
          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={connectToServer} className="btn btn-primary">
                Retry Connection
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (showAvatarSelector) {
    return (
      <div className="classroom-page setup">
        <div className="setup-content">
          <header className="setup-header">
            <Link to="/" className="back-link">← Back to Home</Link>
            <h1>🏫 Join Virtual Classroom</h1>
          </header>
          
          <AvatarSelector
            userName={userName}
            selectedAvatar={selectedAvatar}
            onUserNameChange={setUserName}
            onAvatarChange={setSelectedAvatar}
            onJoin={joinClassroom}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="classroom-page active">
      <header className="classroom-header">
        <div className="header-left">
          <Link to="/" className="back-link">← Exit Classroom</Link>
          <h1>🏫 {room?.name || 'Virtual Classroom'}</h1>
        </div>
        
        <div className="header-right">
          <div className="header-stats">
            <span className="stat">
              👥 {users.length} {users.length === 1 ? 'user' : 'users'}
            </span>
            <span className="stat">
              💬 {messages.length} messages
            </span>
          </div>
          
          <div className="header-controls">
            <button 
              className={`control-btn ${showUsers ? 'active' : ''}`}
              onClick={() => setShowUsers(!showUsers)}
              title="Toggle User List"
            >
              👥
            </button>
            <button 
              className={`control-btn ${showChat ? 'active' : ''}`}
              onClick={() => setShowChat(!showChat)}
              title="Toggle Chat"
            >
              💬
            </button>
          </div>
        </div>
      </header>

      <main className="classroom-main">
        <div className="classroom-container">
          <VirtualClassroom
            users={users}
            currentUser={currentUser}
            room={room}
            onMove={handleMove}
            onAvatarUpdate={handleAvatarUpdate}
          />
          
          {showUsers && (
            <UserPanel
              users={users}
              currentUser={currentUser}
              onClose={() => setShowUsers(false)}
            />
          )}
          
          {showChat && (
            <ChatPanel
              messages={messages}
              onSendMessage={handleSendMessage}
              onClose={() => setShowChat(false)}
            />
          )}
        </div>
      </main>

      {error && (
        <div className="error-notification">
          <div className="error-content">
            <span>⚠️ {error}</span>
            <button onClick={() => setError(null)}>×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassroomPage;