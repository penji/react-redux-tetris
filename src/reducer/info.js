import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import {
  HIGH_SCORE,
  LAST_SCORE,
  NOW_SCORE,
  SPEED,
} from '../action/info';

export const info = handleActions(
    {
      [HIGH_SCORE]: (state, {payload}) =>
          update(state, {
            highScore: {$set: payload}
          }),
      [LAST_SCORE]: (state, {payload}) =>
          update(state, {
            lastScore: {$set: payload}
          }),
      [NOW_SCORE]: (state, {payload}) =>
          update(state, {
            nowScore: {$set: payload}
          }),
      [SPEED]: (state, {payload}) =>
          update(state, {
            speed: {$set: payload}
          }),
    },
    {
      highScore: 0,
      lastScore: 0,
      nowScore: 0,
      speed: 1,
    }
);