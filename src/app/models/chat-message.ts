import { ChatUser } from './chat-user';
import { ChatThread } from './chat-thread';


export interface ChatMessage {
       id?: string;
       sentAt?: Date;
       isRead?: boolean;
       thread?: ChatThread;
       author: ChatUser;
       text: string;
}
