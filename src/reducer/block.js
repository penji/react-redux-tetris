import { handleActions, combineActions } from 'redux-actions';
import update from 'immutability-helper';
import {
  DOWN,
  LEFT,
  RIGHT,
  ROTATE,
  DROP,
  PUSH_NEXT,
  SHIFT_NEXT,
  ROW_CLEAR,
  CLEAR,
  blockAction,
} from '../action/block';
import {Tetromino, BLOCK} from '../model/Tetromino';
const {down, left, right, rotate} = blockAction;

const getClearBoard = (defaultValue = BLOCK.X) => {
  const t = [];
  for (let y = 0; y < 20; y++) {
    t.push(new Array(10).fill(defaultValue));
  }
  return t;
};

/*const types = 'XDIOTJLSZ';
const getRandomType = () => types[Math.floor(Math.random() * 7)];
const getRandomBoard = () => {
  const t = [];
  for (let y = 0; y < 20; y++) {
    t.push([]);
    for (let x = 0; x < 10; x++) {
      t[y].push(getRandomType());
    }
  }
  return t;
};*/

const defaultState = {
  board: getClearBoard(),
  now: {
    type: null,
    rotate: null,
    x: null,
    y: null,
  },
  checkedCollision: {
    [LEFT]: false,
    [DOWN]: false,
    [RIGHT]: false,
    [ROTATE]: false
  },
  next: [
    /*{
      type: null,
      rotate: null,
    }*/
  ],
};

export const collisionCheck = (state, actionType) => {
  if (actionType === ROTATE) {
    return rotateCollisionCheck(state);
  }

  const {now : {type, rotate, x, y}, board} = state;
  const {shape, w, h} = Tetromino[type].rotate[rotate];

  const boardWidth = board[0].length,
      boardHeight = board.length;

  let dx = 0, dy = 0, cx, cy;
  switch (actionType) {
    case LEFT:
      dx = -1;
      cx = x + dx;
      if (cx < 0) {
        // 보드 외곽(왼쪽) 과의 충돌 확인됨
        return false;
      }
      break;
    case RIGHT:
      dx = 1;
      cx = x + w - 1 + dx;
      if (cx >= boardWidth) {
        // 보드 외곽(오른쪽) 과의 충돌 확인됨
        return false;
      }
      break;
    case DOWN:
      dy = 1;
      cy = y + h - 1 + dy;
      if (cy >= boardHeight) {
        // 보드 외곽(바닥)과의 충돌 확인됨
        return false;
      }
      break;
  }

  for (let iy = 0; iy < h; iy++) {
    for (let jx = 0; jx < w; jx++) {

      // 내 블록 영역상 빈 블록이면 통과
      if (shape[iy][jx] === BLOCK.X) {
        continue;
      }

      // 충돌 검사하려는 셀이 아직 내 블록 안쪽이라면 통과
      if (
          (iy + dy) < h
          && (jx + dx) >= 0
          && (jx + dx) < w
          && shape[iy + dy][jx + dx] === type
      ) {
        continue;
      }

      // 충돌 검사하려는 셀이 비어있다면 통과
      if (board[y + iy + dy][x + jx + dx] === BLOCK.X) {
        continue;
      }

      // 다른 block과의 충돌 확인됨
      return false;
    }
  }

  // 이동할 방향의 모든 셀에서 충돌 확인 안됨. 이동 가능
  return true;
};

export const rotateCollisionCheck = state => {
  const {now : {type, rotate, x, y}, board} = state;
  const {maxRotate} = Tetromino[type];
  const nextRotate = (rotate + 1) % (maxRotate + 1);
  const {shape, w, h, dx, dy} = Tetromino[type].rotate[nextRotate];

  // rotate 후 새 블록 위치가 보드 경계를 넘어서면 안쪽으로 밀어 넣는다.
  const
      boardWidth = board[0].length,
      boardHeight = board.length;

  let cx = x + dx,
      cy = y + dy;

  cx = cx < 0 ? 0 : (cx + w - 1) >= boardWidth ? boardWidth - w : cx;
  cy = cy + h >= boardHeight ? boardHeight - h : cy;
  // cx, cy = 최종 보정 된 rotate 후 새 블록 위치

  //board의 rotate 전 내 블록 셀을 isBefore에 모두 기록
  const {
    shape: _shape,
    w: _w,
    h: _h,
  } = Tetromino[type].rotate[rotate];

  const isBefore = {};
  for (let iy = 0; iy < _h; iy++) {
    for (let jx = 0; jx < _w; jx++) {
      if (_shape[iy][jx] === type) {
        isBefore[`${iy + y},${jx + x}`] = true;
      }
    }
  }

  for (let iy = 0; iy < h; iy++) {
    for (let jx = 0; jx < w; jx++) {

      // 내 블록 영역상 빈 블록이면 통과
      if (shape[iy][jx] === BLOCK.X) {
        continue;
      }

      // rotate 시킬 셀이 비었으면 통과
      if (board[iy + cy][jx + cx] === BLOCK.X) {
        continue;
      }

      // rotate 시킬 셀이 이전 블록일 경우 통과
      if (isBefore[`${iy + cy},${jx + cx}`]) {
        continue;
      } else {
        // 다른 block과의 충돌 확인됨
        return false;
      }
    }
  }
  // 회전할 방향의 모든 셀에서 충돌 확인 안됨. 이동 가능
  return true;
};

