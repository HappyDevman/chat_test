import { Action } from '@ngrx/store';

export enum ChatActionTypes {
  CREATE_CHAT = '[CHAT] CREATE CHAT',
  UPDATE_CHAT = '[CHAT] UPDATE CHAT',
  ADD_MESSAGE = '[MESSAGE] ADD MESSAGE'
}

export class CreateChat implements Action {
  readonly type = ChatActionTypes.CREATE_CHAT;

  constructor(public payload: any) {}
}

export class UpdateChat implements Action {
  readonly type = ChatActionTypes.UPDATE_CHAT;

  constructor(public payload: any) {}
}

export class AddMessage implements Action {
  readonly type = ChatActionTypes.ADD_MESSAGE;

  constructor(public payload: any) {}
}

export type ChatActionAll =
  | CreateChat
  | UpdateChat
  | AddMessage;
