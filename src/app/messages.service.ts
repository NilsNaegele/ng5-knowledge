import { Injectable } from '@angular/core';

import { ChatMessage } from './models/chat-message';
import { ChatThread } from './models/chat-thread';
import { ChatUser } from './models/chat-user';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/publishReplay';

const initialMessages: ChatMessage[] = [];

// interface IMessagesOperation extends Function {
  // (messages: ChatMessage[]): ChatMessage[];
// }

type IMessagesOperation = (messages: ChatMessage[]) => ChatMessage[];

@Injectable()
export class MessagesService {
  newMessages: Subject<ChatMessage> = new Subject<ChatMessage>();
  messages: Observable<ChatMessage[]>;
  updates: Subject<any> = new Subject<any>();
  create: Subject<ChatMessage> = new Subject<ChatMessage>();
  markThreadAsRead: Subject<any> = new Subject<any>();

  addMessage(message: ChatMessage): void {
    this.newMessages.next(message);
  }

  messagesForThreadUser(thread: ChatThread, user: ChatUser): Observable<ChatMessage> {
    return this.newMessages.filter((message: ChatMessage) => {
          return (message.thread.id === thread.id) && (message.author.id !== user.id);
    });
  }

  constructor() {
        this.messages =
        this.updates.scan((messages: ChatMessage[],
                           operation: IMessagesOperation) => {
                              return operation(messages);
                           }, initialMessages)
                           .publishReplay(1)
                           .refCount();
       this.create.map(function (message: ChatMessage): IMessagesOperation {
         return (messages: ChatMessage[]) => {
           return messages.concat(message);
         };
       })
       .subscribe(this.updates);
       this.newMessages.subscribe(this.create);

       this.markThreadAsRead.map((thread: ChatThread) => {
         return (messages: ChatMessage[]) => {
            return messages.map((message: ChatMessage) => {
              if (message.thread.id === thread.id) {
                message.isRead = true;
              }
            });
         };
       })
       .subscribe(this.updates);
      }

}

export const messagesServiceInjectables = [ MessagesService ];
