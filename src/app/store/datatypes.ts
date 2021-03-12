export interface User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
}

export interface UserState {
  users: Array<User>;
  inProgress: boolean;
  error: string;
}

export interface Message {
  user: User;
  content: string;
}

export interface Chat {
  id: number;
  user: User;
  isOpened: boolean;
  isMinimized: boolean;
  messages: Array<Message>;
}

export interface ChatState {
  chats: Array<Chat>;
  maxChatNumber: number;
}

export interface AppState {
  user: UserState;
  chat: ChatState;
}
