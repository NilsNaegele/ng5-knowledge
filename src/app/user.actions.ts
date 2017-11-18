import { Action, ActionCreator } from 'redux';

import { ChatUser } from './models/chat-user';

export const SET_CURRENT_USER = '[User] Set Current';

export interface SetCurrentUserAction extends Action {
  user: ChatUser;
}

export const setCurrentUser: ActionCreator<SetCurrentUserAction> =
        (user) => ({
          type: SET_CURRENT_USER,
          user: user
        });
