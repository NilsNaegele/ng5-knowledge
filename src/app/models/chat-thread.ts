import { ChatMessage } from './chat-message';

export interface ChatThread {
  id: string;
  name: string;
  avatarSrc: string;
  messages: ChatMessage[];
}
