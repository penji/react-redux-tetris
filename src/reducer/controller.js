import { handleAction } from 'redux-actions';
import {makeCombineActionType} from '../util/util';
import {
  INVERSE_POSITION,
  buttonAction
} from '../action/controller';

export const controller = handleAction(
    makeCombineActionType(buttonAction),
    (state, {type}) => {

      if (type !== INVERSE_POSITION) {
        const s = type.split('_');
        return {
          ...state,
          button: s[0],
          pressed: s[1] === 'TRUE' ? true : false
        }
      } else {
        return {
          ...state,
          inversed: !state.inversed
        }
      }
    },
    {
      button: null,
      pressed: null,
      inversed: false
    }
);