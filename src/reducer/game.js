import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import {makeCombineActionType} from '../util/util';

import {gameAction} from '../action/game';

export const game = handleActions(
    {
      [makeCombineActionType(gameAction)]: (state, {type}) => update(state, {
        state: {$set: type}
      })
    },
    {
      state: 'READY',
    }
);