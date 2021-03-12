import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import {Chat, Message, User} from './store/datatypes';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const initialUsers = {
    users: [
      {id: 1, firstName: 'David', lastName: 'Jack', userName: 'David Jack'},
      {id: 2, firstName: 'John', lastName: 'Smith', userName: 'John Smith'},
      {id: 3, firstName: 'Felix', lastName: 'Joan', userName: 'Felix Joan'},
      {id: 4, firstName: 'Doe', lastName: 'Jo', userName: 'Doe Jo'},
      {id: 5, firstName: 'Ales', lastName: 'Dub', userName: 'Ales Dub'},
      {id: 6, firstName: 'Tiny', lastName: 'Sma', userName: 'Timy Sma'},
      {id: 7, firstName: 'Lina', lastName: 'Sven', userName: 'Lina Sven'}
    ]
  };

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

  const initialChats = {
    chats: [
      chat
    ],
    maxChatNumber: 3
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({
        initialState: {
          user: initialUsers,
          chat: initialChats
        },
      })],
      declarations: [ AppComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

