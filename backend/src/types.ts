export interface User {
  id: string;
  name: string;
  avatar: Avatar;
  position: Position;
  room: string;
}

export interface Avatar {
  type: 'student' | 'teacher' | 'guest';
  color: string;
  accessories?: string[];
}

export interface Position {
  x: number;
  y: number;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: number;
  room: string;
}

export interface Room {
  id: string;
  name: string;
  users: User[];
  messages: ChatMessage[];
  mapConfig: MapConfig;
}

export interface MapConfig {
  width: number;
  height: number;
  backgroundImage?: string;
  obstacles?: Obstacle[];
}

export interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'desk' | 'wall' | 'board' | 'door';
}

export interface ServerToClientEvents {
  userJoined: (user: User) => void;
  userLeft: (userId: string) => void;
  userMoved: (userId: string, position: Position) => void;
  userListUpdate: (users: User[]) => void;
  chatMessage: (message: ChatMessage) => void;
  roomJoined: (room: Room) => void;
  error: (message: string) => void;
}

export interface ClientToServerEvents {
  joinRoom: (roomId: string, user: Omit<User, 'id'>) => void;
  leaveRoom: (roomId: string) => void;
  move: (position: Position) => void;
  sendMessage: (message: string) => void;
  updateAvatar: (avatar: Avatar) => void;
}