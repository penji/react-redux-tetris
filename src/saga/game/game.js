import {all, select, cancel, put, take, takeEvery, call} from 'redux-saga/effects';

import {
  READY,
  GAME_IS_ON,
  gameAction
} from '../../action/game';

import {infoAction} from '../../action/info';

function* onReady() {
  yield all([
      yield takeEvery('LEFT_TRUE', function* () {
        const {speed} = yield select(state => state.info);
        if (speed > 0) {
          yield put(infoAction.speedDown());
        }
      }),
      yield takeEvery('RIGHT_TRUE', function* () {
        const {speed} = yield select(state => state.info);
        if (speed < 10) {
          yield put(infoAction.speedUp());
        }
      }),
      yield take('SPACE_TRUE', function* () {
        console.error('space');
      })
  ]);

  yield put(gameAction.gameIsOn());
  yield cancel();
}

function* onGame() {
  console.error('game start');
}

export default function* () {
  yield all([
    yield takeEvery(READY, onReady),
    yield takeEvery(GAME_IS_ON, onGame),
  ]);
  yield call(onReady);
}