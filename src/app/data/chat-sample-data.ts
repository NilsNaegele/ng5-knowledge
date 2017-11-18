import { ChatUser } from '../models/chat-user';
import { ChatThread } from '../models/chat-thread';
import { ChatMessage } from '../models/chat-message';
import * as moment from 'moment';
import * as Redux from 'redux';
import { AppState, getAllMessages } from '../app.reducer';
import { uuid } from '../util/uuid';
import * as ThreadActions from '../thread.actions';
import * as UserActions from '../user.actions';

const me: ChatUser = {
  id: uuid(),
  isClient: true,
  name: 'Carmen',
  avatarSrc: 'assets/images/avatars/carmen.jpg'
};

const nils: ChatUser = {
  id: uuid(),
  name: 'Nils',
  avatarSrc: 'assets/images/avatars/nils.png'
};

const echo: ChatUser = {
  id: uuid(),
  name: 'Echo Bot',
  avatarSrc: 'assets/images/avatars/echo.png'
};

const rev: ChatUser = {
  id: uuid(),
  name: 'Reverse Bot',
  avatarSrc: 'assets/images/avatars/reverse.jpg'
};

const wait: ChatUser = {
  id: uuid(),
  name: 'Waiting Bot',
  avatarSrc: 'assets/images/avatars/wait.jpg'
};

const tnils: ChatThread = {
  id: 'tnils',
  name: nils.name,
  avatarSrc: nils.avatarSrc,
  messages: []
};

const tEcho: ChatThread = {
  id: 'tEcho',
  name: echo.name,
  avatarSrc: echo.avatarSrc,
  messages: []
};

const tRev: ChatThread = {
  id: 'tRev',
  name: rev.name,
  avatarSrc: rev.avatarSrc,
  messages: []
};

const tWait: ChatThread = {
  id: 'tWait',
  name: wait.name,
  avatarSrc: wait.avatarSrc,
  messages: []
};

export function ChatSampleData(store: Redux.Store<AppState>) {

  store.dispatch(UserActions.setCurrentUser(me));

  store.dispatch(ThreadActions.AddThread(tnils));
  store.dispatch(ThreadActions.AddMessage(tnils, {
    author: me,
    sentAt: moment().subtract(42, 'minutes').toDate(),
    text: 'The will to win is nothing without the will to prepare.'
  }));
  store.dispatch(ThreadActions.AddMessage(tnils, {
    author: nils,
    sentAt: moment().subtract(3, 'minutes').toDate(),
    text: 'Code with passion, code all the time.'
  }));

  store.dispatch(ThreadActions.AddThread(tEcho));
  store.dispatch(ThreadActions.AddMessage(tEcho, {
    author: echo,
    sentAt: moment().subtract(1, 'minutes').toDate(),
    text: 'I\'ll echo whatever you send me'
  }));

  store.dispatch(ThreadActions.AddThread(tRev));
  store.dispatch(ThreadActions.AddMessage(tRev, {
    author: rev,
    sentAt: moment().subtract(3, 'minutes').toDate(),
    text: 'I\'ll reverse whatever you send me'
  }));

  store.dispatch(ThreadActions.AddThread(tWait));
  store.dispatch(ThreadActions.AddMessage(tWait, {
    author: wait,
    sentAt: moment().subtract(4, 'minutes').toDate(),
    text: `I\'ll wait however many seconds you send to me before responding.` +
      ` Try sending '2'`
  }));

  store.dispatch(ThreadActions.selectThread(tnils));


  const handledMessages = {};

  store.subscribe( () => {
    getAllMessages(store.getState())
      .filter(message => message.author.id === me.id)
      .map(message => {
        if (handledMessages.hasOwnProperty(message.id)) {
          return;
        }
        handledMessages[message.id] = true;

        switch (message.thread.id) {
          case tEcho.id:
            store.dispatch(ThreadActions.AddMessage(tEcho, {
              author: echo,
              text: message.text
            }));

            break;
          case tRev.id:
            store.dispatch(ThreadActions.AddMessage(tRev, {
              author: rev,
              text: message.text.split('').reverse().join('')
            }));

            break;
          case tWait.id:
            let waitTime: number = parseInt(message.text, 10);
            let reply: string;

            if (isNaN(waitTime)) {
              waitTime = 0;
              reply = `I didn\'t understand ${message.text}. Try sending me a number`;
            } else {
              reply = `I waited ${waitTime} seconds to send you this.`;
            }

            setTimeout(
              () => {
                store.dispatch(ThreadActions.AddMessage(tWait, {
                  author: wait,
                  text: reply
                }));
              },
              waitTime * 1000);

            break;
          default:
            break;
        }
      });
  });
}
