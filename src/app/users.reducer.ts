import { Action } from 'redux';

import { ChatUser } from './models/chat-user';
import * as UserActions from './user.actions';

import { createSelector } from 'reselect';

export interface UsersState {
  currentUser: ChatUser;
}

const initialState: UsersState = {
  currentUser: null
};

export const UsersReducer =
    (state: UsersState = initialState, action: Action) => {
      switch (action.type) {
        case UserActions.SET_CURRENT_USER:
        const user: ChatUser = (<UserActions.SetCurrentUserAction>action).user;
        return {
          currentUser: user
        };
        default:
          return state;
      }
    };

export const getUsersState = (state): UsersState => state.users;

export const getCurrentUser = createSelector(getUsersState,
            (state: UsersState) => state.currentUser );
