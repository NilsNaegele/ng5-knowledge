import { Action, ActionCreator } from 'redux';

import { ChatThread } from './models/chat-thread';
import { ChatMessage } from './models/chat-message';
import { uuid } from './util/uuid';

export const ADD_THREAD = '[Thread] Add';
export const ADD_MESSAGE = '[Thread] Message';
export const SELECT_THREAD = '[Thread] Select';

export interface AddThreadAction extends Action {
  thread: ChatThread;
}

export interface AddMessageAction extends Action {
  thread: ChatThread;
  message: ChatMessage;
}

export interface SelectThreadAction extends Action {
  thread: ChatThread;
}

export const AddThread: ActionCreator<AddThreadAction> =
        (thread) => ({
          type: ADD_THREAD,
          thread: thread
        });

export const AddMessage: ActionCreator<AddMessageAction> =
      (thread: ChatThread, messageArgs: ChatMessage): AddMessageAction => {
        const defaults = {
          id: uuid(),
          sentAt: new Date(),
          isRead: false,
          thread: thread
        };
        const message: ChatMessage = Object.assign({}, defaults, messageArgs);
        return {
          type: ADD_MESSAGE,
          thread: thread,
          message: message
        };
      };

export const selectThread: ActionCreator<SelectThreadAction> =
      (thread) => ({
        type: SELECT_THREAD,
        thread: thread
      });
