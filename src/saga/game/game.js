import {all, select, cancel, put, take, takeEvery, call} from 'redux-saga/effects';

import {
  READY,
  GAME_IS_ON,
  gameAction, GAME_OVER,
} from '../../action/game';

import {blockAction} from '../../action/block';

import {
  buttonAction
} from '../../action/controller';

import playing from './playing';

function* onReady() {
  yield put(gameAction.speed(1));
  yield put(blockAction.clear());
  yield put(gameAction.line({
    all: 0, last: 0, now: 0,
  }));
  yield all([
      yield takeEvery('LEFT_TRUE', function* () {
        const {speed} = yield select(state => state.game);
        if (speed > 1) {
          yield put(gameAction.speed(speed - 1));
        }
      }),
      yield takeEvery('RIGHT_TRUE', function* () {
        const {speed} = yield select(state => state.game);
        if (speed < 20) {
          yield put(gameAction.speed(speed + 1));
        }
      }),
      yield takeEvery('SWITCH_FALSE', function* () {
        yield put(buttonAction.inversePositionFalse())
      }),
      yield take('SPACE_TRUE', function* () {
      })
  ]);

  yield put(gameAction.gameIsOn());
  yield cancel();
}

function* onGame() {
  yield put(gameAction.score({now: 0}));
  yield put(blockAction.clear());
  yield put(blockAction.pushNext());
  yield call(playing);
}

function* onGameover () {
  // lastScore에 지난 게임 점수 등록
  const lastNowScore = yield select(state => state.game.score.now);
  yield put(gameAction.score({last: lastNowScore}));
  yield take('SPACE_TRUE');
  yield put(gameAction.ready());
}

export default function* () {
  yield all([
    yield takeEvery(READY, onReady),
    yield takeEvery(GAME_IS_ON, onGame),
    yield takeEvery(GAME_OVER, onGameover),
  ]);
  const gameState = yield select(state => state.game.state);
  switch (gameState) {
    case READY:
      yield call(onReady);
      break;
    case GAME_OVER:
      yield call(onGameover);
      break;
    default:
      const {paused, fromUser} = yield select(state => state.game);
      if (paused && !fromUser) {
        yield put(gameAction.resumed());
      }
      yield call(playing);
      break;
  }
}