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
  COMMIT,
  ROW_CLEAR,
  CLEAR,
  blockAction,
} from '../action/block';
import {Tetromino, BLOCK} from '../model/Tetromino';
const {down, left, right} = blockAction;

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
  committed: {
    type: null,
    rotate: null,
    x: null,
    y: null,
  },
  cachedCollisionCheck: {
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
    default:
      return state;
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

      // 충돌 검사하려는 셀이 화면 상단이면 통과
      if (y + iy + dy < 0) {
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

  let newDx, newDy;

  if (x + dx < 0) {
    newDx = -x;
  } else if ((x + dx + w - 1) >= boardWidth) {
    newDx = boardWidth - w - x;
  } else {
    newDx = dx;
  }

  if ((y + dy + h) >= boardHeight) {
    newDy = boardHeight - h - y;
  } else {
    newDy = dy;
  }

  // cx, cy = 1차 보정 된 rotate 후 새 블록 위치
  let cx = x + newDx,
      cy = y + newDy;

  let ty = 0, collapsed;

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

  while (ty >= -2) {
    collapsed = false;

    for (let iy = 0; iy < h; iy++) {
      if (collapsed) break;
      for (let jx = 0; jx < w; jx++) {
        // 내 블록 영역상 빈 블록이면 통과
        if (shape[iy][jx] === BLOCK.X) {
          continue;
        }

        // 충돌 검사하려는 셀이 화면 상단이면 통과
        if (iy + cy + ty < 0) {
          continue;
        }

        // rotate 시킬 셀이 비었으면 통과
        if (board[iy + cy + ty][jx + cx] === BLOCK.X) {
          continue;
        } else {
          collapsed = true;
          break;
        }
      }
    }

    if (collapsed) {
      if (ty > -2) {
        ty--;
        continue;
      } else {
        return {result: false};
      }
    } else {
      break;
    }
  }

  // 회전할 방향의 모든 셀에서 충돌 확인 안됨. 이동 가능
  return {
    result: true,
    dx: newDx,
    dy: newDy + ty,
    rotate: nextRotate
  }
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

        // 충돌 검사하려는 셀이 화면 상단이면 통과
        if (y + iy + k < 0) {
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

      [combineActions(down, left, right)]:
          (state, {type: actionType}) => {
            if (state.cachedCollisionCheck[actionType]) {
              return state;
            }
            if (collisionCheck(state, actionType) === false) {
              return update(state, {
                cachedCollisionCheck: {
                  [actionType] : {$set: true}
                }
              });
            } else {
              const {x, y, type} = state.now;
              const nextNow = {...state.now};

              switch (actionType) {
                case DOWN:
                  nextNow.y = y + 1;
                  break;
                case LEFT:
                  nextNow.x = x - 1;
                  break;
                case RIGHT:
                  nextNow.x = x + 1;
                  break;
                default:
                  return state;
              }

              return update(state, {
                now: {$set: nextNow},
                cachedCollisionCheck: {$set : {
                    [LEFT]: false,
                    [DOWN]: false,
                    [RIGHT]: false,
                    [ROTATE]: Tetromino[type].maxRotate === 0
                  }}
              });
            }
          },

      [ROTATE]: state => {
        if (state.cachedCollisionCheck[ROTATE]) {
          return state;
        }

        const {result, dx, dy, rotate} = rotateCollisionCheck(state);
        if (result === false) {
          return update(state, {
            cachedCollisionCheck: {
              [ROTATE] : {$set: true}
            }
          });
        }

        const {x, y, type} = state.now;
        const nextNow = {
          type, rotate,
          x: x + dx,
          y: y + dy,
        };

        return update(state, {
          now: {$set: nextNow},
          cachedCollisionCheck: {$set : {
              [LEFT]: false,
              [DOWN]: false,
              [RIGHT]: false,
              [ROTATE]: Tetromino[type].maxRotate === 0
            }}
        });


      },

      [DROP]: state => update(state, {
        now: {
          y: {$set: state.now.y + getDropPositionY(state)},
        },
        cachedCollisionCheck: {$set : {
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
          x: 4,
          y: -Tetromino[newBlock.type].rotate[newBlock.rotate].h,
        };

        return update(state, {
          now: {$set: newNow},
          next: {$splice: [[0, 1]]},
          cachedCollisionCheck: {$set : {
              [LEFT]: false,
              [DOWN]: false,
              [RIGHT]: false,
              [ROTATE]: Tetromino[newBlock.type].maxRotate === 0
            }},
          committed: {$set: {
              type: null,
              rotate: null,
              x: null,
              y: null,
            }}
        });
      },

      [COMMIT]: state => {
        const {type, rotate, x, y} = state.now;
        const {shape, w, h} = Tetromino[type].rotate[rotate];

        let cx, cy, updateObj = null;
        for (let iy = 0; iy < h; iy++) {
          cy = iy + y;
          if (cy < 0) {
            continue;
          }

          for (let jx = 0; jx < w; jx++) {
            if (shape[iy][jx] === BLOCK.X) {
              continue;
            }

            cx = jx + x;
            if (updateObj === null) {
              updateObj = {};
            }

            if (!updateObj[cy]) {
              updateObj[cy] = {}
            }

            updateObj[cy][cx] = {$set: type};
          }
        }

        if (updateObj === null) {
          return update(state, {
            committed: {$set: {...state.now}},
            now: {$set: {
                type: null,
                rotate: null,
                x: null,
                y: null,
              }}
          });
        }

        return update(state, {
          board: updateObj,
          committed: {$set: {...state.now}},
          now: {$set: {
              type: null,
              rotate: null,
              x: null,
              y: null,
            }}
        });
      },

      [ROW_CLEAR]: (state, {payload: {rows}}) => {

        const {board} = state;
        const rowClearedBoard = [];
        const boardWidth = board[0].length;
        const boardHeight = board.length;

        for (let i = 0; i < boardHeight; i++) {
          if (rows.includes(i)) {
            rowClearedBoard.unshift(new Array(boardWidth).fill(BLOCK.X))
          } else {
            rowClearedBoard.push(board[i])
          }
        }

        return update(state, {
          board: {$set: rowClearedBoard}
        });
      },

      [CLEAR]: () => ({...defaultState}),
    },
    {...defaultState}
);