import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { 
  Room, 
  User, 
  ChatMessage, 
  ServerToClientEvents, 
  ClientToServerEvents,
  MapConfig 
} from './types';

const app = express();
const server = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// In-memory storage (in production, use a database)
const rooms = new Map<string, Room>();
const users = new Map<string, User>();

// Default classroom configuration
const defaultMapConfig: MapConfig = {
  width: 800,
  height: 600,
  obstacles: [
    // Teacher's desk
    { x: 350, y: 50, width: 100, height: 60, type: 'desk' },
    // Whiteboard
    { x: 300, y: 10, width: 200, height: 30, type: 'board' },
    // Student desks
    { x: 150, y: 200, width: 80, height: 60, type: 'desk' },
    { x: 300, y: 200, width: 80, height: 60, type: 'desk' },
    { x: 450, y: 200, width: 80, height: 60, type: 'desk' },
    { x: 150, y: 320, width: 80, height: 60, type: 'desk' },
    { x: 300, y: 320, width: 80, height: 60, type: 'desk' },
    { x: 450, y: 320, width: 80, height: 60, type: 'desk' },
    // Walls
    { x: 0, y: 0, width: 800, height: 10, type: 'wall' },
    { x: 0, y: 0, width: 10, height: 600, type: 'wall' },
    { x: 790, y: 0, width: 10, height: 600, type: 'wall' },
    { x: 0, y: 590, width: 800, height: 10, type: 'wall' },
    // Door
    { x: 700, y: 590, width: 60, height: 10, type: 'door' }
  ]
};

// Initialize default classroom
const defaultRoom: Room = {
  id: 'main-classroom',
  name: 'Fast Track Academy - Main Classroom',
  users: [],
  messages: [],
  mapConfig: defaultMapConfig
};

rooms.set('main-classroom', defaultRoom);

function generateUserId(): string {
  return Math.random().toString(36).substr(2, 9);
}

function generateMessageId(): string {
  return Math.random().toString(36).substr(2, 9);
}

function isValidPosition(x: number, y: number, roomId: string): boolean {
  const room = rooms.get(roomId);
  if (!room) return false;

  const { mapConfig } = room;
  
  // Check bounds
  if (x < 20 || y < 20 || x > mapConfig.width - 20 || y > mapConfig.height - 20) {
    return false;
  }

  // Check obstacles (simple collision detection)
  for (const obstacle of mapConfig.obstacles || []) {
    if (x >= obstacle.x - 15 && x <= obstacle.x + obstacle.width + 15 &&
        y >= obstacle.y - 15 && y <= obstacle.y + obstacle.height + 15) {
      return false;
    }
  }

  return true;
}

function getRandomStartPosition(roomId: string): { x: number; y: number } {
  const room = rooms.get(roomId);
  if (!room) return { x: 400, y: 500 };

  let attempts = 0;
  while (attempts < 10) {
    const x = Math.random() * (room.mapConfig.width - 40) + 20;
    const y = Math.random() * (room.mapConfig.height - 40) + 20;
    
    if (isValidPosition(x, y, roomId)) {
      return { x, y };
    }
    attempts++;
  }
  
  // Fallback position
  return { x: 400, y: 500 };
}

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinRoom', (roomId, userData) => {
    try {
      const room = rooms.get(roomId);
      if (!room) {
        socket.emit('error', 'Room not found');
        return;
      }

      // Generate user ID and set initial position
      const userId = generateUserId();
      const startPosition = getRandomStartPosition(roomId);
      
      const user: User = {
        id: userId,
        name: userData.name,
        avatar: userData.avatar,
        position: startPosition,
        room: roomId
      };

      // Store user data
      users.set(socket.id, user);
      room.users.push(user);

      // Join socket room
      socket.join(roomId);

      // Notify user about successful join
      socket.emit('roomJoined', room);

      // Notify others about new user
      socket.to(roomId).emit('userJoined', user);
      
      // Send updated user list to everyone in room
      io.to(roomId).emit('userListUpdate', room.users);

      console.log(`User ${user.name} joined room ${roomId}`);
    } catch (error) {
      console.error('Error joining room:', error);
      socket.emit('error', 'Failed to join room');
    }
  });

  socket.on('move', (position) => {
    try {
      const user = users.get(socket.id);
      if (!user) return;

      // Validate position
      if (!isValidPosition(position.x, position.y, user.room)) {
        return;
      }

      // Update user position
      user.position = position;
      
      // Update in room
      const room = rooms.get(user.room);
      if (room) {
        const userIndex = room.users.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
          room.users[userIndex] = user;
        }
      }

      // Broadcast movement to others in room
      socket.to(user.room).emit('userMoved', user.id, position);
    } catch (error) {
      console.error('Error handling move:', error);
    }
  });

  socket.on('sendMessage', (message) => {
    try {
      const user = users.get(socket.id);
      if (!user) return;

      const room = rooms.get(user.room);
      if (!room) return;

      const chatMessage: ChatMessage = {
        id: generateMessageId(),
        userId: user.id,
        userName: user.name,
        message: message.trim(),
        timestamp: Date.now(),
        room: user.room
      };

      // Store message in room
      room.messages.push(chatMessage);

      // Keep only last 100 messages
      if (room.messages.length > 100) {
        room.messages = room.messages.slice(-100);
      }

      // Broadcast message to everyone in room
      io.to(user.room).emit('chatMessage', chatMessage);

      console.log(`Message from ${user.name}: ${message}`);
    } catch (error) {
      console.error('Error handling message:', error);
    }
  });

  socket.on('updateAvatar', (avatar) => {
    try {
      const user = users.get(socket.id);
      if (!user) return;

      user.avatar = avatar;

      // Update in room
      const room = rooms.get(user.room);
      if (room) {
        const userIndex = room.users.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
          room.users[userIndex] = user;
        }
        
        // Send updated user list
        io.to(user.room).emit('userListUpdate', room.users);
      }

      console.log(`User ${user.name} updated avatar`);
    } catch (error) {
      console.error('Error updating avatar:', error);
    }
  });

  socket.on('disconnect', () => {
    try {
      const user = users.get(socket.id);
      if (user) {
        const room = rooms.get(user.room);
        if (room) {
          // Remove user from room
          room.users = room.users.filter(u => u.id !== user.id);
          
          // Notify others
          socket.to(user.room).emit('userLeft', user.id);
          io.to(user.room).emit('userListUpdate', room.users);
        }

        // Remove user from memory
        users.delete(socket.id);
        
        console.log(`User ${user.name} disconnected`);
      }
    } catch (error) {
      console.error('Error handling disconnect:', error);
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    rooms: rooms.size,
    users: users.size,
    timestamp: new Date().toISOString()
  });
});

// Get room info endpoint
app.get('/api/rooms/:roomId', (req, res) => {
  const room = rooms.get(req.params.roomId);
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }
  
  // Return room info without sensitive data
  res.json({
    id: room.id,
    name: room.name,
    userCount: room.users.length,
    mapConfig: room.mapConfig
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 Fast Track Academy Virtual Classroom Server running on port ${PORT}`);
  console.log(`🏫 Main classroom initialized: ${defaultRoom.name}`);
});