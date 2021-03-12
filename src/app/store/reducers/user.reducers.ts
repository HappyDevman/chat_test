import { UserActionAll, UserActionTypes } from '../actions';
import { UserState } from '../datatypes';

export const initialState: UserState = {
  users: [],
  inProgress: false,
  error: ''
};

export function reducer(state: UserState = initialState, action: UserActionAll): UserState {
  switch (action.type) {
    case UserActionTypes.FETCH_USERS: {
      return {
        ...state,
        inProgress: true,
        error: ''
      };
    }

    case UserActionTypes.FETCH_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload,
        inProgress: false,
        error: ''
      };
    }

    case UserActionTypes.FETCH_USERS_FAILURE: {
      return {
        ...state,
        inProgress: false,
        error: action.payload || 'Action failed'
      };
    }

    default: {
      return state;
    }
  }
}
