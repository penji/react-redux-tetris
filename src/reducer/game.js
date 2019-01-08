import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import {makeCombineActionType} from '../util/util';

import {
  READY,
  GAME_IS_ON,
  PAUSED,
  RESUMED,
  gameAction,
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
  }

};

export const game = handleActions(
    {
      [makeCombineActionType(gameAction)]: (state, {type}) => {
        return update(state, {$set: {
            ...mapActionToState[type],
            state: type,
          }})
      }
    },
    {
      state: 'READY',
      playing: false,
      paused: false,
    }
);