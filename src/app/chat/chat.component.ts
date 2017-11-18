import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';

import * as redux from 'redux';

import { AppStore } from '../app.store';
import { AppState } from '../app.reducer';

import { ChatSampleData } from '../data/chat-sample-data';

@Component({
  selector: 'app-chat',
  template: `
          <app-chat-nav-bar></app-chat-nav-bar>
          <div class="flex-container">
          <app-chat-threads></app-chat-threads>
          <app-chat-window></app-chat-window>
          </div>
  `,
  styles: [`
    .flex-container {
      display: flex;
      flex-wrap: wrap;
    }
    `],
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnInit {

  constructor(@Inject(AppStore) private store: redux.Store<AppState>) {
            ChatSampleData(store);
      }

  ngOnInit() {
  }

}
