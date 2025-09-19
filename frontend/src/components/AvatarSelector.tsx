import React, { useState } from 'react';
import type { Avatar } from '../types';
import './AvatarSelector.css';

interface AvatarSelectorProps {
  userName: string;
  selectedAvatar: Avatar;
  onUserNameChange: (name: string) => void;
  onAvatarChange: (avatar: Avatar) => void;
  onJoin: (name: string, avatar: Avatar) => void;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({
  userName,
  selectedAvatar,
  onUserNameChange,
  onAvatarChange,
  onJoin
}) => {
  const [errors, setErrors] = useState<string[]>([]);

  const avatarTypes: { type: Avatar['type']; label: string; emoji: string; description: string }[] = [
    { 
      type: 'student', 
      label: 'Student', 
      emoji: '👨‍🎓', 
      description: 'Join as a learner' 
    },
    { 
      type: 'teacher', 
      label: 'Teacher', 
      emoji: '👨‍🏫', 
      description: 'Lead the classroom' 
    },
    { 
      type: 'guest', 
      label: 'Guest', 
      emoji: '👤', 
      description: 'Observe and explore' 
    }
  ];

  const avatarColors = [
    { color: '#3182ce', name: 'Blue' },
    { color: '#38a169', name: 'Green' },
    { color: '#d69e2e', name: 'Yellow' },
    { color: '#e53e3e', name: 'Red' },
    { color: '#9f7aea', name: 'Purple' },
    { color: '#dd6b20', name: 'Orange' },
    { color: '#0bc5ea', name: 'Cyan' },
    { color: '#38b2ac', name: 'Teal' }
  ];

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (!userName.trim()) {
      newErrors.push('Please enter your name');
    } else if (userName.trim().length < 2) {
      newErrors.push('Name must be at least 2 characters long');
    } else if (userName.trim().length > 20) {
      newErrors.push('Name must be 20 characters or less');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onJoin(userName.trim(), selectedAvatar);
    }
  };

  const handleTypeChange = (type: Avatar['type']) => {
    onAvatarChange({ ...selectedAvatar, type });
  };

  const handleColorChange = (color: string) => {
    onAvatarChange({ ...selectedAvatar, color });
  };

  return (
    <div className="avatar-selector">
      <div className="selector-card">
        <div className="selector-header">
          <h2>🎮 Create Your Avatar</h2>
          <p>Customize your appearance and join the virtual classroom</p>
        </div>

        <form onSubmit={handleSubmit} className="selector-form">
          {/* Name Input */}
          <div className="form-section">
            <label htmlFor="userName" className="form-label">
              What's your name?
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => onUserNameChange(e.target.value)}
              placeholder="Enter your name..."
              className="form-input"
              maxLength={20}
            />
            <div className="char-count">
              {userName.length}/20 characters
            </div>
          </div>

          {/* Avatar Type Selection */}
          <div className="form-section">
            <label className="form-label">Choose your role:</label>
            <div className="avatar-types">
              {avatarTypes.map(({ type, label, emoji, description }) => (
                <div
                  key={type}
                  className={`avatar-type ${selectedAvatar.type === type ? 'selected' : ''}`}
                  onClick={() => handleTypeChange(type)}
                >
                  <div className="type-emoji">{emoji}</div>
                  <div className="type-info">
                    <div className="type-label">{label}</div>
                    <div className="type-description">{description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Avatar Color Selection */}
          <div className="form-section">
            <label className="form-label">Pick your color:</label>
            <div className="avatar-colors">
              {avatarColors.map(({ color, name }) => (
                <button
                  key={color}
                  type="button"
                  className={`color-option ${selectedAvatar.color === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                  title={name}
                  aria-label={`Select ${name} color`}
                />
              ))}
            </div>
          </div>

          {/* Avatar Preview */}
          <div className="form-section">
            <label className="form-label">Preview:</label>
            <div className="avatar-preview">
              <div className="preview-container">
                <div 
                  className="preview-avatar"
                  style={{ backgroundColor: selectedAvatar.color }}
                >
                  <span className="preview-emoji">
                    {avatarTypes.find(t => t.type === selectedAvatar.type)?.emoji}
                  </span>
                </div>
                <div className="preview-name">
                  {userName || 'Your Name'}
                </div>
              </div>
            </div>
          </div>

          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="form-errors">
              {errors.map((error, index) => (
                <div key={index} className="error-message">
                  ⚠️ {error}
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="join-button"
            disabled={!userName.trim()}
          >
            🚀 Enter Virtual Classroom
          </button>
        </form>

        <div className="selector-tips">
          <h3>💡 Quick Tips:</h3>
          <ul>
            <li>Use <kbd>WASD</kbd> or arrow keys to move around</li>
            <li>Click anywhere to move to that location</li>
            <li>Chat with others using the chat panel</li>
            <li>Customize your avatar anytime in the classroom</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AvatarSelector;