import {combineActions, handleActions} from 'redux-actions';
import update from 'immutability-helper';

import {
  READY,
  GAME_IS_ON,
  PAUSED,
  RESUMED,
  GAME_OVER,
  LINE,
  SCORE,
  SPEED,
  gameAction,
} from '../action/game';

const {ready, gameIsOn, paused, resumed, gameOver} = gameAction;

const mapActionToState = {
  [READY]: {
    playing: false,
    paused: false,
  },
  [GAME_IS_ON]: {
    playing: true,
    paused: false,
  },
  [PAUSED]: {
    playing: true,
    paused: true,
  },
  [RESUMED]: {
    playing: true,
    paused: false,
  },
  [GAME_OVER]: {
    playing: true,
    paused: false,
  }

};

export const game = handleActions(
    {
      [combineActions(ready, gameIsOn, paused, resumed, gameOver)]: (state, {type, payload}) => {
        const toMerged = {
          ...mapActionToState[type],
          state: type,
        };

        if (type === PAUSED || type === RESUMED) {
          toMerged.fromUser = payload.user;
        }

        if (type === GAME_OVER) {
          toMerged.highScoreUpdated = payload.highScoreUpdated;
        }

        return update(state, {$merge: toMerged})
      },

      [LINE]: (state, {payload}) => update(state, {
        line: {$merge: payload}
      }),

      [SCORE]: (state, {payload}) => update(state, {
        score: {$merge: payload}
      }),

      [SPEED]: (state, {payload}) => update(state, {
        speed: {$set: payload}
      }),
    },
    {
      state: 'READY',
      playing: false,
      paused: false,
      fromUser: false,
      highScoreUpdated: false,
      score: {
        high: 0,
        last: 0,
        now: 0,
      },
      line: {
        all: 0,
        last: 0,
        now: 0,
      }
    }
);