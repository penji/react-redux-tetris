import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import {makeCombineActionType} from '../util/util';

import {
  READY,
  GAME_IS_ON,
  PAUSED,
  RESUMED,
  gameAction, GAME_OVER,
} from '../action/game';

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
      [makeCombineActionType(gameAction)]: (state, {type, payload}) => {
        const toMerged = {
          ...mapActionToState[type],
          state: type,
        };

        if (type === GAME_OVER) {
          toMerged.highScoreUpdated = payload.highScoreUpdated;
        }

        return update(state, {$merge: toMerged})
      }
    },
    {
      state: 'READY',
      playing: false,
      paused: false,
      highScoreUpdated: false,
    }
);