import {fork, all} from 'redux-saga/effects';

import {pageStateSaga} from './pageState';
import {keyboardSaga} from './controller';
import gameSaga from './game/game';

export default function* () {
  yield fork(pageStateSaga);
  yield fork(keyboardSaga);
  yield all([
      gameSaga(),
  ]);
}