import { eventChannel } from 'redux-saga';
import { call, take, cancelled, put } from 'redux-saga/effects';
import lifecycle from 'page-lifecycle/dist/lifecycle.es5';

import {pageStateAction} from '../action/pageState';

const takeEventNames = ['active', 'passive', 'hidden'];

console.error(pageStateAction);
const makelifeCycleChannel = () => eventChannel(emit => {
  const handler = event => {
    if (takeEventNames.includes(event.newState)) {
      emit(event.newState);
    }
  };

  lifecycle.addEventListener('statechange', handler);

  const unsubscribe = () => lifecycle.removeEventListener('statechange', handler);

  return unsubscribe;
});

export function* pageStateSaga() {
  const chan = yield call(makelifeCycleChannel);
  try {
    while (true) {
      yield put(pageStateAction[yield take(chan)]());
    }
  } finally {
    if (yield cancelled()) {
      chan.close();
    }
  }
}