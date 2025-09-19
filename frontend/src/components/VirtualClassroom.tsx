import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { User, Room, Position, Avatar } from '../types';
import './VirtualClassroom.css';

interface VirtualClassroomProps {
  users: User[];
  currentUser: User | null;
  room: Room | null;
  onMove: (position: Position) => void;
  onAvatarUpdate: (avatar: Avatar) => void;
}

const VirtualClassroom: React.FC<VirtualClassroomProps> = ({
  users,
  currentUser,
  room,
  onMove,
  onAvatarUpdate
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());
  const [showAvatarCustomizer, setShowAvatarCustomizer] = useState(false);
  const animationFrameRef = useRef<number | undefined>(undefined);

  const avatarColors = [
    '#3182ce', '#38a169', '#d69e2e', '#e53e3e', 
    '#9f7aea', '#dd6b20', '#0bc5ea', '#38b2ac'
  ];

  const drawClassroom = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (!room) return;

    const { mapConfig } = room;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.fillStyle = '#f7fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid lines for visual appeal
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= canvas.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    
    // Draw obstacles
    mapConfig.obstacles?.forEach(obstacle => {
      ctx.fillStyle = getObstacleColor(obstacle.type);
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      
      // Add obstacle labels
      ctx.fillStyle = 'white';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      const centerX = obstacle.x + obstacle.width / 2;
      const centerY = obstacle.y + obstacle.height / 2;
      
      let label = '';
      switch (obstacle.type) {
        case 'desk': label = '📚'; break;
        case 'board': label = '📋'; break;
        case 'wall': label = '🧱'; break;
        case 'door': label = '🚪'; break;
      }
      
      if (label && obstacle.width > 20 && obstacle.height > 20) {
        ctx.font = '16px Arial';
        ctx.fillText(label, centerX, centerY + 5);
      }
    });
  }, [room]);

  const getObstacleColor = (type: string): string => {
    switch (type) {
      case 'desk': return '#8b4513';
      case 'board': return '#2d3748';
      case 'wall': return '#718096';
      case 'door': return '#38a169';
      default: return '#a0aec0';
    }
  };

  const drawUsers = useCallback((ctx: CanvasRenderingContext2D) => {
    users.forEach(user => {
      const { position, avatar, name, id } = user;
      const isCurrentUser = currentUser?.id === id;
      
      // Draw avatar shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.beginPath();
      ctx.ellipse(position.x, position.y + 25, 12, 6, 0, 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw avatar body
      ctx.fillStyle = avatar.color;
      ctx.strokeStyle = isCurrentUser ? '#ffd700' : 'white';
      ctx.lineWidth = isCurrentUser ? 3 : 2;
      
      ctx.beginPath();
      ctx.arc(position.x, position.y, 15, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      
      // Draw avatar type indicator
      let typeEmoji = '';
      switch (avatar.type) {
        case 'teacher': typeEmoji = '👨‍🏫'; break;
        case 'student': typeEmoji = '👨‍🎓'; break;
        case 'guest': typeEmoji = '👤'; break;
      }
      
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(typeEmoji, position.x, position.y + 3);
      
      // Draw username
      ctx.fillStyle = isCurrentUser ? '#ffd700' : '#2d3748';
      ctx.font = 'bold 11px Arial';
      ctx.fillText(name, position.x, position.y - 25);
      
      // Draw current user indicator
      if (isCurrentUser) {
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(position.x, position.y, 25, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });
  }, [users, currentUser]);

  const isValidPosition = useCallback((x: number, y: number): boolean => {
    if (!room) return false;

    const { mapConfig } = room;
    
    // Check bounds
    if (x < 20 || y < 20 || x > mapConfig.width - 20 || y > mapConfig.height - 20) {
      return false;
    }

    // Check obstacles
    for (const obstacle of mapConfig.obstacles || []) {
      if (x >= obstacle.x - 15 && x <= obstacle.x + obstacle.width + 15 &&
          y >= obstacle.y - 15 && y <= obstacle.y + obstacle.height + 15) {
        return false;
      }
    }

    return true;
  }, [room]);

  const handleMovement = useCallback(() => {
    if (!currentUser || keysPressed.size === 0) return;

    const moveSpeed = 3;
    let newX = currentUser.position.x;
    let newY = currentUser.position.y;

    if (keysPressed.has('ArrowUp') || keysPressed.has('KeyW')) {
      newY -= moveSpeed;
    }
    if (keysPressed.has('ArrowDown') || keysPressed.has('KeyS')) {
      newY += moveSpeed;
    }
    if (keysPressed.has('ArrowLeft') || keysPressed.has('KeyA')) {
      newX -= moveSpeed;
    }
    if (keysPressed.has('ArrowRight') || keysPressed.has('KeyD')) {
      newX += moveSpeed;
    }

    if (isValidPosition(newX, newY)) {
      onMove({ x: newX, y: newY });
    }
  }, [currentUser, keysPressed, isValidPosition, onMove]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const validKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD'];
    if (validKeys.includes(e.code)) {
      e.preventDefault();
      setKeysPressed(prev => new Set(prev).add(e.code));
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const validKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD'];
    if (validKeys.includes(e.code)) {
      e.preventDefault();
      setKeysPressed(prev => {
        const newSet = new Set(prev);
        newSet.delete(e.code);
        return newSet;
      });
    }
  }, []);

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!currentUser || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    if (isValidPosition(x, y)) {
      onMove({ x, y });
    }
  }, [currentUser, isValidPosition, onMove]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawClassroom(ctx, canvas);
    drawUsers(ctx);
    handleMovement();

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [drawClassroom, drawUsers, handleMovement]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    
    if (!canvas || !container || !room) return;

    // Set canvas size
    canvas.width = room.mapConfig.width;
    canvas.height = room.mapConfig.height;

    // Start animation loop
    animate();

    // Add event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [room, animate, handleKeyDown, handleKeyUp]);

  const handleAvatarColorChange = (color: string) => {
    if (currentUser) {
      const newAvatar = { ...currentUser.avatar, color };
      onAvatarUpdate(newAvatar);
    }
  };

  const handleAvatarTypeChange = (type: 'student' | 'teacher' | 'guest') => {
    if (currentUser) {
      const newAvatar = { ...currentUser.avatar, type };
      onAvatarUpdate(newAvatar);
    }
  };

  if (!room) {
    return (
      <div className="virtual-classroom loading">
        <div className="loading-message">Loading classroom...</div>
      </div>
    );
  }

  return (
    <div className="virtual-classroom" ref={containerRef}>
      <div className="classroom-canvas-container">
        <canvas
          ref={canvasRef}
          className="classroom-canvas"
          onClick={handleCanvasClick}
        />
        
        <div className="classroom-controls">
          <div className="movement-hint">
            <span>Use WASD or Arrow Keys to move</span>
            <span>Click to move to a location</span>
          </div>
          
          <button
            className="customize-btn"
            onClick={() => setShowAvatarCustomizer(!showAvatarCustomizer)}
          >
            🎨 Customize Avatar
          </button>
        </div>

        {showAvatarCustomizer && currentUser && (
          <div className="avatar-customizer">
            <div className="customizer-header">
              <h3>Customize Your Avatar</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAvatarCustomizer(false)}
              >
                ×
              </button>
            </div>
            
            <div className="customizer-content">
              <div className="customizer-section">
                <label>Avatar Type:</label>
                <div className="type-selector">
                  {['student', 'teacher', 'guest'].map(type => (
                    <button
                      key={type}
                      className={`type-btn ${currentUser.avatar.type === type ? 'active' : ''}`}
                      onClick={() => handleAvatarTypeChange(type as any)}
                    >
                      {type === 'student' && '👨‍🎓 Student'}
                      {type === 'teacher' && '👨‍🏫 Teacher'}
                      {type === 'guest' && '👤 Guest'}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="customizer-section">
                <label>Avatar Color:</label>
                <div className="color-selector">
                  {avatarColors.map(color => (
                    <button
                      key={color}
                      className={`color-btn ${currentUser.avatar.color === color ? 'active' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleAvatarColorChange(color)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualClassroom;