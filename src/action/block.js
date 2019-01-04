import { createActions } from 'redux-actions';
import Tetromino from '../model/Tetromino';

export const DOWN = 'BLOCK/DOWN';
export const LEFT = 'BLOCK/LEFT';
export const RIGHT = 'BLOCK/RIGHT';
export const ROTATE = 'BLOCK/ROTATE';
export const DROP = 'BLOCK/DROP';
export const NEXT = 'BLOCK/NEXT';
export const ROW_CLEAR = 'BLOCK/ROW_CLEAR';
export const CLEAR = 'BLOCK/CLEAR';

const types = 'IOTJLSZ';
const getRandomType = () => types[Math.floor(Math.random() * 7)];
const getRandomRotate = type =>
    Math.floor(Math.random() * (Tetromino[type].maxRotate + 1));

const actionCreator = createActions({
  [DOWN]: undefined,
  [LEFT]: undefined,
  [RIGHT]: undefined,
  [ROTATE]: undefined,
  [DROP]: undefined,
  [NEXT]: (
      type = getRandomType(),
      rotate = getRandomRotate()
  ) => ({type, rotate}),
  [ROW_CLEAR]: rows => ({rows: Array.isArray(rows) ? rows : [rows]}),
  [CLEAR]: undefined,
});

export const blockAction = actionCreator.block;