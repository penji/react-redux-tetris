import {all, select, cancel, put, take, takeEvery, call} from 'redux-saga/effects';

import {
  READY,
  GAME_IS_ON,
  gameAction
} from '../../action/game';

import {infoAction} from '../../action/info';
import {blockAction} from '../../action/block';

import {
  buttonAction
} from '../../action/controller';

import playing from './playing';

function* onReady() {
  yield all([
      yield takeEvery('LEFT_TRUE', function* () {
        const {speed} = yield select(state => state.info);
        if (speed > 1) {
          yield put(infoAction.speedDown());
        }
      }),
      yield takeEvery('RIGHT_TRUE', function* () {
        const {speed} = yield select(state => state.info);
        if (speed < 20) {
          yield put(infoAction.speedUp());
        }
      }),
      yield takeEvery('SWITCH_FALSE', function* () {
        yield put(buttonAction.inversePosition())
      }),
      yield take('SPACE_TRUE', function* () {
      })
  ]);

  yield put(gameAction.gameIsOn());
  yield cancel();
}

function* onGame() {
  yield call(initialize);
  yield call(playing);
  yield call(end);
}

function* initialize() {
  yield put(infoAction.nowScore(0, false));
  yield put(blockAction.clear());
  yield put(blockAction.pushNext());
}

function* end() {
  yield put(infoAction.speed(1));
  yield put(gameAction.ready());
}

export default function* () {
  yield all([
    yield takeEvery(READY, onReady),
    yield takeEvery(GAME_IS_ON, onGame),
  ]);
  yield call(onReady);
}