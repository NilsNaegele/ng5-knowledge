import { Component, ViewEncapsulation, Inject } from '@angular/core';

import { AppStore } from '../app.store';
import { AppState, getUnreadMessagesCount } from '../app.reducer';
import * as redux from 'redux';

@Component({
  selector: 'app-chat-nav-bar',
  template: `
  <mat-toolbar color="primary">
      <mat-toolbar-row>
          <span>Bot Chat</span>
          <span class="navbar-spacer"></span>
          <mat-icon class="navbar-icon">favorite</mat-icon>
          <span>Messages {{ unreadMessagesCount }} </span>
          <mat-icon class="navbar-icon">verified_user</mat-icon>
    </mat-toolbar-row>
  </mat-toolbar>
  `,
  styles: [`
    .navbar-icon {
      padding: 0 14px;
    }
    .navbar-spacer {
      flex: 1 1 auto;
    }
    `],
  encapsulation: ViewEncapsulation.None
})
export class ChatNavBarComponent {
  unreadMessagesCount: number;

  constructor(@Inject(AppStore) private store: redux.Store<AppState>) {
        store.subscribe(() => this.updateState());
        this.updateState();
  }

  updateState() {
    this.unreadMessagesCount = getUnreadMessagesCount(this.store.getState());
  }


}
