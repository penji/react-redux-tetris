import { createActions } from 'redux-actions';

export const HIGH_SCORE = 'INFO/HIGH_SCORE';
export const LAST_SCORE = 'INFO/LAST_SCORE';
export const NOW_SCORE = 'INFO/NOW_SCORE';
export const SPEED = 'INFO/SPEED';
export const NEXT = 'INFO/NEXT';


const actionCreator = createActions({
  [HIGH_SCORE]: score => score,
  [LAST_SCORE]: score => score,
  [NOW_SCORE]: score => score,
  [SPEED]: speed => speed,
  [NEXT]: next => next
});

export const infoAction = actionCreator.info;