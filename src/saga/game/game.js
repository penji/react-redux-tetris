import {all, select, cancel, put, take, takeEvery, call} from 'redux-saga/effects';

import {
  READY,
  GAME_IS_ON,
  gameAction, GAME_OVER,
} from '../../action/game';

import {infoAction} from '../../action/info';
import {blockAction} from '../../action/block';

import {
  buttonAction
} from '../../action/controller';

import playing from './playing';

function* onReady() {
  yield put(infoAction.speed(1));
  yield put(blockAction.clear());
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
  yield put(infoAction.nowScore(0, false));
  yield put(blockAction.clear());
  yield put(blockAction.pushNext());
  yield call(playing);
}

function* onGameover () {
  // lastScore에 지난 게임 점수 등록
  const state = yield select();
  yield put(infoAction.lastScore(state.info.nowScore));
  yield take('SPACE_TRUE');
  yield put(gameAction.ready());
}

export default function* () {
  yield all([
    yield takeEvery(READY, onReady),
    yield takeEvery(GAME_IS_ON, onGame),
    yield takeEvery(GAME_OVER, onGameover),
  ]);
  yield call(onReady);
}