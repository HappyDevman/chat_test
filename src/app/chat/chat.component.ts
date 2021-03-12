import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Store } from '@ngrx/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { AddMessage, UpdateChat } from '../store/actions';
import { AppState, ChatState, Chat, Message, User } from '../store/datatypes';

@UntilDestroy()
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {

  @Input() user: User;
  @ViewChild('chatWindow') chatWindow: ElementRef;

  chatPlaceholder = 'Write a message';
  message = '';
  chat: Chat;
  messages: Array<Message> = [];

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store
      .select((state: AppState) => state.chat)
      .pipe(untilDestroyed(this))
      .subscribe((chatState: ChatState) => {
        this.chat = chatState.chats.find(chat => chat.user === this.user);
        if (!!this.chat) {
          this.messages = this.chat.messages;
        }
      });
  }

  ngAfterViewChecked() {
    const chatWindow = this.chatWindow.nativeElement;
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  onMessageInputTyped(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.store.dispatch(new AddMessage({ updatedChat: this.chat, message: { user: this.user, content: this.message } }));
      this.message = '';
    }
  }

  onClickScale() {
    this.store.dispatch(new UpdateChat({...this.chat, isMinimized: !this.chat.isMinimized}));
  }

  closeChat() {
    this.store.dispatch(new UpdateChat({...this.chat, isOpened: false}));
  }

  ngOnDestroy(): void {}
}
