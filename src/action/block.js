import { createActions } from 'redux-actions';
import {NORMAL_TYPES} from '../model/Tetromino';

export const DOWN = 'BLOCK/DOWN';
export const LEFT = 'BLOCK/LEFT';
export const RIGHT = 'BLOCK/RIGHT';
export const ROTATE = 'BLOCK/ROTATE';
export const DROP = 'BLOCK/DROP';
export const PUSH_NEXT = 'BLOCK/PUSH_NEXT';
export const SHIFT_NEXT = 'BLOCK/SHIFT_NEXT';
export const COMMIT = 'BLOCK/COMMIT';
export const ROW_CLEAR = 'BLOCK/ROW_CLEAR';
export const CLEAR = 'BLOCK/CLEAR';

const actionCreator = createActions({
  [DOWN]: undefined,
  [LEFT]: undefined,
  [RIGHT]: undefined,
  [ROTATE]: undefined,
  [DROP]: undefined,
  [PUSH_NEXT] : () => {
    const blocks = NORMAL_TYPES.slice(0);
    const randomBlocks = [];
    while (blocks.length > 0) {
      randomBlocks.push({
        type: // 피셔-예이츠 셔플
            blocks.splice(
                Math.floor(Math.random() * blocks.length),
                1
            )[0],
        rotate: 0
      });
    }
    return {blocks: randomBlocks};
  },
  [SHIFT_NEXT]: undefined,
  [COMMIT]: undefined,
  [ROW_CLEAR]: rows => ({rows: Array.isArray(rows) ? rows : [rows]}),
  [CLEAR]: undefined,
});

export const blockAction = actionCreator.block;
