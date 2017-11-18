import { Component, OnInit, ViewEncapsulation, ElementRef, Inject } from '@angular/core';

import { ChatThread } from '../models/chat-thread';
import { ChatUser } from '../models/chat-user';

import { AppStore } from '../app.store';
import { AppState, getCurrentThread, getAllThreads, getCurrentUser } from '../app.reducer';
import * as ThreadActions from '../thread.actions';

import * as redux from 'redux';

@Component({
  selector: 'app-chat-window',
  template: `
  <mat-card class="message-card">
    <mat-card-header>
      <mat-card-title>
        <mat-icon>chat</mat-icon>
            Chat - {{ currentThread.name }}
      </mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <p class="msg-container-base">
        <app-chat-message *ngFor="let message of currentThread.messages"
                           [message]="message">
        </app-chat-message>
      </p>
</mat-card-content>
<mat-card-actions>
  <mat-form-field class="input-width">
          <input (keydown.enter)="onEnter($event)" [(ngModel)]="draftMessage.text"
                  matInput placeholder="Enter your message here ...">
  </mat-form-field>
<button (click)="onEnter($event)" mat-raised-button color="primary">SEND</button>
</mat-card-actions>
</mat-card>

  `,
  styles: [`
    .message-card {
      width: 600px;
      }
      .input-width {
        width: 78%;
      }
    `],
  encapsulation: ViewEncapsulation.None
})
export class ChatWindowComponent {
  currentThread: ChatThread;
  draftMessage: {text: string};
  currentUser: ChatUser;


  constructor(@Inject(AppStore) private store: redux.Store<AppState>,
    private el: ElementRef) {
      store.subscribe(() => this.updateState());
      this.updateState();
      this.draftMessage = { text: '' };
    }

    updateState(): void {
      const state = this.store.getState();
      this.currentThread = getCurrentThread(state);
      this.currentUser = getCurrentUser(state);
      // this.scrollToBottom();
    }

    onEnter(event: any): void {
      this.sendMessage();
      event.preventDefault();
    }

    sendMessage(): void {
      this.store.dispatch(ThreadActions.AddMessage(
        this.currentThread,
        {
          author: this.currentUser,
          isRead: true,
          text: this.draftMessage.text
        }
      ));
      this.draftMessage = { text: '' };
    }

  scrollToBottom(): void {
    const scrollPane: any = this.el.nativeElement.querySelector('.msg-container-base');
    if (scrollPane) {
     setTimeout(() => scrollPane.scrollTop = scrollPane.scrollHeight);
    }
  }

}
