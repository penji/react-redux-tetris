import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import {
  HIGH_SCORE,
  LAST_SCORE,
  NOW_SCORE,
  SPEED,
  SPEED_UP,
  SPEED_DOWN,
  COMBO, CLEAR_COMBO,
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
      [NOW_SCORE]: (state, {payload: {score, highScoreUpdate}}) => {
        if (highScoreUpdate && state.highScore < score) {
          return update(state, {
            nowScore: {$set: score},
            highScore: {$set: score}
          });
        } else {
          return update(state, {
            nowScore: {$set: score},
          });
        }
      },
      [SPEED]: (state, {payload}) =>
          update(state, {
            speed: {$set: payload}
          }),
      [SPEED_UP]: state =>
          update(state, {
            speed: {$set: state.speed + 1}
          }),
      [SPEED_DOWN]: state =>
          update(state, {
            speed: {$set: state.speed - 1}
          }),
      [COMBO]: (state, {payload}) =>
          update(state, {
            combo: {$set: payload}
          }),
      [CLEAR_COMBO]: state =>
          update(state, {
            combo: {$set: 0}
          }),
    },
    {
      highScore: 0,
      lastScore: 0,
      nowScore: 0,
      speed: 1,
      combo: 0,
    }
);