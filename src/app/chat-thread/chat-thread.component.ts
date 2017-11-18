import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

import { ChatThread } from '../models/chat-thread';

@Component({
  selector: 'app-chat-thread',
  template: `
    <mat-card class="thread-card">
        <mat-card-header>
          <img mat-card-avatar [src]="thread.avatarSrc">
          <mat-card-title>{{ thread.name }} <span *ngIf="selected">&bull;</span></mat-card-title>
          <mat-card-subtitle>{{ thread.messages[thread.messages.length - 1].text }}</mat-card-subtitle>
        </mat-card-header>
        <button mat-raised-button color="warn" (click)="clicked($event)">Select</button>
    </mat-card>
  `,
  styles: [`
    .thread-card {
      width: 600px;
    }
    `],
  encapsulation: ViewEncapsulation.None
})
export class ChatThreadComponent {
  @Input() thread: ChatThread;
  @Input() selected: boolean;
  @Output() onThreadSelected: EventEmitter<ChatThread>;

  constructor() {
    this.onThreadSelected = new EventEmitter<ChatThread>();
  }

  clicked(event: any): void {
    this.onThreadSelected.emit(this.thread);
    event.preventDefault();
  }

}
