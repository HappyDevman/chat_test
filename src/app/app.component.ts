import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PrimeNGConfig } from 'primeng/api';

import { FetchUsers } from './store/actions';
import { CreateChat, UpdateChat } from './store/actions';
import { AppState, UserState, ChatState, Chat, User } from './store/datatypes';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './chat/chat.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  displaySidebar = false;
  users: Array<User> = [];
  chats: Array<Chat> = [];
  openedChats: Array<Chat> = [];
  chatWindowWidth = 300;
  errorMsg = '';
  inProgress = false;

  constructor(
    private store: Store<AppState>, private primengConfig: PrimeNGConfig
  ) {
    this.store.dispatch(new FetchUsers());
  }

  ngOnInit() {
    this.store
      .select((state: AppState) => state.user)
      .pipe(untilDestroyed(this))
      .subscribe((userState: UserState) => {
        this.users = userState.users;
        this.inProgress = userState.inProgress;
        this.errorMsg = userState.error;
      });
    this.store
      .select((state: AppState) => state.chat)
      .pipe(untilDestroyed(this))
      .subscribe((chatState: ChatState) => {
        this.chats = chatState.chats;
        this.openedChats = chatState.chats.filter(chat => chat.isOpened);
      });
    this.primengConfig.ripple = true;
  }

  onClickUser(user) {
    // If user already opened the chat box, maximize that, else create new chat box
    const selectedChat = this.chats.find(chat => chat.user.id === user.id);
    if (selectedChat) {
      this.store.dispatch(new UpdateChat({...selectedChat, isOpened: true, isMinimized: false, openPrevChat: true}));
    } else {
      this.store.dispatch(new CreateChat({user, id: Math.ceil(performance.now()), isOpened: true, isMinimized: false, messages: []}));
    }
  }

  ngOnDestroy(): void {}
}
