import { Action } from '@ngrx/store';

export enum UserActionTypes {
  FETCH_USERS = '[USER] FETCH USERS',
  FETCH_USERS_SUCCESS = '[USER] FETCH USERS SUCCESS',
  FETCH_USERS_FAILURE = '[USER] FETCH USERS FAILURE'
}

export class FetchUsers implements Action {
  readonly type = UserActionTypes.FETCH_USERS;

  constructor() {}
}

export class FetchUsersSuccess implements Action {
  readonly type = UserActionTypes.FETCH_USERS_SUCCESS;

  constructor(public payload: any) {}
}

export class FetchUsersFailure implements Action {
  readonly type = UserActionTypes.FETCH_USERS_FAILURE;

  constructor(public payload: any) {}
}

export type UserActionAll =
  | FetchUsers
  | FetchUsersSuccess
  | FetchUsersFailure;
