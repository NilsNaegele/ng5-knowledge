import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

import { ChatMessage } from '../models/chat-message';

@Component({
  selector: 'app-chat-message',
  template: `
        <mat-card [ngClass]="{'base-sent': !incoming, 'base-receive': incoming}">
        <mat-card-header>
          <img *ngIf="!incoming" mat-card-avatar [src]="message.author.avatarSrc">
          <mat-card-title [ngClass]="{'msg-sent': !incoming, 'msg-receive': incoming}">
          {{ message.text }}
          </mat-card-title>
          <mat-card-subtitle>{{ message.author.name }} • {{ message.sentAt | appFromNow }}</mat-card-subtitle>
          <img *ngIf="incoming" mat-card-avatar [src]="message.author.avatarSrc">
        </mat-card-header>
        </mat-card>

  `,
  styles: [`

    `],
  encapsulation: ViewEncapsulation.None
})
export class ChatMessageComponent implements OnInit {
  @Input() message: ChatMessage;
  incoming: boolean;


  ngOnInit() {
    this.incoming = !this.message.author.isClient;

  }

}
