import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ChatComponent } from './chat.component';
import { Chat, Message, User } from '../store/datatypes';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  const user: User = {
    id: 1,
    firstName: 'Cheng',
    lastName: 'Liu',
    userName: 'Cheng Liu'
  };

  const messages: Array<Message> = [
    {
      user,
      content: 'message'
    }
  ];

  const chat: Chat = {
    id: 1,
    user,
    isOpened: false,
    isMinimized: false,
    messages
  };

  const initialStore = {
    chat: {
      chats: [
        chat
      ],
      maxChatNumber: 3
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatComponent ],
      providers: [provideMockStore({
        initialState: { ...initialStore },
      })],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
