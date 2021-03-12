import { ChatActionAll, ChatActionTypes } from '../actions';
import { ChatState, Chat } from '../datatypes';

export const initialState: ChatState = {
  chats: [],
  maxChatNumber: 3
};

const optimizedChats = (stateChats: Array<Chat>, maxChatNumber: number): Array<Chat> => {
  const openedChats = stateChats.filter(chat => chat.isOpened);
  let chats = [];
  if (openedChats.length >= maxChatNumber) {
    chats = stateChats.map(chat => chat.id === openedChats[0].id ? { ...chat, isOpened: false } : chat);
  } else {
    chats = stateChats;
  }
  return chats;
};

export function reducer(state: ChatState = initialState, action: ChatActionAll): ChatState {
  switch (action.type) {
    case ChatActionTypes.CREATE_CHAT: {
      const chats = optimizedChats(state.chats, state.maxChatNumber);
      return {
        ...state,
        chats: [...chats, action.payload]
      };
    }

    case ChatActionTypes.UPDATE_CHAT: {
      const updatedChat = action.payload;
      const prevChat = state.chats.find(chat => chat.id === updatedChat.id);
      let chats = [];
      // When user opens once opened chat, if that is opened don't optimize, else optimize chats count and add chat box to the last
      if (action.payload.openPrevChat && !prevChat.isOpened) {
        const chatsScope = optimizedChats(state.chats, state.maxChatNumber);
        chats = [...chatsScope.filter(chat => chat.id !== prevChat.id), updatedChat];
      } else {
        const chatsScope = state.chats;
        chats = chatsScope.map(chat => chat.id === updatedChat.id ? updatedChat : chat);
      }
      return {
        ...state,
        chats
      };
    }

    case ChatActionTypes.ADD_MESSAGE: {
      const { updatedChat, message } = action.payload;
      const chats = state.chats.map(chat => {
        if (chat.id === updatedChat.id) {
          chat.messages.push(message);
        }
        return chat;
      });
      return {
        ...state,
        chats
      };
    }

    default: {
      return state;
    }
  }
}
