import { createActions } from 'redux-actions';
import { Tetromino, NORMAL_TYPES } from '../model/Tetromino';

export const DOWN = 'BLOCK/DOWN';
export const LEFT = 'BLOCK/LEFT';
export const RIGHT = 'BLOCK/RIGHT';
export const ROTATE = 'BLOCK/ROTATE';
export const DROP = 'BLOCK/DROP';
export const PUSH_NEXT = 'BLOCK/PUSH_NEXT';
export const SHIFT_NEXT = 'BLOCK/SHIFT_NEXT';
export const ROW_CLEAR = 'BLOCK/ROW_CLEAR';
export const CLEAR = 'BLOCK/CLEAR';

const getRandomType = types => types[Math.floor(Math.random() * types.length)];
const getRandomRotate = type =>
    Math.floor(Math.random() * (Tetromino[type].maxRotate + 1));

const actionCreator = createActions({
  [DOWN]: undefined,
  [LEFT]: undefined,
  [RIGHT]: undefined,
  [ROTATE]: undefined,
  [DROP]: undefined,
  [PUSH_NEXT]: (num = 10, blocks = null, ramdomRotate = false) => {
    if (Array.isArray(blocks)) {
      return {blocks};
    }

    const randomBlocks = [];
    for (let i = 0; i < num; i++) {
      const type = getRandomType(NORMAL_TYPES);
      randomBlocks.push({
        type,
        rotate: ramdomRotate ? getRandomRotate(type) : 0
      });
    }

    return {blocks : randomBlocks};
  },
  [SHIFT_NEXT]: undefined,
  [ROW_CLEAR]: rows => ({rows: Array.isArray(rows) ? rows : [rows]}),
  [CLEAR]: undefined,
});

export const blockAction = actionCreator.block;
