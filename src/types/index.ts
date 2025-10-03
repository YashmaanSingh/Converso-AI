// Core type definitions for Converso AI

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  publicKey: string;
  isOnline: boolean;
  lastSeen: Date;
  deviceId: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  type: MessageType;
  timestamp: Date;
  encrypted: boolean;
  delivered: boolean;
  read: boolean;
  replyTo?: string;
  attachments?: Attachment[];
  metadata?: Record<string, any>;
}

export enum MessageType {
  TEXT = 'text',
  VOICE = 'voice',
  IMAGE = 'image',
  VIDEO = 'video',
  FILE = 'file',
  LOCATION = 'location',
  CONTACT = 'contact',
  SYSTEM = 'system'
}

export interface Attachment {
  id: string;
  type: MessageType;
  filename: string;
  size: number;
  mimeType: string;
  url?: string;
  localPath?: string;
  thumbnail?: string;
}

export interface Chat {
  id: string;
  name: string;
  type: ChatType;
  participants: string[];
  admins: string[];
  avatar?: string;
  lastMessage?: Message;
  lastActivity: Date;
  isEncrypted: boolean;
  isOfflineCapable: boolean;
}

export enum ChatType {
  PRIVATE = 'private',
  GROUP = 'group',
  CHANNEL = 'channel'
}

export interface Contact {
  id: string;
  userId?: string;
  name: string;
  phoneNumber?: string;
  email?: string;
  avatar?: string;
  isRegistered: boolean;
  lastSeen?: Date;
  isBlocked: boolean;
}

export interface StatusUpdate {
  id: string;
  userId: string;
  content: string;
  type: StatusType;
  timestamp: Date;
  expiresAt: Date;
  views: number;
  reactions: StatusReaction[];
  isEncrypted: boolean;
}

export enum StatusType {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video'
}

export interface StatusReaction {
  userId: string;
  emoji: string;
  timestamp: Date;
}

export interface CallSession {
  id: string;
  chatId: string;
  participants: string[];
  type: CallType;
  status: CallStatus;
  startTime: Date;
  endTime?: Date;
  isOffline: boolean;
  connectionType: ConnectionType;
}

export enum CallType {
  VOICE = 'voice',
  VIDEO = 'video'
}

export enum CallStatus {
  INITIATING = 'initiating',
  RINGING = 'ringing',
  CONNECTED = 'connected',
  ENDED = 'ended',
  FAILED = 'failed'
}

export enum ConnectionType {
  INTERNET = 'internet',
  BLUETOOTH = 'bluetooth',
  WIFI_DIRECT = 'wifi_direct',
  MESH = 'mesh'
}

export interface NetworkNode {
  id: string;
  deviceId: string;
  userId: string;
  connectionType: ConnectionType;
  signalStrength: number;
  lastSeen: Date;
  isReachable: boolean;
  publicKey: string;
}

export interface EncryptionKey {
  id: string;
  userId: string;
  publicKey: string;
  privateKey: string;
  algorithm: string;
  createdAt: Date;
  isActive: boolean;
}

export interface OfflineMessage {
  id: string;
  messageId: string;
  recipientId: string;
  content: string;
  encrypted: boolean;
  timestamp: Date;
  attempts: number;
  maxAttempts: number;
  status: OfflineMessageStatus;
}

export enum OfflineMessageStatus {
  PENDING = 'pending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  FAILED = 'failed'
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  autoDownloadMedia: boolean;
  dataSaver: boolean;
  offlineMode: boolean;
  bluetoothEnabled: boolean;
  wifiDirectEnabled: boolean;
  encryptionLevel: 'standard' | 'high' | 'maximum';
}

export interface NetworkStatus {
  isOnline: boolean;
  connectionType: ConnectionType;
  availableNodes: NetworkNode[];
  meshNetworkActive: boolean;
  bluetoothEnabled: boolean;
  wifiDirectEnabled: boolean;
}
