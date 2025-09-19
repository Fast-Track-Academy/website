# Fast Track Academy Virtual Classroom 🚀

A modern, interactive virtual classroom website inspired by video game environments. Users can select or customize avatars, move around a 2D classroom map, see other users in real-time, and communicate through an integrated chat system.

## 🌟 Features

- **Real-time Virtual Classroom**: Interactive 2D environment where users can move around
- **Avatar Customization**: Choose your role (Student/Teacher/Guest) and customize your avatar color
- **Live User Presence**: See all users currently online with their positions in real-time
- **Movement Controls**: Use WASD keys, arrow keys, or click to move around the classroom
- **Integrated Chat System**: Communicate with other users in the classroom
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Game-like interface with smooth animations and transitions
- **Fast Track Academy Branding**: Custom styling matching the academy's educational mission

## 🏗️ Architecture

### Frontend (`/frontend`)
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Socket.io Client** for real-time communication
- **React Router** for navigation
- **Canvas API** for 2D graphics and user interactions
- **CSS3** with modern animations and responsive design

### Backend (`/backend`)
- **Node.js** with TypeScript
- **Express.js** for HTTP server
- **Socket.io** for real-time WebSocket communication
- **CORS** enabled for development
- In-memory data storage (can be easily extended to use databases)

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd website
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the backend server**
   ```bash
   cd ../backend
   npm run dev
   ```
   The backend will run on `http://localhost:3001`

5. **Start the frontend development server**
   ```bash
   cd ../frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

6. **Open your browser** and navigate to `http://localhost:5173`

## 🎮 How to Use

### Getting Started
1. **Landing Page**: Visit the homepage to learn about Fast Track Academy
2. **Enter Classroom**: Click "Enter Virtual Classroom" to join the virtual environment
3. **Create Avatar**: Choose your name, role (Student/Teacher/Guest), and avatar color
4. **Join Classroom**: Click "Enter Virtual Classroom" to join the main classroom

### In the Classroom
- **Movement**: 
  - Use `WASD` keys or arrow keys to move around
  - Click anywhere on the classroom to move to that location
- **Chat**: Click the chat icon (💬) to open the chat panel and communicate with others
- **Users**: Click the users icon (👥) to see who's online
- **Avatar Customization**: Click "Customize Avatar" to change your avatar type or color

### Classroom Layout
- **Whiteboard**: Located at the front of the classroom
- **Teacher's Desk**: Near the whiteboard
- **Student Desks**: Arranged in rows for collaborative learning
- **Movement Areas**: Open spaces for users to move around
- **Collision Detection**: Users cannot walk through desks or walls

## 🛠️ Development

### Backend Development

#### Available Scripts
- `npm run dev` - Start development server with auto-reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server

#### Key Files
- `src/index.ts` - Main server file with Socket.io setup
- `src/types.ts` - TypeScript interfaces shared between client and server

#### API Endpoints
- `GET /health` - Server health check
- `GET /api/rooms/:roomId` - Get room information

#### WebSocket Events
- **Client to Server**:
  - `joinRoom` - Join a classroom
  - `move` - Update user position
  - `sendMessage` - Send chat message
  - `updateAvatar` - Update avatar settings
  - `leaveRoom` - Leave classroom

- **Server to Client**:
  - `userJoined` - New user joined
  - `userLeft` - User left classroom
  - `userMoved` - User position update
  - `userListUpdate` - Updated list of online users
  - `chatMessage` - New chat message
  - `roomJoined` - Successfully joined room
  - `error` - Error message

### Frontend Development

#### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

#### Project Structure
```
src/
├── components/          # Reusable React components
│   ├── AvatarSelector/  # Avatar creation interface
│   ├── VirtualClassroom/# Main 2D classroom component
│   ├── ChatPanel/       # Chat system
│   └── UserPanel/       # Online users list
├── pages/               # Page components
│   ├── LandingPage/     # Homepage
│   ├── AboutPage/       # About Fast Track Academy
│   └── ClassroomPage/   # Main classroom application
├── services/            # API and Socket.io services
│   └── socketService.ts # WebSocket communication
└── types.ts            # TypeScript interfaces
```

