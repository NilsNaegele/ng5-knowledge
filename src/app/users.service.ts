import { Injectable } from '@angular/core';

import { ChatUser } from './models/chat-user';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UsersService {

  currentUser: Subject<ChatUser> = new BehaviorSubject<ChatUser>(null);

  public setCurrentUser(newUser: ChatUser): void {
    this.currentUser.next(newUser);
  }

}

export const usersServiceInjectables = [
    UsersService
];
