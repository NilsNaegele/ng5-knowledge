import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';

import { AppStore } from '../app.store';
import { AppState, getCurrentThread, getAllThreads } from '../app.reducer';
import { ChatThread } from '../models/chat-thread';
import * as ThreadActions from '../thread.actions';

import * as redux from 'redux';

@Component({
  selector: 'app-chat-threads',
  template: `
              <app-chat-thread
                              *ngFor="let thread of threads"
                              [thread]="thread"
                              [selected]="thread.id === currentThreadId"
                              (onThreadSelected)="handleThreadClicked($event)">
              </app-chat-thread>
  `,
  styles: [`

    `],
  encapsulation: ViewEncapsulation.None
})
export class ChatThreadsComponent  {
  threads: ChatThread[];
  currentThreadId: string;

  constructor(@Inject(AppStore) private store: redux.Store<AppState>) {
        store.subscribe(() => this.updateState());
        this.updateState();
   }

   updateState() {
     const state = this.store.getState();
     this.threads = getAllThreads(state);
     this.currentThreadId = getCurrentThread(state).id;
   }

   handleThreadClicked(thread: ChatThread) {
     this.store.dispatch(ThreadActions.selectThread(thread));
   }



}