## 🎨 Customization Guide

### Adding New Avatar Types
1. Update the `Avatar` interface in `types.ts`
2. Add new avatar type to the selection UI
3. Update avatar rendering logic

### Customizing the Classroom Map
1. Edit the `defaultMapConfig` in `backend/src/index.ts`
2. Modify obstacle positions, sizes, and types
3. Add new obstacle types in the collision detection system

### Adding New Rooms
1. Create new room configurations in the backend
2. Add room selection UI in the frontend
3. Implement room-specific features

### Styling and Branding
- Modify CSS files in each component folder
- Update color schemes in the CSS custom properties
- Replace logo and branding elements

## 🌐 Deployment

### Development Deployment
The application is designed to run locally for development and testing.

### Production Deployment Options

#### Option 1: Traditional VPS/Cloud Server
1. **Backend Deployment**:
   ```bash
   cd backend
   npm run build
   npm start
   ```

2. **Frontend Deployment**:
   ```bash
   cd frontend
   npm run build
   # Serve the dist/ folder with a web server
   ```

#### Option 2: Platform-as-a-Service (PaaS)
- **Backend**: Deploy to Heroku, Railway, or similar
- **Frontend**: Deploy to Vercel, Netlify, or similar

#### Option 3: Containerization
- Create Docker containers for both frontend and backend
- Use Docker Compose for orchestration
- Deploy to any container platform

### Environment Configuration
Create `.env` files for different environments:

**Backend `.env`**
```
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://your-frontend-domain.com
```

**Frontend `.env`**
```
VITE_BACKEND_URL=https://your-backend-domain.com
```

## 🔮 Future Enhancements

### Planned Features
- **Private Rooms**: Create and join custom classroom rooms
- **Voice Chat**: Integrate WebRTC for voice communication
- **Screen Sharing**: Share screens for presentations
- **Interactive Quizzes**: Real-time polling and quiz systems
- **Whiteboard Drawing**: Collaborative whiteboard functionality
- **File Sharing**: Upload and share documents
- **User Profiles**: Persistent user accounts and profiles
- **Admin Dashboard**: Classroom management and analytics

### Technical Improvements
- **Database Integration**: Replace in-memory storage with PostgreSQL/MongoDB
- **Authentication**: Add user login and session management
- **Rate Limiting**: Implement API rate limiting for security
- **Logging**: Add comprehensive logging system
- **Testing**: Unit and integration tests
- **Mobile App**: React Native mobile application
- **Offline Support**: Service worker for offline functionality

## 🔧 Troubleshooting

### Common Issues

**Backend not starting**
- Ensure Node.js v16+ is installed
- Check if port 3001 is available
- Verify all dependencies are installed with `npm install`

**Frontend connection issues**
- Ensure backend is running on port 3001
- Check browser console for WebSocket connection errors
- Verify CORS settings in backend configuration

**Avatar not moving**
- Check browser console for JavaScript errors
- Ensure WebSocket connection is established
- Try refreshing the page and rejoining the classroom

**Chat not working**
- Verify Socket.io connection status
- Check network connectivity
- Ensure messages are not blocked by content filters

### Development Tips
- Use browser developer tools to inspect WebSocket traffic
- Monitor backend logs for error messages
- Test with multiple browser tabs to simulate multiple users
- Use `npm run build` before production deployment

## 📝 Contributing

We welcome contributions to improve the virtual classroom experience! Please read our contributing guidelines and submit pull requests for any enhancements.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For support and questions:
- Create an issue on GitHub
- Join our Discord community
- Check the troubleshooting section above

---

**Built with ❤️ for learners by Fast Track Academy**

*"The future belongs to those who learn, unlearn, and relearn faster than everyone else."*
