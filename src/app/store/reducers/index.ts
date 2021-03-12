import { ActionReducerMap } from '@ngrx/store';

import { AppState } from '../datatypes';
import * as chat from './chat.reducers';
import * as user from './user.reducers';

export const reducers: ActionReducerMap<AppState> = {
  user: user.reducer,
  chat: chat.reducer
};
