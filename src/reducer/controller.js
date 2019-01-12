import { handleAction } from 'redux-actions';
import {makeCombineActionType} from '../util/util';
import {
  buttonAction
} from '../action/controller';

export const controller = handleAction(
    makeCombineActionType(buttonAction),
    (state, {type}) => {
      const idx = type.lastIndexOf('_');
      const button = type.slice(0, idx);
      const pressed = type.slice(idx + 1) === 'TRUE' ? true : false;

      const newState = {
        ...state, button, pressed
      };

      if (button === 'INVERSE_POSITION') {
        newState.inversed= !state.inversed
      }

      return newState;
    },
    {
      button: null,
      pressed: null,
      inversed: false
    }
);