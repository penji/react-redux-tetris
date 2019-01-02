import {fork} from 'redux-saga/effects';

import {pageStateSaga} from './pageState';
import {keyboardSaga} from './controller';

export default function* () {
  yield fork(pageStateSaga);
  yield fork(keyboardSaga);
}