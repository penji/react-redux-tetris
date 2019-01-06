import { createActions } from 'redux-actions';

export const HIGH_SCORE = 'INFO/HIGH_SCORE';
export const LAST_SCORE = 'INFO/LAST_SCORE';
export const NOW_SCORE = 'INFO/NOW_SCORE';
export const SPEED = 'INFO/SPEED';
export const SPEED_UP = 'INFO/SPEED_UP';
export const SPEED_DOWN = 'INFO/SPEED_DOWN';


const actionCreator = createActions({
  [HIGH_SCORE]: score => score,
  [LAST_SCORE]: score => score,
  [NOW_SCORE]: score => score,
  [SPEED]: speed => speed,
  [SPEED_UP]: undefined,
  [SPEED_DOWN]: undefined,
});

export const infoAction = actionCreator.info;