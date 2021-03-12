import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { StoreModule, MetaReducer, ActionReducer, INIT } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { HttpClientModule } from '@angular/common/http';

import { reducers } from './reducers';
import { effects } from './effects';
import { Chat } from './datatypes';


export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [
      'chat',
      'user'
    ],
    rehydrate: true
  })(reducer);
}

export function resetReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action: any) => {
    const nextState = reducer(state, action);
    if (action.type === INIT) {
      nextState.chat.chats.forEach((chat: Chat) => {
        chat.isOpened = false;
      });
    }
    return nextState;
  };
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer, resetReducer];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(
      reducers,
      {metaReducers}
      ),
    HttpClientModule
  ]
})
export class AppStoreModule { }
