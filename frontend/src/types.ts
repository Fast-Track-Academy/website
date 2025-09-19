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