import {fork} from 'redux-saga/effects';

import {pageStateSaga} from './pageState';

export default function* () {
  yield fork(pageStateSaga);
}