export const getDropPositionY = state => {
  const {now : {type, rotate, x, y}, board} = state;
  const {shape, w, h} = Tetromino[type].rotate[rotate];

  let maxK = board.length - (y + h);
  for (let jx = 0; jx < w; jx++) {
    for (let iy = h - 1; iy >= 0; iy--) {
      // 내 블록 영역상 빈 블록이면 통과
      if (shape[iy][jx] === BLOCK.X) {
        continue;
      }

      // 대상 셀부터 수직으로 내려가며 충돌 확인
      // 최소값까지만 확인함.
      for (let k = 1; k <= maxK; k++) {

        // 충돌 검사하려는 셀이 아직 내 블록 안쪽이라면 통과
        if (
            iy + k < h
            && shape[iy + k][jx] === type
        ) {
          continue;
        }

        // 충돌 검사하려는 셀이 비어있다면 통과
        if (board[y + iy + k][x + jx] === BLOCK.X) {
          continue;
        }

        if (k - 1 === 0) {
          return 0; // 0이면 (못 내려감) 더 확인할 필요 없으므로 종료.
        }

        if (k - 1 < maxK) {
          maxK = k - 1; // 최솟값 갱신
        }

        break;
      }
    }
  }

  return maxK;
};

export const block = handleActions(
    {

      [combineActions(down, left, right, rotate)]: (state, {type}) => {
        if (state.checkedCollision[type]) {
          return state;
        }
        if (!collisionCheck(state, type)) {
          return update(state, {
            checkedCollision: {
              [type] : {$set: true}
            }
          });
        } else {
          const {x, y, type, rotate} = state.now;
          const nextNow = {...state.now};

          switch (type) {
            case DOWN:
              nextNow.y = y + 1;
              break;
            case LEFT:
              nextNow.x = x - 1;
              break;
            case RIGHT:
              nextNow.x = x + 1;
              break;
            case ROTATE:
              const last = Tetromino[type].maxRotate;
              nextNow.rotate = (rotate + 1) % (last + 1);
              const {dx, dy} = Tetromino[type].rotate[nextNow.rotate];
              nextNow.x = x + dx;
              nextNow.y = y + dy;
              break;
            default:
              return state;
          }

          return update(state, {
            now: {$merge: nextNow},
            checkedCollision: {$set : {
                [LEFT]: false,
                [DOWN]: false,
                [RIGHT]: false,
                [ROTATE]: false
              }}
          });
        }
      },

      [DROP]: state => update(state, {
        now: {
          y: {$set: state.now.y + getDropPositionY(state)},
        },
        checkedCollision: {$set : {
            [LEFT]: false,
            [DOWN]: false,
            [RIGHT]: false,
            [ROTATE]: false
          }}
      }),

      [PUSH_NEXT]: (state, {payload: {blocks}}) => update(state, {
        next: {$push: blocks}
      }),

      [SHIFT_NEXT]: state => {
        const {next: [newBlock]} = state;

        const newNow = {
          type: newBlock.type,
          rotate: newBlock.rotate,
          x: null,
          y: null
        };

        return update(state, {
          now: {$set: newNow},
          next: {$splice: [[0, 1]]},
          checkedCollision: {$set : {
              [LEFT]: false,
              [DOWN]: false,
              [RIGHT]: false,
              [ROTATE]: false
            }}
        });
      },

      [ROW_CLEAR]: (state, {payload: {rows}}) => {
        const spliceArr = [];
        const unshiftArr = [];

        for (const idx of rows) {
          spliceArr.push([idx, 1]);
          unshiftArr.push(new Array(10).fill(BLOCK.X));
        }

        return update(state, {
          board: {
            $splice: spliceArr,
            $unshift: unshiftArr
          }
        });
      },

      [CLEAR]: () => JSON.parse(JSON.stringify(defaultState)),
    },
    JSON.parse(JSON.stringify(defaultState))
);