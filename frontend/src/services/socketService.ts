import { io, Socket } from 'socket.io-client';
import type { User, Position, ChatMessage, Room, Avatar } from '../types';

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

class SocketService {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;
  private isConnected = false;

  connect(serverUrl: string = 'http://localhost:3001'): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.socket?.connected) {
        resolve();
        return;
      }

      this.socket = io(serverUrl);

      this.socket.on('connect', () => {
        this.isConnected = true;
        console.log('Connected to server:', this.socket?.id);
        resolve();
      });

      this.socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
        this.isConnected = false;
        reject(error);
      });

      this.socket.on('disconnect', () => {
        this.isConnected = false;
        console.log('Disconnected from server');
      });
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  joinRoom(roomId: string, userData: Omit<User, 'id'>): void {
    if (!this.socket) throw new Error('Socket not connected');
    this.socket.emit('joinRoom', roomId, userData);
  }

  leaveRoom(roomId: string): void {
    if (!this.socket) throw new Error('Socket not connected');
    this.socket.emit('leaveRoom', roomId);
  }

  move(position: Position): void {
    if (!this.socket) throw new Error('Socket not connected');
    this.socket.emit('move', position);
  }

  sendMessage(message: string): void {
    if (!this.socket) throw new Error('Socket not connected');
    this.socket.emit('sendMessage', message);
  }

  updateAvatar(avatar: Avatar): void {
    if (!this.socket) throw new Error('Socket not connected');
    this.socket.emit('updateAvatar', avatar);
  }

  // Event listeners
  onUserJoined(callback: (user: User) => void): void {
    this.socket?.on('userJoined', callback);
  }

  onUserLeft(callback: (userId: string) => void): void {
    this.socket?.on('userLeft', callback);
  }

  onUserMoved(callback: (userId: string, position: Position) => void): void {
    this.socket?.on('userMoved', callback);
  }

  onUserListUpdate(callback: (users: User[]) => void): void {
    this.socket?.on('userListUpdate', callback);
  }

  onChatMessage(callback: (message: ChatMessage) => void): void {
    this.socket?.on('chatMessage', callback);
  }

  onRoomJoined(callback: (room: Room) => void): void {
    this.socket?.on('roomJoined', callback);
  }

  onError(callback: (message: string) => void): void {
    this.socket?.on('error', callback);
  }

  // Remove event listeners
  offUserJoined(): void {
    this.socket?.off('userJoined');
  }

  offUserLeft(): void {
    this.socket?.off('userLeft');
  }

  offUserMoved(): void {
    this.socket?.off('userMoved');
  }

  offUserListUpdate(): void {
    this.socket?.off('userListUpdate');
  }

  offChatMessage(): void {
    this.socket?.off('chatMessage');
  }

  offRoomJoined(): void {
    this.socket?.off('roomJoined');
  }

  offError(): void {
    this.socket?.off('error');
  }

  get connected(): boolean {
    return this.isConnected && !!this.socket?.connected;
  }
}

export const socketService = new SocketService();