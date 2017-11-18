import { Reducer, combineReducers } from 'redux';

import { UsersState, UsersReducer } from './users.reducer';
import { ThreadsState, ThreadsReducer } from './threads.reducer';

export * from './users.reducer';
export * from './threads.reducer';

export interface AppState {
  users: UsersState;
  threads: ThreadsState;
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  users: UsersReducer,
  threads: ThreadsReducer
});

export default rootReducer;
