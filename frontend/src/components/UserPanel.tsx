import React from 'react';
import type { User } from '../types';
import './UserPanel.css';

interface UserPanelProps {
  users: User[];
  currentUser: User | null;
  onClose: () => void;
}

const UserPanel: React.FC<UserPanelProps> = ({
  users,
  currentUser,
  onClose
}) => {
  const getAvatarEmoji = (type: string) => {
    switch (type) {
      case 'teacher': return '👨‍🏫';
      case 'student': return '👨‍🎓';
      case 'guest': return '👤';
      default: return '👤';
    }
  };

  const getRoleLabel = (type: string) => {
    switch (type) {
      case 'teacher': return 'Teacher';
      case 'student': return 'Student';
      case 'guest': return 'Guest';
      default: return 'User';
    }
  };

  const groupedUsers = users.reduce((acc, user) => {
    const role = user.avatar.type;
    if (!acc[role]) {
      acc[role] = [];
    }
    acc[role].push(user);
    return acc;
  }, {} as Record<string, User[]>);

  const sortedRoles = ['teacher', 'student', 'guest'].filter(role => groupedUsers[role]);

  return (
    <div className="user-panel">
      <div className="user-header">
        <div className="user-title">
          <h3>👥 Online Users</h3>
          <span className="user-count">
            {users.length} {users.length === 1 ? 'user' : 'users'} online
          </span>
        </div>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="user-list">
        {users.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <p>No users online</p>
            <p className="empty-subtitle">You're alone in the classroom</p>
          </div>
        ) : (
          sortedRoles.map(role => (
            <div key={role} className="user-group">
              <div className="group-header">
                <span className="group-emoji">{getAvatarEmoji(role)}</span>
                <span className="group-title">{getRoleLabel(role)}s</span>
                <span className="group-count">({groupedUsers[role].length})</span>
              </div>
              
              <div className="group-users">
                {groupedUsers[role].map(user => (
                  <div 
                    key={user.id} 
                    className={`user-item ${currentUser?.id === user.id ? 'current-user' : ''}`}
                  >
                    <div className="user-avatar-container">
                      <div 
                        className="user-avatar"
                        style={{ backgroundColor: user.avatar.color }}
                      >
                        <span className="avatar-emoji">
                          {getAvatarEmoji(user.avatar.type)}
                        </span>
                      </div>
                      {currentUser?.id === user.id && (
                        <div className="current-indicator">You</div>
                      )}
                    </div>
                    
                    <div className="user-info">
                      <div className="user-name">
                        {user.name}
                        {currentUser?.id === user.id && (
                          <span className="you-badge">(You)</span>
                        )}
                      </div>
                      <div className="user-position">
                        📍 Position: ({Math.round(user.position.x)}, {Math.round(user.position.y)})
                      </div>
                    </div>
                    
                    <div className="user-status">
                      <div className="status-dot online"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="user-footer">
        <div className="footer-stats">
          <div className="stat-item">
            <span className="stat-emoji">👨‍🏫</span>
            <span>{groupedUsers.teacher?.length || 0} Teachers</span>
          </div>
          <div className="stat-item">
            <span className="stat-emoji">👨‍🎓</span>
            <span>{groupedUsers.student?.length || 0} Students</span>
          </div>
          <div className="stat-item">
            <span className="stat-emoji">👤</span>
            <span>{groupedUsers.guest?.length || 0} Guests</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;