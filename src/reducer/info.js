import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import {
  HIGH_SCORE,
  LAST_SCORE,
  NOW_SCORE,
  SPEED,
  SPEED_UP,
  SPEED_DOWN
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
        const updateObj = {
          nowScore: {$set: score}
        };
        if (highScoreUpdate && state.highScore < score) {
          updateObj['highScore'] = {$set: score};
        }

        return update(state, updateObj);
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
    },
    {
      highScore: 0,
      lastScore: 0,
      nowScore: 0,
      speed: 1,
    }
);