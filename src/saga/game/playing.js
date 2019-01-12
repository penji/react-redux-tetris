import {select, cancel, put, take, call, race, fork} from 'redux-saga/effects';
import {delay} from 'redux-saga';

import {infoAction} from '../../action/info';
import {
  DOWN,
  LEFT,
  RIGHT,
  ROTATE,
  DROP,
  SHIFT_NEXT,
  blockAction,
} from '../../action/block';
import {
  gameAction,
  PAUSED,
  RESUMED,
} from '../../action/game';
import {ACTIVE, HIDDEN} from '../../action/pageState';
import {Tetromino, BLOCK} from '../../model/Tetromino';

const mapInputToAction = {
  'UP_TRUE': ROTATE,
  'DOWN_TRUE': DOWN,
  'LEFT_TRUE': LEFT,
  'RIGHT_TRUE': RIGHT,
  'SPACE_TRUE': DROP,
};

function* handleInput() {
  while (true) {
    const {type} = (yield race([
      take('UP_TRUE'),
      take('DOWN_TRUE'),
      take('LEFT_TRUE'),
      take('RIGHT_TRUE'),
      take('SPACE_TRUE'),
    ])).filter(v => v)[0];
    yield put({
      type: mapInputToAction[type]
    });
  }
}

function* blockMovePhase(timeoutMs) {
  const inputTask = yield fork(handleInput);
  const raceResult = yield race([
    take(DROP),
    delay(timeoutMs),
    take(PAUSED),
  ]);
  yield cancel(inputTask);

  if (raceResult[0]) {
    return 'drop';
  } else if (raceResult[1]) {
    return 'timeout';
  } else if (raceResult[2]) {
    return 'paused';
  } else {
    return 'passed';
  }
}

function* timeoutDown() {
  const bY = yield select(({block}) => block.now.y);
  yield put(blockAction.down());
  const nY = yield select(({block}) => block.now.y);

  return bY !== nY;
}

export default function* () {
  const asyncTask = yield fork(function* () {
    while (true) {
      yield take(SHIFT_NEXT);
      const {next} = yield select(({block}) => block);
      if (next.length < 10) {
        yield put(blockAction.pushNext());
      }
    }
  });

  let isPaused = false;
  let clearLine = {
    all: 0,
    bonus: 0,
    block: 0
  };
  let highScoreUpdated = false;

  const pauseToggle = yield fork(function* () {
    while (true) {
      const _race = yield race([
        take('ENTER_TRUE'),
        take(ACTIVE),
        take(HIDDEN),
      ]);

      if (_race[0]) {
        if (isPaused === false) {
          yield put(gameAction.paused());
        } else {
          yield put(gameAction.resumed());
        }
        isPaused = !isPaused;
      } else if (_race[1] && isPaused) {
        yield put(gameAction.resumed());
        isPaused = !isPaused;
      } else if (_race[2] && !isPaused) {
        yield put(gameAction.paused());
        isPaused = !isPaused;
      }
    }
  });

  while (true) {
    if (isPaused) {
      yield take(RESUMED);
    }
    let firstTimeoutDownFail = false;
    let isDropped = false;
    const speed = yield select(({info}) => info.speed);

    let normalTimeoutMs = Math.floor(1000 * Math.pow(0.72, speed - 1)),
        commitTimeoutMs = 150 * Math.min(speed, 15),
        nowTimeoutMs = normalTimeoutMs;

    let timeoutDownFailCount = 0;

    yield put(blockAction.shiftNext());

    let elapsedToCommit = 0, start, end;

    start = new Date().getTime();
    while (true) {
      if (isPaused) {
        yield take(RESUMED);
      }
      let result = yield call(blockMovePhase, nowTimeoutMs);

      if (result === 'paused') {
        yield take(RESUMED);
        result = yield call(blockMovePhase, nowTimeoutMs);
      } else if (result === 'pass') {
        continue;
      } if (result === 'drop') {
        isDropped = true;
        break;
      }

      let timeoutDownResult = yield call(timeoutDown);

      if (timeoutDownResult === false) {
        if (firstTimeoutDownFail) {
          break;
        }

        firstTimeoutDownFail = true;
        timeoutDownFailCount++;
        if (timeoutDownFailCount >= 3) {
          break;
        }
        // 커밋 타임아웃은 speed가 올라갈수록 오히려 증가시켜 기회를 더 줌
        // 단 스피드 15 초과시 더 증가하지 않음
        nowTimeoutMs = Math.floor(commitTimeoutMs * (1 - (timeoutDownFailCount - 1) / 10));
      } else {
        firstTimeoutDownFail = false;
        nowTimeoutMs = normalTimeoutMs;
      }
    }
    end = new Date().getTime();
    elapsedToCommit = end - start;
    yield put(blockAction.commit());


    // 커밋 후 처리
    const state = yield select();

    // 게임 오버 판단
    const {type, rotate, y} = state.block.committed;
    const {h} = Tetromino[type].rotate[rotate];
    if (y + h <= 0) {
      break;
    }

    // 꽉 차서 삭제할 줄 계산
    const {board} = state.block;
    const clearLineArr = [];
    clearLine.block = 0;
    let isLineFull;

    for (let iy = y; iy < y + h; iy++) {
      if (iy < 0) {
        continue;
      }
      isLineFull = !board[iy].some(v => v === BLOCK.X);
      if (isLineFull) {
        clearLine.block++;
        clearLineArr.push(iy);
      }
    }

    // 점수 계산
    const
        // speed 별 기본 점수
        speedBase = 200 * speed,

        // 3초 이내로 commit 시킨 경우 비례하여 최대 200%의 기본 점수 가산
        fast = elapsedToCommit > 3000 ? 1 : 2 - (elapsedToCommit / 3000),

        // drop으로 commit 시킨 경우 획득 점수의 20% 가산
        drop = isDropped ? 1.2 : 1,

        // 개별 블록 점수
        blockScore = speedBase * fast * drop,

        // 최종 점수: 개별 블록 점수 * (삭제된 줄 수 + 1)
        finalScore = Math.floor(blockScore * (clearLine.block + clearLine.bonus + 1)),

        newScore = state.info.nowScore + finalScore;

    // highScore 갱신 여부 확인
    highScoreUpdated = state.info.highScore < newScore;

    // 점수 및 줄 삭제 업데이트
    yield put(infoAction.nowScore(newScore, highScoreUpdated));

    if (clearLine.block > 0) {
      clearLine.bonus += clearLine.block;
      clearLine.all += clearLine.block;
      yield put(blockAction.rowClear(clearLineArr));
    } else {
      clearLine.bonus = 0;
    }


    const nowSpeed = yield select(state => state.info.speed);

    // 10줄 클리어 할 때마다 speed 증가
    if (nowSpeed < 20 && clearLine.all > nowSpeed * 10) {
      yield put(infoAction.speedUp());
    }

  }

  yield cancel(asyncTask);
  yield cancel(pauseToggle);
  yield put(gameAction.gameOver(highScoreUpdated));
}